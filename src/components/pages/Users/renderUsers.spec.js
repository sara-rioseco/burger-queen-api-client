/* eslint-disable no-unused-vars */
import React from 'react';
import Users from './users.jsx';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UsersLogic } from '../../../utils/users.jsx';
import { useNavigate as useNavigateMock } from 'react-router-dom'; // navegar entre router

jest.mock('../../../utils/users', () => {
    const originalModule = jest.requireActual('../../../utils/users');
    return {
        ...originalModule,
        useUsersLogic: jest.fn(() => ({
            usersData: [{
                "email": "iamawaiter@mail.com",
                "password": "123456",
                "role": "waiter",
                "id": 1,
            },
            {
                "email": "iamachef@mail.com",
                "password": "123456",
                "role": "chef",
                "id": 2,
            },
            {
                "email": "iamaadmin@mail.com",
                "password": "123456",
                "role": "admin",
                "id": 3,
            }],
            getRoleLabel: jest.fn((role) => {
                switch (role) {
                    case 'admin':
                        return 'Administrador';
                    case 'waiter':
                        return 'Mesero';
                    case 'chef':
                        return 'Cocinero';
                    default:
                        return role;
                }
            }),
            handleOpenModalDeleteUsers: jest.fn(),
            handleConfirmDeleteClickUsers: jest.fn(),
            handleConfirmEditClickUsers: jest.fn(),
            handleOpenEditModalUsers: jest.fn(),
            handleCloseModalUsers: jest.fn(),
            handleAddClick: jest.fn(),
            setNewUser: jest.fn(),
            handleInputChange: jest.fn(),
            handleConfirmAddClick: jest.fn(),
            handleRoleCheckboxChange: jest.fn(),
            modalUserId: 2,
            selectedRoles: ['admin', 'waiter', 'chef'],
            modalOpenDeleteUsers: true,
            modalOpenEditUsers: true,
            editingUserData: 3,
            addModalOpen: true,
            newUser: {
                email: 'test@example.com',
                password: '123456',
                role: 'admin',
            },
            errorLabel: 'error',
            errorLabelEdit: 'errorEdit',
        }))
    }
});

describe('Componente Users', () => {
    it('Se renderiza sin errores', () => {
        render(
            <MemoryRouter>
                <Users />
            </MemoryRouter>
        );

        const titleElement = screen.getByText('Usuarios');
        expect(titleElement).toBeInTheDocument();

        const filterLabel = screen.getByText('Filtrar usuarios por puesto :');
        expect(filterLabel).toBeInTheDocument();

        const administradorCheckbox = screen.getByLabelText('Administrador');
        const meseroCheckbox = screen.getByLabelText('Mesero');
        const chefCheckbox = screen.getByLabelText('Cocinero');
        expect(administradorCheckbox).toBeInTheDocument();
        expect(meseroCheckbox).toBeInTheDocument();
        expect(chefCheckbox).toBeInTheDocument();

        const AddButton = screen.getByAltText('buttonAddUsers');
        expect(AddButton).toBeInTheDocument();

        const logoutButton = screen.getByAltText('Cerrar sesión');
        expect(logoutButton).toBeInTheDocument();

        const kitchenButton = screen.getByAltText('Ir a vista de cocina');
        expect(kitchenButton).toBeInTheDocument();

        const orderButton = screen.getByAltText('Ir a vista de pedidos');
        expect(orderButton).toBeInTheDocument();
    });

    it('Debería renderizar la tabla de productos', () => {
        render(<MemoryRouter>
            <Users />
        </MemoryRouter>);

        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(5);
    });

    it('Debería renderizar la tabla con la información de los usuarios', async () => {
        const fakeUserData = [
            {
                "email": "iamawaiter@mail.com",
                "password": "123456",
                "role": "waiter",
                "id": 1,
            },
            {
                "email": "iamachef@mail.com",
                "password": "123456",
                "role": "chef",
                "id": 2,
            },
            {
                "email": "iamaadmin@mail.com",
                "password": "123456",
                "role": "admin",
                "id": 3,
            }
        ];

        // // Simula la lógica de UsersLogic con datos ficticios
        // jest.mock('../../../utils/users.jsx', () => ({
        //     ...jest.requireActual('../../../utils/users.jsx'),
        //     useUsersLogic: jest.fn(() => ({
        //         usersData: fakeUserData,
        //     })),
        // }));

        render(
            <MemoryRouter>
                <Users />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.findBy('iamawaiter@mail.com')).toBeInTheDocument();
            expect(screen.findBy('iamachef@mail.com')).toBeInTheDocument();
            expect(screen.findBy('iamaadmin@mail.com')).toBeInTheDocument();
        })

    });
});


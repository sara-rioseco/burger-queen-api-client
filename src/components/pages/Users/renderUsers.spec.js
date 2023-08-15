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
        UsersLogic: jest.fn(() => ({
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
            modalUserId: 1,
            selectedRoles: ['admin', 'waiter', 'chef'],
            modalOpenDeleteUsers: true,
            modalOpenEditUsers: true,
            editingUserData: {
                "email": "iamaadmin@mail.com",
                "password": "123456",
                "role": "admin",
                "id": 3,
            },
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

        render(
            <MemoryRouter>
                <Users />
            </MemoryRouter>
        );

        expect(screen.getByRole('row', { name: /iamawaiter@mail.com/i })).toBeInTheDocument();
        expect(screen.getByText('#1')).toBeInTheDocument();
        expect(screen.getByRole('row', { name: /Mesero/i })).toBeInTheDocument();

        expect(screen.getByRole('row', { name: /iamachef@mail.com/i })).toBeInTheDocument();
        expect(screen.getByText('#2')).toBeInTheDocument();
        expect(screen.getByRole('row', { name: /Cocinero/i })).toBeInTheDocument();
    })

    it('Debería cambiar el array selectedRoles cuando se hace clic en una casilla', () => {
        const { handleRoleCheckboxChange, selectedRoles } = UsersLogic();
    
        const { getByLabelText } = render(
          <div>
            <label>
              <input
                type="checkbox"
                value="admin"
                checked={selectedRoles.includes('admin')}
                onChange={() => handleRoleCheckboxChange('admin')}
              />
              Administrador
            </label>
            <label>
              <input
                type="checkbox"
                value="waiter"
                checked={selectedRoles.includes('waiter')}
                onChange={() => handleRoleCheckboxChange('waiter')}
              />
              Mesero
            </label>
            <label>
              <input
                type="checkbox"
                value="chef"
                checked={selectedRoles.includes('chef')}
                onChange={() => handleRoleCheckboxChange('chef')}
              />
              Cocinero
            </label>
          </div>
        );
    
        const casillaAdmin = getByLabelText('Administrador');
        const casillaMesero = getByLabelText('Mesero');
        const casillaCocinero = getByLabelText('Cocinero');
    
        fireEvent.click(casillaAdmin);
        fireEvent.click(casillaMesero);
        fireEvent.click(casillaCocinero);
    
        expect(selectedRoles).toEqual(['admin', 'waiter', 'chef']); // Asegura que el estado de selectedRoles se actualice
      });

      it('debería retornar la etiqueta de puesto correcta', () => {
        const { getRoleLabel } = UsersLogic();
    
        const etiquetaAdmin = getRoleLabel('admin');
        const etiquetaMesero = getRoleLabel('waiter');
        const etiquetaCocinero = getRoleLabel('chef');
    
        expect(etiquetaAdmin).toBe('Administrador');
        expect(etiquetaMesero).toBe('Mesero');
        expect(etiquetaCocinero).toBe('Cocinero');
      });
});


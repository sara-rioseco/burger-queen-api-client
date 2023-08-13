/* eslint-disable no-unused-vars */
import React from 'react';
import Users from './users.jsx'; // Asegúrate de importar la ruta correcta
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { UsersLogic } from '../../../utils/users.jsx';
import { useNavigate as useNavigateMock } from 'react-router-dom'; // navegar entre router

// // Reemplaza la importación original de useNavigate con la función simulada
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'), // Mantener las importaciones reales
//     useNavigate: jest.fn(), // Mockear useNavigate
// }));


describe.only('Componente Users', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

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

    // it('Debería renderizar la tabla de productos', () => {
    //     render(<MemoryRouter>
    //         <Users />
    //     </MemoryRouter>);

    //     expect(screen.getByRole('table')).toBeInTheDocument();
    //     expect(screen.getAllByRole('columnheader')).toHaveLength(5);
    // });

    // it('El boton de productos cambia a la ruta correcta', async () => {
    //     // Crea una función simulada para useNavigate
    //     const navigateMock = jest.fn();
    //     useNavigateMock.mockImplementation(() => navigateMock);

    //     // Renderiza el componente Login
    //     render(
    //         <MemoryRouter>
    //             <Users />
    //         </MemoryRouter>
    //     );

    //     // Obtén los elementos necesarios
    //     const productsButton = screen.getByText('Productos');

    //     // Ejecuta la acción (click en el botón)
    //     fireEvent.click(productsButton);

    //     // Espera a que se complete la acción asíncrona
    //     await waitFor(() => {
    //         expect(navigateMock).toHaveBeenCalledWith('/products');
    //     });
    // });
});

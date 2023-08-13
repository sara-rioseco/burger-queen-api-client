/* eslint-disable no-unused-vars */
import React from 'react';
import Products from './products.jsx'; // Asegúrate de importar la ruta correcta
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ProductsLogic } from '../../../utils/products.jsx';
import { useNavigate as useNavigateMock } from 'react-router-dom'; // navegar entre router

// Reemplaza la importación original de useNavigate con la función simulada
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Mantener las importaciones reales
    useNavigate: jest.fn(), // Mockear useNavigate
}));

describe('Componente Products', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // it('se renderiza sin errores', () => {
    //     render(
    //         <MemoryRouter>
    //             <Products />
    //         </MemoryRouter>
    //     );

    //     const titleElement = screen.getByText('Productos');
    //     expect(titleElement).toBeInTheDocument();

    //     const filterLabel = screen.getByText('Filtrar productos por tipo :');
    //     expect(filterLabel).toBeInTheDocument();

    //     const desayunoCheckbox = screen.getByLabelText('Desayuno');
    //     const almuerzoCheckbox = screen.getByLabelText('Almuerzo');
    //     expect(desayunoCheckbox).toBeInTheDocument();
    //     expect(almuerzoCheckbox).toBeInTheDocument();

    //     const AddButton = screen.getByAltText('buttonAddProducts');
    //     expect(AddButton).toBeInTheDocument();

    //     const logoutButton = screen.getByAltText('Cerrar sesión');
    //     expect(logoutButton).toBeInTheDocument();

    //     const kitchenButton = screen.getByAltText('Ir a vista de cocina');
    //     expect(kitchenButton).toBeInTheDocument();

    //     const orderButton = screen.getByAltText('Ir a vista de pedidos');
    //     expect(orderButton).toBeInTheDocument();
    // });

    // it('Debería renderizar la tabla de productos', () => {
    //     render(<MemoryRouter>
    //         <Products />
    //     </MemoryRouter>);

    //     expect(screen.getByRole('table')).toBeInTheDocument();
    //     expect(screen.getAllByRole('columnheader')).toHaveLength(6);
    // });

    it('El boton de productos cambia a la ruta correcta', async () => {
        // Crea una función simulada para useNavigate
        const navigateMock = jest.fn();
        useNavigateMock.mockImplementation(() => navigateMock);

        // Renderiza el componente Login
        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        // Obtén los elementos necesarios
        const productsButton = screen.getByText('Usuarios');

        // Ejecuta la acción (click en el botón)
        fireEvent.click(productsButton);

        // Espera a que se complete la acción asíncrona
        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith('/users');
        });
    });

    it('El boton de logout cambia a la ruta correcta', async () => {
        // Crea una función simulada para useNavigate
        const navigateMock = jest.fn();
        useNavigateMock.mockImplementation(() => navigateMock);

        // Renderiza el componente Login
        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        // Obtén los elementos necesarios
        const logoutButton = screen.getByAltText('Cerrar sesión');

        // Ejecuta la acción (click en el botón)
        fireEvent.click(logoutButton);

        // Espera a que se complete la acción asíncrona
        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith('/');
        });
    });

    it('El boton de chef cambia a la ruta correcta', async () => {
        // Crea una función simulada para useNavigate
        const navigateMock = jest.fn();
        useNavigateMock.mockImplementation(() => navigateMock);

        // Renderiza el componente Login
        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        // Obtén los elementos necesarios
        const kitchenButton = screen.getByAltText('Ir a vista de cocina');

        // Ejecuta la acción (click en el botón)
        fireEvent.click(kitchenButton);

        // Espera a que se complete la acción asíncrona
        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith('/kitchen');
        });
    });

    it('El boton de mesero cambia a la ruta correcta', async () => {
        // Crea una función simulada para useNavigate
        const navigateMock = jest.fn();
        useNavigateMock.mockImplementation(() => navigateMock);

        // Renderiza el componente Login
        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        // Obtén los elementos necesarios
        const orderButton = screen.getByAltText('Ir a vista de pedidos');

        // Ejecuta la acción (click en el botón)
        fireEvent.click(orderButton);

        // Espera a que se complete la acción asíncrona
        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith('/orders');
        });
    });
});

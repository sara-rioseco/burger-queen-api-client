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

// Reemplaza la importación original de useNavigate con la función simulada
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Mantener las importaciones reales
    useNavigate: jest.fn(), // Mockear useNavigate
}));


describe('Componente Users', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('El boton de productos cambia a la ruta correcta', async () => {
        // Crea una función simulada para useNavigate
        const navigateMock = jest.fn();
        useNavigateMock.mockImplementation(() => navigateMock);

        // Renderiza el componente Login
        render(
            <MemoryRouter>
                <Users />
            </MemoryRouter>
        );

        // Obtén los elementos necesarios
        const productsButton = screen.getByText('Productos');

        // Ejecuta la acción (click en el botón)
        fireEvent.click(productsButton);

        // Espera a que se complete la acción asíncrona
        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith('/products');
        });
    });

    it('El boton de logout cambia a la ruta correcta', async () => {
        // Crea una función simulada para useNavigate
        const navigateMock = jest.fn();
        useNavigateMock.mockImplementation(() => navigateMock);

        // Renderiza el componente Login
        render(
            <MemoryRouter>
                <Users />
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
                <Users />
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
                <Users />
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

    it('Debería cambiar el array selectedRoles cuando se hace clic en una casilla', () => {
        const { getByLabelText, getByText } = render(<Users />);
    
        // Verificar que las casillas de selección de roles existen en la interfaz de usuario
        const casillaAdmin = getByLabelText('Administrador');
        const casillaMesero = getByLabelText('Mesero');
        const casillaCocinero = getByLabelText('Cocinero');
    
        // Verificar que los roles seleccionados por defecto están marcados
        expect(casillaAdmin.checked).toBe(true);
        expect(casillaMesero.checked).toBe(true);
        expect(casillaCocinero.checked).toBe(true);
    
        // Desmarcar la casilla de Administrador y Mesero, pero mantener Cocinero marcado
        fireEvent.click(casillaAdmin);
        fireEvent.click(casillaMesero);
    
        // Verificar que los roles se desmarcaron correctamente
        expect(casillaAdmin.checked).toBe(false);
        expect(casillaMesero.checked).toBe(false);
        expect(casillaCocinero.checked).toBe(true);
    
        // Volver a marcar la casilla de Administrador y Mesero
        fireEvent.click(casillaAdmin);
        fireEvent.click(casillaMesero);
    
        // Verificar que los roles se marcaron nuevamente correctamente
        expect(casillaAdmin.checked).toBe(true);
        expect(casillaMesero.checked).toBe(true);
        expect(casillaCocinero.checked).toBe(true);
      });
});

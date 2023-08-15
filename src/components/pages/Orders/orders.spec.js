/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Orders from './orders.jsx';
import { OrdersLogic } from '../../../utils/orders.jsx';
import { useNavigate as useNavigateMock } from 'react-router-dom'; // navegar entre router

// Reemplaza la importación original de useNavigate con la función simulada
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Mantener las importaciones reales
    useNavigate: jest.fn(), // Mockear useNavigate
}));

describe('Componente Orders', () => {
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
                <Orders />
            </MemoryRouter>
        );

        // Obtén los elementos necesarios
        const menuButton = screen.getByText('MENU');

        // Ejecuta la acción (click en el botón)
        fireEvent.click(menuButton);

        // Espera a que se complete la acción asíncrona
        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith('/menu');
        });
    });

    it('El boton de logout cambia a la ruta correcta', async () => {
        // Crea una función simulada para useNavigate
        const navigateMock = jest.fn();
        useNavigateMock.mockImplementation(() => navigateMock);

        // Renderiza el componente Login
        render(
            <MemoryRouter>
                <Orders />
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

});


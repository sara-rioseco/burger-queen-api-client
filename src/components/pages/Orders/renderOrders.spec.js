/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Orders from './orders.jsx';
import { OrdersLogic } from '../../../utils/orders.jsx';

jest.mock('axios');

describe('Componente Orders', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Renderiza el componente correctamente', () => {
        render(
            <MemoryRouter>
                <Orders />
            </MemoryRouter>
        );

        const menuButton = screen.getByText('MENU');
        expect(menuButton).toBeInTheDocument();

        const filterLabel = screen.getByText('Filtrar ordenes por estatus :');
        expect(filterLabel).toBeInTheDocument();

        const logoutButton = screen.getByAltText('Cerrar sesión');
        expect(logoutButton).toBeInTheDocument();
    });

    it('Debería renderizar la tabla de pedidos', () => {
        render(<MemoryRouter>
            <Orders />
        </MemoryRouter>);

        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(8);
    });

    // it('Renderiza y abre la modal de edición al hacer clic en el botón de editar', async () => {
    //     render(
    //         <MemoryRouter>
    //             <Orders />
    //         </MemoryRouter>
    //     );

    //     // Esperar a que el botón de edición esté presente en el DOM
    //     const editButton = await screen.findByAltText('buttonEdit');

    //     // Hacer clic en el botón de edición
    //     fireEvent.click(editButton);

    //     // Verificar que la modal de edición se abra correctamente
    //     const editModal = screen.getByRole('dialog');
    //     expect(editModal).toBeInTheDocument();

    //     // Verificar que el contenido de la modal esté presente
    //     const modalContent = screen.getByText('Editando pedido de la mesa');
    //     expect(modalContent).toBeInTheDocument();
    // });

});


import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Orders from './orders.jsx';
import { OrdersLogic } from '../../../utils/orders';

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
        
    });

    it('Debería renderizar la tabla de pedidos', () => {
        render(<MemoryRouter>
            <Orders />
        </MemoryRouter>);

        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(8);
    });
});
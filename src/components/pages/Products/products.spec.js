/* eslint-disable no-unused-vars */
import React from 'react';
import Products from './products.jsx'; // Asegúrate de importar la ruta correcta
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ProductsLogic } from '../../../utils/products.jsx';

describe('Componente Products', () => {
    it('se renderiza sin errores', () => {
        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        const titleElement = screen.getByText('Productos');
        expect(titleElement).toBeInTheDocument();

        const filterLabel = screen.getByText('Filtrar productos por tipo :');
        expect(filterLabel).toBeInTheDocument();

        const desayunoCheckbox = screen.getByLabelText('Desayuno');
        const almuerzoCheckbox = screen.getByLabelText('Almuerzo');
        expect(desayunoCheckbox).toBeInTheDocument();
        expect(almuerzoCheckbox).toBeInTheDocument();

        const AddButton = screen.getByAltText('buttonAddProducts');
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
            <Products />
        </MemoryRouter>);

        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(6);
    });
});

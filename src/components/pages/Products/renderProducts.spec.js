/* eslint-disable no-unused-vars */
import React from 'react';
import Products from './products.jsx';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ProductsLogic } from '../../../utils/products.jsx';
import { useNavigate as useNavigateMock } from 'react-router-dom'; // navegar entre router

jest.mock('../../../utils/products', () => {
    const originalModule = jest.requireActual('../../../utils/products');
    return {
        ...originalModule,
        ProductsLogic: jest.fn(() => ({
            productsData: [{
                "id": 1,
                "name": "Fake-product",
                "price": 10,
                "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/sandw.png?raw=true",
                "type": "Desayuno-test",
                "dateEntry": "2022-03-05 15:14:10"
            },
            {
                "id": 2,
                "name": "Café americano",
                "price": 5,
                "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/cafe.png?raw=true",
                "type": "Almuerzo",
                "dateEntry": "2022-03-05 15:14:10"
            }],
            handleOpenModalDeleteProducts: jest.fn(),
            handleConfirmDeleteClickProducts: jest.fn(),
            handleConfirmEditClickProducts: jest.fn(),
            handleOpenEditModalProducts: jest.fn(),
            handleCloseModalProducts: jest.fn(),
            handleAddClick: jest.fn(),
            setNewProduct: jest.fn(),
            handleInputChange: jest.fn(),
            handleConfirmAddClick: jest.fn(),
            handleTypeCheckboxChange: jest.fn(),
            modalProductId: 1,
            selectedTypes: ['Desayuno', 'Almuerzo'],
            modalOpenDeleteproducts: true,
            modalOpenEditproducts: true,
            editingProductData: {
                "id": 2,
                "name": "Café americano test",
                "price": 5,
                "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/cafe.png?raw=true",
                "type": "Almuerzo",
                "dateEntry": "2022-03-05 15:14:10"
            },
            addModalOpen: true,
            newProduct: {
                name: 'pastel',
                price: 15,
                type: 'Desayuno',
                image: 'url test',
            },
            errorLabel: 'error',
            errorLabelEdit: 'errorEdit',
        }))
    }
});

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

    it('Debería renderizar la tabla con la información de los productos', async () => {

        render(
            <MemoryRouter>
                <Products />
            </MemoryRouter>
        );

        expect(screen.getByRole('row', { name: /Café americano/i })).toBeInTheDocument();
        expect(screen.getByText('$5,00')).toBeInTheDocument();
        expect(screen.getByRole('row', { name: /Almuerzo/i })).toBeInTheDocument();
    })

    it('Debería cambiar el array selectedTypes cuando se hace clic en una casilla', () => {
        const { handleTypeCheckboxChange, selectedTypes } = ProductsLogic();

        const { getByLabelText } = render(
            <div>
                <label>
                    <input
                        type="checkbox"
                        value="Desayuno"
                        checked={selectedTypes.includes('Desayuno')}
                        onChange={() => handleTypeCheckboxChange('Desayuno')}
                    />
                    Desayuno
                </label>
                <label>
                    <input
                        type="checkbox"
                        value="Almuerzo"
                        checked={selectedTypes.includes('Almuerzo')}
                        onChange={() => handleTypeCheckboxChange('Almuerzo')}
                    />
                    Almuerzo
                </label>
            </div>
        );

        const casillaDesayuno = getByLabelText('Desayuno');
        const casillaAlmuerzo = getByLabelText('Almuerzo');

        fireEvent.click(casillaDesayuno);
        fireEvent.click(casillaAlmuerzo);

        expect(selectedTypes).toEqual(['Desayuno', 'Almuerzo']); // Asegura que el estado de selectedTypes se actualice
    });
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { OrdersLogic } from '../../../utils/orders.jsx';

import Orders from './orders.jsx';

describe('Componente Orders', () => {
    it('Debería renderizar la tabla de pedidos', () => {
        render(<MemoryRouter>
            <Orders />
        </MemoryRouter>);

        expect(screen.getByRole('table')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(8);
    });

    it('Debería renderizar los detalles de un pedido', () => {

        // Mockear el módulo que contiene el hook personalizado (OrdersLogic)
        jest.mock('../../../utils/orders.jsx', () => {
            const getTotalOrder = jest.fn(() => 30);
            return {
                OrdersLogic: jest.fn(() => ({
                    getProductsList: jest.fn(),
                    getTotalOrder,
                    handleMenuClick: jest.fn(),
                    getStatusColor: jest.fn(),
                    handleCheckClick: jest.fn(),
                    handleConfirmDeleteClick: jest.fn(),
                    handleOpenModalDelete: jest.fn(),
                    handleCloseModal: jest.fn(),
                    handleOpenEditModal: jest.fn(),
                    handleEditModalProductQtyChange: jest.fn(),
                    handleConfirmEditClick: jest.fn(),
                    getUpdatedTotalOrder: jest.fn(),
                    handleAddProductToOrder: jest.fn(),
                    handleEditModalProductDelete: jest.fn(),
                    modalOpenDelete: false,
                    modalOrderId: null,
                    modalOpenEdit: false,
                    editModalTable: '',
                    setEditModalTable: jest.fn(),
                    editModalClient: '',
                    setEditModalClient: jest.fn(),
                    editModalStatus: '',
                    setEditModalStatus: jest.fn(),
                    productsData: [],
                    editModalProducts: [],
                    handleStatusChange: jest.fn(),
                    filteredOrdersData: [
                        {
                            id: 1,
                            table: 2,
                            client: 'Cliente Test',
                            products: [
                                {
                                    qty: 2,
                                    product: {
                                        name: "Sandwich",
                                        price: 10,
                                    }
                                },
                                {
                                    qty: 2,
                                    product: {
                                        name: "Café",
                                        price: 5,
                                    }
                                }
                            ],
                            status: 'En preparación el test',
                        },
                    ],
                })),
            };
        });


        render(<MemoryRouter>
            <Orders />
        </MemoryRouter>);

        expect(screen.getByText('#2')).toBeInTheDocument();
        expect(screen.getByText('Cliente Test')).toBeInTheDocument();
        expect(screen.getByText('En preparación el test')).toBeInTheDocument();
        expect(screen.getByText('$30')).toBeInTheDocument();
    });
});
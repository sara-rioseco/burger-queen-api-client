/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useNavigate, MemoryRouter } from 'react-router-dom';
import { useMenuLogic } from '../../../utils/login';
import Menu from './menu.jsx';



jest.mock('../../../utils/menu', () => {
  const handleOrdersClickMock = jest.fn();
  const useNavigate = jest.fn();
    
  return {
    useMenuLogic: jest.fn(() => ({
      showMenu: true,
      breakfastProducts: [ 
        {dateEntry: "2022-03-05 15:14:10",
        id: 1,
        image: 
        "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/cafe.png?raw=true",
        name: "Test café",
        price: 500,
        type: "Desayuno"}],
      lunchProducts: [
        {dateEntry: "2022-03-05 15:14:10",
        id: 1,
        image: "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/sandw.png?raw=true",
        name: "Test sandwich",
        price: 1000,
        type: "Almuerzo"}
      ],
      cartData: [], 
      errorLabel: '',
      getTotalPrice: jest.fn(),
      modalOrderConfirmation: false,
      handleCloseModalOrderConfirmation: jest.fn(),
      modalDelete: false,
      modalProductId: false,
      modalClientName: false,
      handleCloseModalClientName: jest.fn(),
      modalTableNumber: false,
      handleCloseModalTableNumber: jest.fn(),
      modalOrderProducts: false,
      handleCloseModalOrderProducts: jest.fn(),
      handleOpenModalOrderConfirmation: jest.fn(),
      modalOrderSuccess: false,
      handleCloseModalOrderSuccess: jest.fn(),
      handleOrdersClick: jest.fn().mockImplementation(handleOrdersClickMock),
      handleBreakfastClick: jest.fn(),
      handleLunchClick: jest.fn(),
      handleClickProduct: jest.fn(),
      handleClickAdd: jest.fn(),
      handleClickRemove: jest.fn(),
      handleClickOpenDelete: jest.fn(),
      handleCloseModal: jest.fn(),
      handleDelete: jest.fn(),
      handleCreateOrder: jest.fn(),
      validateInputs: jest.fn()
    })),
  };
});
  
  describe('Componente Menú', () => {
    it('Renderiza el componente correctamente', () => {
      render(<MemoryRouter>
        <Menu />
      </MemoryRouter>);
  
      // Verificar que el botón de pedido se encuentre en el componente
      const pedidosOption = screen.getByText('PEDIDOS');
      expect(pedidosOption).toBeInTheDocument();
  
      // Verificar que los campos de entrada del carrito estén presentes
      const clientInputElement = screen.getByPlaceholderText('Escribe aquí');
      const tableSelectElement = screen.getByDisplayValue('Selecciona la mesa');
      expect(clientInputElement).toBeInTheDocument();
      expect(tableSelectElement).toBeInTheDocument();

    });

    it('Navega a la vista de pedidos al presionar el botón de pedidos', () => {
      render(<MemoryRouter><Menu /></MemoryRouter>);
      const useNavigateMock = jest.fn();
      fireEvent(screen.getByText('PEDIDOS') , new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),);
      expect(useNavigateMock).toHaveBeenCalled();
    })

    it('Muestra menú de desayuno al entrar a la vista', () => {
      render(<MemoryRouter><Menu /></MemoryRouter>);
      const breakfastButtonElement = screen.getByText('DESAYUNO');
      fireEvent(breakfastButtonElement , new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),)
      const breakfastProduct = screen.getByText('Test café');
      expect(breakfastProduct).toBeInTheDocument();
    })

    it('Cambia al menú de almuerzo y cena al presionar el botón de almuerzo', () => {
      render(<MemoryRouter><Menu /></MemoryRouter>);
      const lunchButtonElement = screen.getByText('ALMUERZO Y CENA');
      fireEvent(lunchButtonElement, new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        showMenu: false,
      }),)
      const lunchProduct = screen.getByText('Test sandwich');
      expect(lunchProduct).toBeInTheDocument();
    })

    it('Se desloguea al presionar el botón de logout y vuelve a la vista de login', () => {
      render(<MemoryRouter><Menu /></MemoryRouter>);
    })

    it('Agrega elementos al carrito al presionar una imagen', () => {
      render(<MemoryRouter><Menu /></MemoryRouter>);
    })
    
    it('Muestra modal con alerta si falta algún campo al enviar una orden', () => {
      render(<MemoryRouter><Menu /></MemoryRouter>);
    })

    it('Crea una orden con los productos seleccionados al presionar el botón de enviar a cocina', () => {
      render(<MemoryRouter><Menu /></MemoryRouter>);
    })
  })
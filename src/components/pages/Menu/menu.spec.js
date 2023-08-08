/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { useMenuLogic } from '../../../utils/login';
import Menu from './menu.jsx';

jest.mock('../../../utils/menu', () => {
  const handleFieldChange = jest.fn();
  const handleLoginClick = jest.fn(async () => ({
    data: {
      accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlhbWF3YWl0ZXJAbWFpbC5jb20iLCJpYXQiOjE2OTE0NDgwMDksImV4cCI6MTY5MTQ1MTYwOSwic3ViIjoiMyJ9.Y7fSgmw3cAJcow_YvSQdit2MxZdoCU-TzfwOOIZHYMU",
      user: {
        email: "iamawaiter@mail.com",
        role: "waiter",
        id: 3
      }
    }
  }));
  
  return {
    useMenuLogic: jest.fn(() => ({
      formData: {
        name: '',
        password: '',
        showPassword: false,
      },
      showMenu: true,
      breakfastProducts: [],
      lunchProducts: [],
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
      handleOrdersClick: jest.fn(),
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
  
      // Verificar que los campos de entrada estén presentes
      const clientInputElement = screen.getByPlaceholderText('Escribe aquí');
      const tableSelectElement = screen.getByDisplayValue('Selecciona la mesa');
      expect(clientInputElement).toBeInTheDocument();
      expect(tableSelectElement).toBeInTheDocument();
  
      // Verificar que el botón de dasayuno esté presente
      const breakfastButtonElement = screen.getByText('DESAYUNO');
      expect(breakfastButtonElement).toBeInTheDocument();
      // Verificar que el botón de almuerzo esté presente
      const lunchButtonElement = screen.getByText('ALMUERZO Y CENA');
      expect(lunchButtonElement).toBeInTheDocument();
    });
  })
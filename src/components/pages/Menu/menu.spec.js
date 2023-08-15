/* eslint-disable no-unused-vars */
import { render, screen, fireEvent, waitFor, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Menu from './menu.jsx';
import { useNavigate as useNavigateMock } from 'react-router-dom'; // navegar entre router

// Reemplaza la importación original de useNavigate con la función simulada
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantener las importaciones reales
  useNavigate: jest.fn(), // Mockear useNavigate
}));

  
/* jest.mock('../../../utils/menu', () => {  
  const originalModule = jest.requireActual('../../../utils/menu');
  const handleOrdersClickMock = jest.fn();
  return {
    ...originalModule,
    useMenuLogic: jest.fn(() => ({
      showMenu: true,
      breakfastProducts: [ 
        {
          dateEntry: "2022-03-05 15:14:10",
          id: 1,
          image: "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/cafe.png?raw=true",
          name: "Test café",
          price: 500,
          type: "Desayuno"
        }
      ],
      lunchProducts: [
        {
          dateEntry: "2022-03-05 15:14:10",
          id: 3,
          image: "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/sandw.png?raw=true",
          name: "Test sandwich",
          price: 1000,
          type: "Almuerzo"
        }
      ],
      handleBreakfastClick: jest.fn(),
      handleLunchClick: jest.fn(),
      handleOrdersClick: jest.fn().mockImplementation(handleOrdersClickMock),
      handleClickProduct: jest.fn(),
      handleCreateOrder: jest.fn(),
      validateInputs: jest.fn(),
      getTotalPrice: jest.fn(),
      modalOrderProducts: true,
    }))
  }
}); */

describe('Componente Menú', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('El boton de logout cambia a la ruta correcta', async () => {

    const navigateMock = jest.fn();
    useNavigateMock.mockImplementation(() => navigateMock);

    render(
      <MemoryRouter>
        <Menu />
      </MemoryRouter>
    );

    const logoutButton = screen.getByAltText('Cerrar sesión');
    fireEvent.click(logoutButton);

    await waitFor(() => {
        expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });

  it('Navega a la vista de pedidos al presionar el botón de pedidos', async () => {
    const navigateMock = jest.fn();
    useNavigateMock.mockImplementation(() => navigateMock);
    render(<MemoryRouter><Menu /></MemoryRouter>);

    const ordersButton = screen.getByText('PEDIDOS');
    fireEvent.click(ordersButton);

    await waitFor(() => {
        expect(navigateMock).toHaveBeenCalled();
    });
  });

  it('Abre un modal de alerta si falta algún campo al enviar una orden', async () => {
    render(<MemoryRouter><Menu /></MemoryRouter>);
    const kitchenButton = screen.getByText('ENVIAR A COCINA');

    fireEvent.click(kitchenButton);
    await waitFor(() => {
      const alertModal = screen.getByText('Ingresa los productos al carrito');
      expect(alertModal).toBeInTheDocument();
    });
  })

})
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

// Reemplaza la importación original de useNavigate con la función simulada
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // Mantener las importaciones reales
    useNavigate: jest.fn(), // Mockear useNavigate
}));

describe('Componente Products', () => {
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
                <Products />
            </MemoryRouter>
        );

        // Obtén los elementos necesarios
        const productsButton = screen.getByText('Usuarios');

        // Ejecuta la acción (click en el botón)
        fireEvent.click(productsButton);

        // Espera a que se complete la acción asíncrona
        await waitFor(() => {
            expect(navigateMock).toHaveBeenCalledWith('/users');
        });
    });

    it('El boton de logout cambia a la ruta correcta', async () => {
        // Crea una función simulada para useNavigate
        const navigateMock = jest.fn();
        useNavigateMock.mockImplementation(() => navigateMock);

        // Renderiza el componente Login
        render(
            <MemoryRouter>
                <Products />
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
                <Products />
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
                <Products />
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

    it('Debería cambiar el array selectedTypes cuando se hace clic en una casilla', () => {
        const { getByLabelText, getByText } = render(<Products />);
    
        // Verificar que las casillas de selección de roles existen en la interfaz de usuario
        const casillaDesayuno = getByLabelText('Desayuno');
        const casillaAlmuerzo = getByLabelText('Almuerzo');
    
        // Verificar que los roles seleccionados por defecto están marcados
        expect(casillaDesayuno.checked).toBe(true);
        expect(casillaAlmuerzo.checked).toBe(true);
    
        // Desmarcar la casilla de Desayuno y Almuerzo, pero mantener Cocinero marcado
        fireEvent.click(casillaDesayuno);
        fireEvent.click(casillaAlmuerzo);
    
        // Verificar que los roles se desmarcaron correctamente
        expect(casillaDesayuno.checked).toBe(false);
        expect(casillaAlmuerzo.checked).toBe(false);
    
        // Volver a marcar la casilla de Desayunoistrador y Almuerzo
        fireEvent.click(casillaDesayuno);
        fireEvent.click(casillaAlmuerzo);
    
        // Verificar que los roles se marcaron nuevamente correctamente
        expect(casillaDesayuno.checked).toBe(true);
        expect(casillaAlmuerzo.checked).toBe(true);
      });

      it('Redirige a la página de inicio de sesión cuando el token JWT ha expirado', async () => {
        const navigateMock = jest.fn();
        useNavigateMock.mockImplementation(() => navigateMock);
    
        const mock = new MockAdapter(axios);
        mock.onGet('https://bq-api.vercel.app/products').reply(401, { data: 'jwt expired' });
    
        render(
          <MemoryRouter>
            <Products />
          </MemoryRouter>
        );
    
        await waitFor(() => {
          expect(navigateMock).toHaveBeenCalledWith('/login');
        });
      });

    //   it('Abre el modal de agregar al hacer clic en el botón de agregar', () => {
    //     const { getByAltText, getByText } = render(<Products />);
    //     const addButton = getByAltText('buttonAddProducts');
      
    //     fireEvent.click(addButton);
      
    //     const modal = screen.getByText('Agregar Producto');
    //     expect(modal).toBeInTheDocument();
      
    //     const cancelButton = getByText('CANCELAR');
    //     fireEvent.click(cancelButton);
      
    //     waitFor(() => {
    //       expect(screen.queryByText('Agregar Producto')).not.toBeInTheDocument();
    //     });
    //   });

    //   it('Muestra la información de los productos en la tabla', async () => {
    //     const mock = new MockAdapter(axios);
    //     mock.onGet('https://bq-api.vercel.app/products').reply(200, [
    //       { id: 1, name: 'Producto 1', price: 10, type: 'Desayuno', image: 'image1.jpg' },
    //       { id: 2, name: 'Producto 2', price: 15, type: 'Almuerzo', image: 'image2.jpg' },
    //     ]);
      
    //     render(<Products />);
      
    //     const product1 = await screen.findByText('Producto 1');
    //     const product2 = await screen.findByText('Producto 2');
      
    //     expect(product1).toBeInTheDocument();
    //     expect(product2).toBeInTheDocument();
    //   });

    //   it('Redirige a la página de inicio de sesión cuando el token JWT ha expirado', async () => {
    //     const navigateMock = jest.fn();
    //     useNavigateMock.mockImplementation(() => navigateMock);
    
    //     const mock = new MockAdapter(axios);
    //     mock.onGet('https://bq-api.vercel.app/products').reply(200, { data: [{
    //         "id": 1,
    //         "name": "Sandwich de jamón y queso",
    //         "price": 10,
    //         "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/sandw.png?raw=true",
    //         "type": "Desayuno",
    //         "dateEntry": "2022-03-05 15:14:10"
    //       },
    //       {
    //         "id": 2,
    //         "name": "Café americano",
    //         "price": 5,
    //         "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/cafe.png?raw=true",
    //         "type": "Desayuno",
    //         "dateEntry": "2022-03-05 15:14:10"
    //       },
    //       {
    //         "id": 3,
    //         "name": "Agua 500ml",
    //         "price": 5,
    //         "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/agua.png?raw=true",
    //         "type": "Almuerzo",
    //         "dateEntry": "2022-03-05 15:14:10"
    //       }] });
    
    //       const { getByAltText, getByText } = render(<Products />);
    //       const editButton = getByAltText('buttonEdit');
        
    //       fireEvent.click(editButton);
        
    //       const modal = await screen.findByText('Editando producto');
    //       expect(modal).toBeInTheDocument();
        
    //       const cancelButton = getByText('CANCELAR');
    //       fireEvent.click(cancelButton);
        
    //       await waitFor(() => {
    //         expect(screen.queryByText('Editando producto')).not.toBeInTheDocument();
    //       });
    //   });

    // it('Permite editar un producto al hacer clic en el botón de editar', async () => {
    //     const navigateMock = jest.fn();
    //     useNavigateMock.mockImplementation(() => navigateMock);
      
    //     const mock = new MockAdapter(axios);
    //     mock.onGet('https://bq-api.vercel.app/products').reply(200, {
    //       data: [
    //         {
    //           "id": 1,
    //           "name": "Sandwich de jamón y queso",
    //           "price": 10,
    //           "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/sandw.png?raw=true",
    //           "type": "Desayuno",
    //           "dateEntry": "2022-03-05 15:14:10"
    //         },
    //         // ...otros productos...
    //       ]
    //     });
      
    //     const { getByAltText, findByText } = render(
    //       <MemoryRouter>
    //         <Products />
    //       </MemoryRouter>
    //     );
      
    //     // Espera a que se carguen los productos
    //     await findByText('Sandwich de jamón y queso');
      
    //     // Obtén el botón de editar del primer producto
    //     const editButton = getByAltText('buttonEdit');
      
    //     // Simula el clic en el botón de editar
    //     fireEvent.click(editButton);
      
    //     // Verifica que se abra la modal de edición
    //     const modal = await screen.findByText('Editando producto');
    //     expect(modal).toBeInTheDocument();
      
    //     // ... Aquí puedes agregar más pruebas relacionadas con la modal de edición ...
    //   });

    // it('Permite editar un producto al hacer clic en el botón de editar', async () => {
    //     const navigateMock = jest.fn();
    //     useNavigateMock.mockImplementation(() => navigateMock);
    
    //     const mock = new MockAdapter(axios);
    //     mock.onGet('https://bq-api.vercel.app/products').reply(200, {
    //       data: [
    //         {
    //           "id": 1,
    //           "name": "Sandwich de jamón y queso",
    //           "price": 10,
    //           "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/sandw.png?raw=true",
    //           "type": "Desayuno",
    //           "dateEntry": "2022-03-05 15:14:10"
    //         },
    //         // ...otros productos...
    //       ]
    //     });
    
    //     const productsLogicMock = ProductsLogic(); // Llamamos a la función original
    
    //     // Hacemos un mock del método productsData para controlar su comportamiento
    //     const mockProductsData = [
    //       {
    //         "id": 1,
    //         "name": "Sandwich de jamón y queso",
    //         "price": 10,
    //         "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/sandw.png?raw=true",
    //         "type": "Desayuno",
    //         "dateEntry": "2022-03-05 15:14:10"
    //       },
    //       // ...otros productos mockeados...
    //     ];
    
    //     jest.spyOn(productsLogicMock, 'productsData').mockReturnValue(mockProductsData);
    
    //     render(
    //       <MemoryRouter>
    //         <Products />
    //       </MemoryRouter>
    //     );
    
    //     // Espera a que se carguen los productos
    //     await waitFor(() => {
    //       expect(screen.getByText('Sandwich de jamón y queso')).toBeInTheDocument();
    //     });
    
    //     // Obtén el botón de editar del primer producto
    //     const editButton = screen.getByAltText('buttonEdit');
    
    //     // Simula el clic en el botón de editar
    //     fireEvent.click(editButton);
    
    //     // Verifica que se abra la modal de edición
    //     const modal = await screen.findByText('Editando producto');
    //     expect(modal).toBeInTheDocument();
    
    //     // ... Aquí puedes agregar más pruebas relacionadas con la modal de edición ...
    //   });
});
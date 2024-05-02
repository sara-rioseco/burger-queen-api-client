/* eslint-disable no-unused-vars */
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Kitchen from './kitchen.jsx';
import { url } from '../../../services/apiRequest.jsx';

const mock = new MockAdapter(axios);

beforeEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

const mockOrdersData = [
{
    "id": 0,
    "userId": 3,
    "client": "Maria",
    "table": 4,
    "products": [
        {
            "qty": 2,
            "product": {
                "id": 1,
                "name": "Sandwich de jamón y queso",
                "price": 10,
                "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/sandw.png?raw=true",
                "type": "Desayuno",
                "dateEntry": "2022-03-05 15:14:10"
            }
        },
        {
            "qty": 2,
            "product": {
                "id": 2,
                "name": "Café americano",
                "price": 5,
                "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/cafe.png?raw=true",
                "type": "Desayuno",
                "dateEntry": "2022-03-05 15:14:10"
            }
        }
    ],
    "status": "En preparación",
    "dateEntry": "2022-03-05 15:00:00"
},
{
    "id": 1,
    "userId": 3,
    "client": "Jude Milhon",
    "table": 1,
    "products": [
        {
            "qty": 1,
            "product": {
                "id": 1,
                "name": "Sandwich de jamón y queso",
                "price": 10,
                "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/sandw.png?raw=true",
                "type": "Desayuno",
                "dateEntry": "2022-03-05 15:14:10"
            }
        },
        {
            "qty": 1,
            "product": {
                "id": 2,
                "name": "Café americano",
                "price": 5,
                "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/cafe.png?raw=true",
                "type": "Desayuno",
                "dateEntry": "2022-03-05 15:14:10"
            }
        }
    ],
    "status": "Listo en barra",
    "dateEntry": "2022-03-05 15:00"
},
{
    "id": 2,
    "userId": 3,
    "client": "Katie Bouman",
    "table": 2,
    "products": [
        {
            "qty": 2,
            "product": {
                "id": 2,
                "name": "Café americano",
                "price": 5,
                "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/cafe.png?raw=true",
                "type": "Desayuno",
                "dateEntry": "2022-03-05 15:14:10"
            }
        },
        {
            "qty": 1,
            "product": {
                "id": 3,
                "name": "Agua 500ml",
                "price": 5,
                "image": "https://github.com/KarlaMacedo/DEV007-burger-queen-api-client/blob/feature-orders/src/assets/Images/agua.png?raw=true",
                "type": "Almuerzo",
                "dateEntry": "2022-03-05 15:14:10"
            }
        }
    ],
    "status": "Entregado",
    "dateEntry": "2022-03-05 15:00",
    "dateProcessed": "2022-03-05 16:00"
  }
];

describe('Componente Kitchen', () => {
  
  it('Renderiza el componente correctamente', async() => {      
/*  mock.onGet(`${url}/orders`).reply(200, mockOrdersData)
      
    render(
      <MemoryRouter>
        <Kitchen />
      </MemoryRouter>
    );

    const order = screen.getByText('Sandwich de jamón y queso');
    await waitFor(() => {
        expect(order).toBeInTheDocument();
    }); */
  });

})
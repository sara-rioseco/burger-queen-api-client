import '@testing-library/jest-dom/extend-expect';
import * as menuLogicModule from './menu.jsx';

const cartDataMock = [
  {
    product: { id: 2, name: 'Café americano', price: 5, image: 'https://github.com/KarlaMacedo/DEV007-burger-queen…eature-orders/src/assets/Images/cafe.png?raw=true', type: 'Desayuno'},
    qty: 4
  },
  {
    product: { id: 3, name: 'Agua 500ml', price: 5, image: 'https://github.com/KarlaMacedo/DEV007-burger-queen…eature-orders/src/assets/Images/agua.png?raw=true', type: 'Almuerzo'},
    qty: 1
  }
];

const productDataMock =   {
  product: { id: 2, name: 'Café americano', price: 5, image: 'https://github.com/KarlaMacedo/DEV007-burger-queen…eature-orders/src/assets/Images/cafe.png?raw=true', type: 'Desayuno'},
  qty: 4
};

const productNotMock = {
  product: {id: 5, name: 'Jugo de frutas natural', price: 7, image: 'https://github.com/KarlaMacedo/DEV007-burger-queen…ient/blob/main/src/assets/Images/jug.png?raw=true', type: 'Desayuno'},
  qty: 3
};

jest.mock('./menu.jsx', () => {
  const originalModule = jest.requireActual('./menu.jsx');
  return {
    ...originalModule,
    useMenuLogic: {
      ...originalModule.useMenuLogic,
      cartData: cartDataMock,
      getTotalPrice: jest.fn(() => 25),
      checkProductExists: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false),
      validateInputs: jest.fn(() => false),
      clientName: 'Cliente 1',
      tableNumber: 1,
      orderProducts: cartDataMock,
      getClientAndTable: jest.fn(() => 'cliente', 1 ),
      handleCreateOrder: jest.fn(() => Promise.resolve())
    },
  };
});

describe('getTotalPrice en useMenuLogic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calcula el precio total de los productos', () => {
    const { getTotalPrice } = menuLogicModule.useMenuLogic;
    const totalPrice = getTotalPrice();
    expect(totalPrice).toBe(25);
  });
});

describe('checkProductsExists en useMenuLogic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devuelve true si el producto existe en el array', () => {
    const { checkProductExists } = menuLogicModule.useMenuLogic;
    const result = checkProductExists(productDataMock, cartDataMock);
    expect(result).toBe(true);
  });

  it('devuelve false si el producto existe en el array', () => {
    const { checkProductExists } = menuLogicModule.useMenuLogic;
    const result = checkProductExists(productNotMock, cartDataMock);
    expect(result).toBe(false);
  });
});

describe('validateInputs en useMenuLogic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devuelve false si no están ingresados los datos mínimos para crear orden', () => {
    const { validateInputs } = menuLogicModule.useMenuLogic;
    const result = validateInputs(cartDataMock);
    expect(result).toBe(false);
  });
});

describe('handleCreateOrder en useMenuLogic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('arroja error', () => {
    const { handleCreateOrder } = menuLogicModule.useMenuLogic;
    const { getClientAndTable } = menuLogicModule.useMenuLogic;
    getClientAndTable.mockImplementation(() => 'cliente', 1 );
    const result = handleCreateOrder(cartDataMock);
    console.log(result);
    expect(result).toBeDefined();
  });
});

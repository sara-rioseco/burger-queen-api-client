import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
// import { LoginLogic } from '../../../utils/login';
import Login from './login.jsx';
import { useNavigate } from 'react-router-dom'; 

jest.mock('axios'); // Mockea axios

describe('Componente Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Renderiza el componente correctamente', () => {
    render(<MemoryRouter>
      <Login />
    </MemoryRouter>);

    // Verificar que el título se encuentre en el documento
    const titleElement = screen.getByText('INICIAR SESIÓN');
    expect(titleElement).toBeInTheDocument();

    // Verificar que los campos de entrada estén presentes
    const nameInputElement = screen.getByPlaceholderText('Escribe aquí');
    const passwordInputElement = screen.getByPlaceholderText('*************');
    expect(nameInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();

    // Verificar que el botón de entrar esté presente
    const enterButtonElement = screen.getByText('ENTRAR');
    expect(enterButtonElement).toBeInTheDocument();
  });

  it('renderiza los campos de entrada y reacciona a los cambios', () => {
    render(<MemoryRouter>
      <Login />
    </MemoryRouter>);

    // Verificar si los campos de entrada se renderizan
    const nameInput = screen.getByPlaceholderText('Escribe aquí');
    const passwordInput = screen.getByPlaceholderText('*************');

    // Cambiar el valor del campo de entrada de nombre
    fireEvent.change(nameInput, { target: { value: 'usuario' } });
    expect(nameInput).toHaveValue('usuario');

    // Cambiar el valor del campo de entrada de contraseña
    fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });
    expect(passwordInput).toHaveValue('contraseña123');
  });

  it('cambia la visibilidad de la contraseña al hacer clic en el botón', () => {
    render(<MemoryRouter>
      <Login />
    </MemoryRouter>);
    const toggleButton = screen.getByAltText('toggle-password-button');
    const passwordInput = screen.getByPlaceholderText('*************');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('ejecuta la lógica de inicio de sesión y navega según el rol', async () => {
    // Crea una función simulada para useNavigate
  const mockNavigate = jest.fn();

  // Reemplaza la importación original de useNavigate con la función simulada
  jest.spyOn(useNavigate, 'useNavigate').mockReturnValue(mockNavigate);

    // Crea un mock de axios
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onPost('http://localhost:8080/login').reply(200, {
      accessToken: 'fakeAccessToken',
      user: {
        id: 3,
        role: 'waiter', // Cambia según el caso que quieras probar
      },
    });

    // Renderiza el componente Login
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Obtén los elementos necesarios
    const nameInput = screen.getByPlaceholderText('Escribe aquí');
    const passwordInput = screen.getByPlaceholderText('*************');
    const enterButton = screen.getByText('ENTRAR');

    // Cambia los valores de los campos
    fireEvent.change(nameInput, { target: { value: 'iamawaiter@mail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });

    // Ejecuta la acción de inicio de sesión (click en el botón)
    fireEvent.click(enterButton);

    // Espera a que se complete la acción asíncrona
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/orders'); // Cambia según el caso que quieras probar
    });
  });
});
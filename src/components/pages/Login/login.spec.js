/* eslint-disable no-unused-vars */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './login.jsx';
import { useNavigate as useNavigateMock } from 'react-router-dom'; // navegar entre router

// Reemplaza la importación original de useNavigate con la función simulada
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantener las importaciones reales
  useNavigate: jest.fn(), // Mockear useNavigate
}));

describe('Componente Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
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
    jest.mock('axios'); // Mockea axios
    // Crea una función simulada para useNavigate
    const navigateMock = jest.fn();
    useNavigateMock.mockImplementation(() => navigateMock);

    // Crea un mock de axios
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onPost('https://localhost:8080/login').reply(200, {
      accessToken: 'fakeAccessToken',
      user: {
        id: 3,
        role: 'waiter',
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
      expect(navigateMock).toHaveBeenCalledWith('/orders');
    });
  });

  it('muestra el mensaje de error "Completa los campos requeridos" cuando los campos están vacíos', async () => {
    // Mockea axios para que simule una respuesta con status 400
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onPost('https://localhost:8080/login').reply(400, 'Email and password are required');

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Obtén los elementos necesarios
    const nameInput = screen.getByPlaceholderText('Escribe aquí');
    const passwordInput = screen.getByPlaceholderText('*************');
    const enterButton = screen.getByText('ENTRAR');

    // Ejecuta la acción de inicio de sesión (click en el botón)
    fireEvent.click(enterButton);

    // Espera a que se complete la acción asíncrona
    await waitFor(() => {
      const errorLabel = screen.getByText('Completa los campos requeridos');
      expect(errorLabel).toBeInTheDocument();
    });
  });

  it('muestra el mensaje de error "Usuario no registrado" cuando el usuario no existe', async () => {
    // Mockea axios para que simule una respuesta con status 400
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onPost('https://localhost:8080/login').reply(400, 'Cannot find user');

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Obtén los elementos necesarios
    const nameInput = screen.getByPlaceholderText('Escribe aquí');
    const passwordInput = screen.getByPlaceholderText('*************');
    const enterButton = screen.getByText('ENTRAR');

    // Ejecuta la acción de inicio de sesión (click en el botón)
    fireEvent.click(enterButton);

    // Espera a que se complete la acción asíncrona
    await waitFor(() => {
      const errorLabel = screen.getByText('Usuario no registrado');
      expect(errorLabel).toBeInTheDocument();
    });
  });

  it('muestra el mensaje de error "Credenciales incorrectas" cuando la contraseña es incorrecta', async () => {
    // Mockea axios para que simule una respuesta con status 400
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onPost('https://localhost:8080/login').reply(400, 'Incorrect password');

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Obtén los elementos necesarios
    const nameInput = screen.getByPlaceholderText('Escribe aquí');
    const passwordInput = screen.getByPlaceholderText('*************');
    const enterButton = screen.getByText('ENTRAR');

    // Ejecuta la acción de inicio de sesión (click en el botón)
    fireEvent.click(enterButton);

    // Espera a que se complete la acción asíncrona
    await waitFor(() => {
      const errorLabel = screen.getByText('Credenciales incorrectas');
      expect(errorLabel).toBeInTheDocument();
    });
  });

  it('navega a la página de error cuando ocurre un error desconocido', async () => {
    // Mockea axios para que simule un error
    const mockAdapter = new MockAdapter(axios);
    mockAdapter.onPost('https://localhost:8080/login').reply(500);

    const navigateMock = jest.fn();
    useNavigateMock.mockImplementation(() => navigateMock);

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // Obtén los elementos necesarios
    const nameInput = screen.getByPlaceholderText('Escribe aquí');
    const passwordInput = screen.getByPlaceholderText('*************');
    const enterButton = screen.getByText('ENTRAR');

    // Ejecuta la acción de inicio de sesión (click en el botón)
    fireEvent.click(enterButton);

    // Espera a que se complete la acción asíncrona
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/error-page');
    });
  });
});
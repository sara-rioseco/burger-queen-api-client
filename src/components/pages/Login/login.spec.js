import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Login from './login.jsx';

describe('Componente Login', () => {
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
});
/* eslint-disable no-unused-vars */
// login.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import * as LoginLogicFile from '../../../utils/login';
import Login from './login.jsx';

// Mockear el módulo que contiene el hook personalizado (LoginLogic)
/* jest.mock('../../../utils/login', () => {
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
    LoginLogic: jest.fn(() => ({
      formData: {
        name: '',
        password: '',
        showPassword: false,
      },
      handleFieldChange,
      errorLabel: '',
      togglePasswordVisibility: jest.fn(),
      getPasswordInputType: jest.fn().mockReturnValue('text'),
      handleLoginClick,
    })),
  };
}); */

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

  it('Llama a la función adecuada al llenar los inputs', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);

    // Acceder a la instancia de LoginLogic
    jest.spyOn(LoginLogicFile, 'LoginLogic').getMockImplementation(() => {
      return {
        ...LoginLogicFile.LoginLogic(),
        handleFieldChange: jest.fn()
      };
    });

    // Simular cambios en los campos de entrada
    const nameInputElement = screen.getByPlaceholderText('Escribe aquí');
    fireEvent.change(nameInputElement, { target: { value: 'iamawaiter@mail.com' } });
    expect(LoginLogicFile.LoginLogic.handleFieldChange).toHaveBeenCalledWith('name', expect.objectContaining({ target: nameInputElement }));

    const passwordInputElement = screen.getByPlaceholderText('*************');
    fireEvent.change(passwordInputElement, { target: { value: '123456' } });
    expect(LoginLogicFile.LoginLogic.handleFieldChange).toHaveBeenCalledWith('password', expect.objectContaining({ target: passwordInputElement }));
  });

  it('Llama la función adecuada al interactuar con el botón "ENTRAR"', async () => {
    render(<MemoryRouter><Login /></MemoryRouter>);

    // Acceder a la instancia de LoginLogic
    const loginLogicInstance = LoginLogic();

    // Simular clic en el botón "ENTRAR"
    const enterButtonElement = screen.getByText('ENTRAR');
    fireEvent.click(enterButtonElement);
    expect(loginLogicInstance.handleLoginClick).toHaveBeenCalled();

    // Simular obtener respuesta del login
    const response = await loginLogicInstance.handleLoginClick()
 
    // Verificar que la respuesta sea correcta
    expect(response.data).toEqual({
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlhbWF3YWl0ZXJAbWFpbC5jb20iLCJpYXQiOjE2OTE0NDgwMDksImV4cCI6MTY5MTQ1MTYwOSwic3ViIjoiMyJ9.Y7fSgmw3cAJcow_YvSQdit2MxZdoCU-TzfwOOIZHYMU',
      user: { email: 'iamawaiter@mail.com', role: 'waiter', id: 3 }
    });
  });
});
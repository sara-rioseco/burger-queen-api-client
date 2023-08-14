import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Kitchen from './kitchen.jsx';

describe('Componente Kitchen', () => {
     it('Renderiza el componente correctamente', () => {      

      render(
      <MemoryRouter>
        <Kitchen />
      </MemoryRouter>
      );
  
      const titleOne = screen.getByText('EN PREPARACIÓN');
      const titleTwo = screen.getByText('LISTO EN BARRA');
      const logoutButton = screen.getByAltText('Cerrar sesión');
      expect(titleOne).toBeInTheDocument();
      expect(titleTwo).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
    });
});
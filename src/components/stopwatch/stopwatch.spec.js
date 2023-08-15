import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Stopwatch from "./stopwatch";

describe('Componente Kitchen', () => {
  const orderTimeMock = '2022-08-15 00:00:00'

  it('Renderiza el componente correctamente', () => {      

   render(
     <Stopwatch isActive={true} time={orderTimeMock} />
   );

   const time = screen.getByTestId('stopwatch-container');
   expect(time).toBeInTheDocument();

 });
});
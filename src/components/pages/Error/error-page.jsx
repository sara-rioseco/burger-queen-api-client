import './error-page.css'
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx'
import { useRouteError } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // navegar entre router

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  const handleClick = () => {
    navigate('/')
    console.error(error);
  };

  return (
    <>
      <div className='containerError'id="error-page">
        <h1 className='titleError'>¡Ay no!</h1>
        <h2 className='subtitleError'>Ha ocurrido un error inesperado</h2>
        <p className='textError'>Error {error.status} : {error.error.message || ''}</p>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="VOLVER A HOME" onClick={handleClick} classButton='buttonError'/>
      </div>
    </>
  )
}
// HOOKS
import { useNavigate } from 'react-router-dom';
// CSS
import './home.css'
//COMPONENTES
import Button from '../../button/button.jsx'
//ASSETS
import logo from '../../../assets/Images/logo.png'

export default function Home() {
  // HOOK PARA ANDAR POR EL ROUTER
  const navigate = useNavigate();

  // FUNCIÓN PARA IR A PÁGINA DE LOGIN
  const handleClickEnter = () => {
    navigate('/login');
  };

  // RENDERIZADO
  return (
    <>
      <div className='home'>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="INICIAR SESIÓN" onClick={handleClickEnter} classButton="enter" />
      </div>
    </>
  )
}
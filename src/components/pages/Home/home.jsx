import './home.css'
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx'
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Hola HOME');
    navigate('/login');
  };

  return (
    <>
      <div className='home'>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="INICIAR SESIÓN" onClick={handleClick} classButton="enter"/>
      </div>
    </>
  )
}
import { useNavigate } from 'react-router-dom';

import './home.css'

import Button from '../../button/button.jsx'

import logo from '../../../assets/Images/logo.png'



export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
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
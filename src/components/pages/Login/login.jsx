import './login.css'
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx'

export default function Login() {

  const handleClick = () => {
    console.log('Hola LOGIN');
  };

  return (
    <>
      <div className='home'>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="LOGIN" onClick={handleClick} />
      </div>
    </>
  )
}
import './menu.css'
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx'

export default function Menu() {

  const handleClick = () => {
    console.log('Hola MENU');
  };

  return (
    <>
      <div className='home'>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="MENU" onClick={handleClick} />
      </div>
    </>
  )
}
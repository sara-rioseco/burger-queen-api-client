import './kitchen.css'
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx'

export default function Kitchen() {

  const handleClick = () => {
    console.log('Hola KITCHEN');
  };

  return (
    <>
      <div className='home'>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="KITCHEN" onClick={handleClick} />
      </div>
    </>
  )
}
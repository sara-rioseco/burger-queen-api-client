import './orders.css'
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx'

export default function Orders() {

  const handleClick = () => {
    console.log('Hola ORDERS');
  };

  return (
    <>
      <div className='home'>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="ORDERS" onClick={handleClick} />
      </div>
    </>
  )
}
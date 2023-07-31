import './products.css'
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx'

export default function Products() {

  const handleClick = () => {
    console.log('Hola PRODUCTS');
  };

  return (
    <>
      <div className='home'>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="PRODUCTS" onClick={handleClick} />
      </div>
    </>
  )
}
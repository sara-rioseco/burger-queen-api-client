import './home.css'
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx'

export default function Home() {

  const handleClick = () => {
    console.log('Hola HOME');
  };

  return (
    <>
      <div className='home'>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="HOME" onClick={handleClick} />
      </div>
    </>
  )
}
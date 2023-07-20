import './App.css'
import logo from './assets/Images/logo.png'
import Button from './components/button/button.jsx'

export default function App() {

  const handleClick = () => {
    console.log('Hola');
  };

  return (
    <>
      <div className='home'>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="Iniciar sesión" onClick={handleClick} />
      </div>
    </>
  )
}

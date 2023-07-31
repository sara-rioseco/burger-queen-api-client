import './App.css'
import logo from './assets/Images/logo.png'
import Button from './components/button/button.jsx'

function App() {

  const handleClick = () => {
    console.log('Hola APP');
  };

  return (
    <>
      <div>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="APP" onClick={handleClick} />
      </div>
    </>
  )
}

export default App

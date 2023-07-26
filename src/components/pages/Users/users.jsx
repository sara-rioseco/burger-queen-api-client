import './users.css'
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx'
import LogoutButton from '../../logoutButton/logoutButton';

export default function Users() {

  const handleClick = () => {
    console.log('Hola USERS');
  };

  return (
    <>
      <div className='home'>
        <img src={logo} className="logo" alt="img logo" />
        <Button label="USERS" onClick={handleClick} />
        <LogoutButton />
      </div>
    </>
  )
}
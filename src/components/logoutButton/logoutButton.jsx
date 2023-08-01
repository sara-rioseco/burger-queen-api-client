// HOOK
import { useNavigate } from 'react-router-dom'; // Navegar por el router
// CSS
import './logoutButton.css'
// ASSETS
import Out from '../../assets/Images/out.png'

export default function LogoutButton() {
  const navigate = useNavigate();

  // FUNCIÓN PARA ENVIAR A HOME Y ELIMINAR INFO DEL USUARIO EN LOCALSTORAGE
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');

    navigate('/');
  };

  // RENDERIZADO
  return (
    <img
      src={Out}
      alt="Cerrar sesión"
      onClick={handleLogout}
      className="out"
    />
  );
}

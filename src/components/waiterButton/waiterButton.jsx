// HOOK
import { useNavigate } from 'react-router-dom'; // Navegar por el router
// CSS
import './waiterButton.css'
// ASSETS
import Waiter from '../../assets/Images/waiter.png'

export default function WaiterButton() {
  const navigate = useNavigate();

  // FUNCIÓN PARA ENVIAR A HOME Y ELIMINAR INFO DEL USUARIO EN LOCALSTORAGE
  const handleWaiterButton = () => {
    navigate('/orders');
  };

  // RENDERIZADO
  return (
    <img
      src={Waiter}
      alt="Ir a vista de pedidos"
      onClick={handleWaiterButton}
      className="out"
    />
  );
}

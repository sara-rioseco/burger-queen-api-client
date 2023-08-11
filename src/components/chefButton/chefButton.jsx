// HOOK
import { useNavigate } from 'react-router-dom'; // Navegar por el router
// CSS
import './chefButton.css'
// ASSETS
import Chef from '../../assets/Images/chef.png'

export default function ChefButton() {
  const navigate = useNavigate();

  // FUNCIÓN PARA ENVIAR A COCINA
  const handleChefButton = () => {
    navigate('/kitchen');
  };

  // RENDERIZADO
  return (
    <img
      src={Chef}
      alt="Ir a vista de cocina"
      onClick={handleChefButton}
      className="out"
    />
  );
}


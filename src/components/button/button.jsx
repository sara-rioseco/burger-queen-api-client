import PropTypes from 'prop-types'; // valida tipos de propiedades y restricciones del componente
// CSS
import './button.css';

export default function Button({ label, onClick, classButton }) {
  // RENDERIZADO
  return (
    <button className={`buttonDefault ${classButton}`} onClick={onClick} alt={`${label}`}>
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  classButton: PropTypes.string
};
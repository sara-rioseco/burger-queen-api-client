import PropTypes from 'prop-types'; // valida tipos de propiedades y restricciones del componente
// CSS
import './modal.css';

export default function Modal({ open, onClose, children }) {
  if (!open) return null; // No renderiza nada si no está abierta

  // RENDERIZADO
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times; {/* Síbolo de x en HTML */}
        </span>
        <div className='contentModal'>
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

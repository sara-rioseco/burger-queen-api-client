/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>
          &times;
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

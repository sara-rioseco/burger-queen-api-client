/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

export default function Button({label, onClick, classButton}) {
    return (
      <button className={`buttonDefault ${classButton}`} onClick={onClick}>
        {label}
      </button>
    );
  }

  Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    classButton: PropTypes.string
  };
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './input.css'

export default function Input({ type, placeholder, value, onChange, label, classInputLabel, classInput }) {
  return (
    <>
        <div className='containerInput'>
            {label && <label className={`labelDefault ${classInputLabel}`} >{label}</label>}
            <input
                type={type}
                className={`inputDefault ${classInput}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    </>
  );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    label: PropTypes.string,
    classInputLabel: PropTypes.string,
    classInput: PropTypes.string
}

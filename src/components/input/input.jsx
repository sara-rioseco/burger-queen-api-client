/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

export default function Input({ type, placeholder, value, onChange, label, classInputLabel, classInput,classContainer }) {
  return (
    <>
        <div className={classContainer}>
            {label && <label className={classInputLabel} >{label}</label>}
            <input
                type={type}
                className={classInput}
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
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
    classInputLabel: PropTypes.string,
    classInput: PropTypes.string,
    classContainer: PropTypes.string
}

/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

export default function Button(props) {
    return (
      <button className="button" onClick={props.onClick}>
        {props.label}
      </button>
    );
  }

  Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };
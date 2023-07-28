/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from 'prop-types';
import './switch.css'
import Menu from "../pages/Menu/menu.jsx";
  
export default function Switch({ label, onChange }) {

  return (
    <div className="toggle-button-cover">
      <div className="button r" id="button-3">
        <input type="checkbox" onChange={onChange} className="checkbox" 
               name={label} id={label} />
          <div className="knobs"></div>
          <div className="layer"></div>
      </div>
    </div>
  );
}

Switch.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
}
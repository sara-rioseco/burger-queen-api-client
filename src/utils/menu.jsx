/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function menuLogic() {
  // const navigate = useNavigate();
  // const [menu, setMenu] = useState('breakfast');

	const getProductImg = product => (<img src={product.image} alt={product.name}/>)

  return {
    getProductImg,
  }
}
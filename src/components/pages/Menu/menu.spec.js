/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { MenuLogic } from '../../../utils/login';
import Menu from './menu.jsx';
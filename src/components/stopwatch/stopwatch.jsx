import PropTypes from 'prop-types';

import './stopwatch.css';

export default function Stopwatch({ isActive , time }) {
  return (
    <div className='stopwatch-container' data-testid='stopwatch-container'>
      {isActive &&
        <span className='stopwatch-time'>{time}</span>
      }
    </div>
  );
}

Stopwatch.propTypes = {
  isActive: PropTypes.bool.isRequired,
  time: PropTypes.string.isRequired,
};
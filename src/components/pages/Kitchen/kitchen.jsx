/* eslint-disable no-unused-vars */
// Import our custom CSS
import '../../../scss/styles.scss'
// CSS
import './kitchen.css'
// COMPONENTS
import logo from '../../../assets/Images/logo.png'
import Button from '../../button/button.jsx';
import LogoutButton from '../../logoutButton/logoutButton';
import Modal from '../../modal/modal.jsx';
// ASSETS
import { useKitchenLogic } from '../../../utils/kitchen';
import Stopwatch from '../../stopwatch/stopwatch';

export default function Kitchen() {
  const {
    navigate,
    token,
    userId,
    ordersData,
    pendingOrders,
    preparedOrders,
    stopwatch,
    setOrdersData,
    setStopwatch,
    calculateTimePassed
  } = useKitchenLogic();

  const handleClick = () => {

    console.log(calculateTimePassed("2023-08-09 03:45:50"));
  };

  return (
    <>
      <div className='kitchen-container'>
        <div className='kitchen-header'>PENDIENTES</div>
        <div className='kitchen-body'>
          {pendingOrders.map(order => (
            <div key={order.id} className='order-container'>
              <div className='order-header'>
                <h2 className='order-title'>Mesa #{order.table}</h2>
                <h2 className='order-time'></h2>
              </div>
              <div className='order-body'>
                <h2 className='order-content'>
                  {order.products.map(product => {
                  <h2>{product.name} x {product.qty}
                  </h2>
                })}</h2>
              </div>
              <div className='order-footer'>
              <Button label="ORDEN LISTA" onClick={handleClick} />
              </div>
            </div>
          ))}
        </div>
        <div className='kitchen-header'>LISTOS</div>
        <div className='kitchen-body'>
          {preparedOrders.map(order => (
            <div key={order.id} className='order-container'>
              <div className='order-header'>
                <h2 className='order-title'>Mesa #{order.table}</h2>
                <h2 className='order-time'></h2>
              </div>
              <div className='order-body'>
              </div>
              <div className='order-footer'>
              <Button label="ORDEN LISTA" onClick={handleClick} />
              </div>
            </div>
          ))}
        </div>
        <Button label="KITCHEN" onClick={handleClick} />
        <Stopwatch isActive={stopwatch} time={calculateTimePassed("2023-08-09 03:45:50")} />
        <div className='logout-section'>
          <div className='logout-button'><LogoutButton /></div>
        </div>
      </div>
    </>
  )
}
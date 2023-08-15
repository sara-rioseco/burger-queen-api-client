// CSS
import './kitchen.css'
// COMPONENTS
import Button from '../../button/button.jsx';
import LogoutButton from '../../logoutButton/logoutButton';
import Modal from '../../modal/modal.jsx';
// ASSETS
import { useKitchenLogic } from '../../../utils/kitchen';
import Stopwatch from '../../stopwatch/stopwatch';

export default function Kitchen() {
  const {
    pendingOrders,
    preparedOrders,
    calculateTimePassed,
    updateTimerEachSecond,
    handleOpenModalUpdateOrder,
    handleCloseModalUpdateOrder,
    modalUpdateOrder,
    updateOrderStatus,
    modalUpdateOrderId
  } = useKitchenLogic();

  return (
    <>
      <div className='kitchen-container'>
        <div className='kitchen-header'>EN PREPARACIÓN</div>
        <div className='kitchen-body'>
          {pendingOrders.map(order => (
            updateTimerEachSecond(order),
            <div key={order.id} className='order-container'>
              <div className='order-header'>
                <h2 className='order-title'>Mesa #{order.table}</h2>
                <h2 className='order-time'><Stopwatch isActive={true} time={calculateTimePassed(order.dateEntry)} /></h2>
              </div>
              <div className='order-body'>
                <div className='order-content'>
                  {order.products.map(product => (
                  <h2 className='product-content' key={`00${order.id}00${product.product.id}`}>{product.product.name} x {product.qty}</h2>
                  ))}
                </div>
              </div>
              <div className='order-footer'>
                <Modal open={modalUpdateOrder && modalUpdateOrderId === order.id} onClose={handleCloseModalUpdateOrder}>
                  <h2 className='textModal'>¿Deseas marcar la orden como lista en barra?</h2>
                  <h2 className='textModal'>Mesa #{order.table}</h2>            
                  {order.products.map(product => (
                    <h2 className='product-content' key={`00${order.id}00${product.product.id}`}>{product.product.name} x {product.qty}</h2>))}
                  <div>
                    <Button
                      label='CONFIRMAR'
                      onClick={() => updateOrderStatus(order.id)}
                      classButton='buttonsModal'>
                    </Button>
                    <Button
                      label='CANCELAR'
                      onClick={handleCloseModalUpdateOrder}
                      classButton='buttonsModal'>
                    </Button>
                  </div>
                </Modal>
                <Button classButton='buttonOrder' label="ORDEN LISTA" onClick={() => handleOpenModalUpdateOrder(order.id)} />
              </div>
            </div>
          ))}
        </div>
        <div className='kitchen-header'>LISTO EN BARRA</div>
        <div className='kitchen-body'>
          {preparedOrders.map(order => (
            <div key={order.id} className='order-container'>
              <div className='order-header'>
                <h2 className='order-title'>Mesa #{order.table}</h2>
                <h2 className='order-time'>Terminado</h2>
              </div>
              <div className='order-body'>
                <div className='order-content'>
                  {order.products.map(product => (
                  <h2 className='product-content' key={`00${order.id}00${product.product.id}`}>{product.product.name} x {product.qty}</h2>
                  ))}
                </div>
              </div>
              <div className='order-footer'>
              </div>
            </div>
          ))}
        </div>
        <div className='logout-section'>
          <div className='logout-button'><LogoutButton /></div>
        </div>
      </div>
    </>
  )
}
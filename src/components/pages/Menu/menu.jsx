// CSS
import './menu.css'
// COMPONENTS
import Button from '../../button/button.jsx';
import LogoutButton from '../../logoutButton/logoutButton';
import Modal from '../../modal/modal.jsx';
// ASSETS
import Delete from '../../../assets/Images/borrar.png'
import Add from '../../../assets/Images/add.png'
import Remove from '../../../assets/Images/remove.png'
import { useMenuLogic } from '../../../utils/menu';

export default function Menu() {
  const {
    showMenu,
    breakfastProducts,
    lunchProducts,
    cartData,
    getTotalPrice,
    modalDelete,
    modalProductId,
    modalClientName,
    handleCloseModalClientName,
    modalTableNumber,
    handleCloseModalTableNumber,
    modalOrderProducts,
    handleCloseModalOrderProducts,
    modalOrderConfirmation,
    handleOpenModalOrderConfirmation,
    handleCloseModalOrderConfirmation,
    modalOrderSuccess,
    handleCloseModalOrderSuccess,
    handleOrdersClick,
    handleBreakfastClick,
    handleLunchClick,
    handleClickProduct,
    handleClickAdd,
    handleClickRemove,
    handleClickOpenDelete,
    handleCloseModal,
    handleDelete,
    handleCreateOrder,
    validateInputs
  } = useMenuLogic();

// =========== RENDERIZADO ===========
  return (
    <>
      <div className='menu-container'>
        <nav className='nav-bar'>
          <Button label='PEDIDOS' onClick={handleOrdersClick} classButton='buttonMenu' alt='Botón de pedidos'/> 
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="buttonDefault buttonBreakfast" onClick={handleBreakfastClick} alt='Botón de productos desayuno'>DESAYUNO</button>
            <button type="button" className="buttonDefault buttonLunch" onClick={handleLunchClick} alt='Botón de productos almuerzo y cena'>ALMUERZO Y CENA</button>
          </div>
        </nav>
        {showMenu && (
          <div className='products-grid'>
            {breakfastProducts.map(product => (
              <div key={product.id} className='product' onClick={() => handleClickProduct(product)} data-testid={`breakfast-product-${product.id}`}> 
                <div className='image-content'><img src={product.image} alt={product.name} className='image' /></div>
                <div className='text-content'>
                  <div className='product-name'>{product.name}</div>
                  <div className='product-price'>${product.price},00</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!showMenu && (
          <div className='products-grid'>
            {lunchProducts.map(product => (
              <div key={product.id} className='product'  onClick={() => handleClickProduct(product)} data-testid={`lunch-product-${product.id}`}> 
                <div className='image-content'><img src={product.image} alt={product.name} className='image' /></div>
                <div className='text-content' >
                  <div className='product-name'>{product.name}</div>
                  <div className='product-price'>${product.price},00</div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className='logout-section'>
          <div className='logout-button'><LogoutButton /></div>
        </div>
      </div>
      <div className='cart-section'>
        <div className='cart-text'>CLIENTE:</div>
        <div><input className='cart-input form-control' type='text' id='client' placeholder='Escribe aquí'></input></div>
        <div className='cart-text'>MESA:</div>
        <div>
          <select className='form-select cart-input' aria-label='select-input' id='table' defaultValue={'default'}>
            <option value='default' disabled>Selecciona la mesa</option>
            <option value='1'>Mesa 1</option>
            <option value='2'>Mesa 2</option>
            <option value='3'>Mesa 3</option>
            <option value='4'>Mesa 4</option>
            <option value='5'>Mesa 5</option>
            <option value='6'>Mesa 6</option>
            <option value='7'>Mesa 7</option>
            <option value='8'>Mesa 8</option>
          </select>
        </div>
        <div className='cart-table-container'>
        <table className='cart-table'>
          <thead>
            <tr key='head' className="table-head">
              <th className="table-title" colSpan='4'>CARRITO</th>
            </tr>
          </thead>
          <tbody>
            {cartData && cartData.map((product) => (
              <tr key={product.id}>
                <td className='table-body'>{product.name}</td>
                <td className='table-count'><img src={Remove} alt='remove-button' className='action-button' onClick={()=> handleClickRemove(product)}/>{'\u00A0'}{'\u00A0'}{product.qty}{'\u00A0'}{'\u00A0'}<img src={Add} alt='add-button' className='action-button' onClick={()=> handleClickAdd(product)}/></td>
                <td className='table-number'>${product.qty*product.price},00</td>
                <td className='modalDelete'>
                  <Modal open={modalDelete && modalProductId === product.id} onClose={handleCloseModal}>
                    <h2 className='textModal'>¿Deseas eliminar este producto?</h2>
                    <h2 className='textModal'>{product.name} x {product.qty}</h2>
                    <div>
                      <Button
                        label='CONFIRMAR'
                        onClick={() => handleDelete(product)}
                        classButton='buttonsModal'>
                      </Button>
                      <Button
                        label='CANCELAR'
                        onClick={handleCloseModal}
                        classButton='buttonsModal'>
                      </Button>
                    </div>
                  </Modal></td>
                <td className='table-number'><img src={Delete} alt='delete-button' className='action-button' onClick={()=> handleClickOpenDelete(product)}/></td> 
              </tr>
            ))}  
          </tbody>
          <tfoot>
            <tr key='foot' className="table-footer">
              <td className='table-end'> Total : </td>
              <td className='table-body'> </td>
              <td className='table-number'>${getTotalPrice()},00</td>
              <td className='table-body'> </td>
            </tr>
          </tfoot>
        </table>
        </div>
        <div>
          <Modal open={modalOrderConfirmation} onClose={handleCloseModalOrderConfirmation}>
            <h2 className='textModal'>¿Deseas enviar la orden a la cocina?</h2>
            <div>
              <Button
                label='CONFIRMAR'
                onClick={() => handleCreateOrder(cartData)}
                classButton='buttonsModal'>
              </Button>
              <Button
                label='CANCELAR'
                onClick={handleCloseModalOrderConfirmation}
                classButton='buttonsModal'>
              </Button>
            </div>
          </Modal>
          <Modal open={modalClientName} onClose={handleCloseModalClientName}>
            <h2 className='textModal'>Ingresa el nombre del cliente</h2>
            <div>
                <Button
                label='ACEPTAR'
                onClick={handleCloseModalClientName}
                classButton='buttonsModal'>
              </Button>
            </div>
          </Modal>
          <Modal open={modalTableNumber} onClose={handleCloseModalTableNumber}>
            <h2 className='textModal'>Selecciona el número de mesa</h2>
            <div>
                <Button
                label='ACEPTAR'
                onClick={handleCloseModalTableNumber}
                classButton='buttonsModal'>
              </Button>
            </div>
          </Modal>
          <Modal open={modalOrderProducts} onClose={handleCloseModalOrderProducts}>
            <h2 className='textModal'>Ingresa los productos al carrito</h2>
            <div>
                <Button
                label='ACEPTAR'
                onClick={handleCloseModalOrderProducts}
                classButton='buttonsModal'>
              </Button>
            </div>
          </Modal>
          <Modal open={modalOrderSuccess} onClose={handleCloseModalOrderSuccess}>
            <h2 className='textModal'>La ha orden se ha creado exitosamente</h2>
            <div>
                <Button
                label='ACEPTAR'
                onClick={handleCloseModalOrderSuccess}
                classButton='buttonsModal'>
              </Button>
            </div>
          </Modal>
        </div>
        <Button label='ENVIAR A COCINA' onClick={() => {
          try {
            validateInputs(cartData)
          } catch {
            (e) => console.log(e, 'error validating data')
          } finally {
            validateInputs(cartData) ? handleOpenModalOrderConfirmation(): console.log('error validating data');
          }
        }} classButton='buttonMenu'/>
      </div>
    </>
  )
}
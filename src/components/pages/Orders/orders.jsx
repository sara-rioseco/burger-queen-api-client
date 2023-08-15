// CSS
import './orders.css'
//COMPONENTES
import Button from '../../button/button.jsx';
import LogoutButton from '../../logoutButton/logoutButton.jsx';
import Modal from '../../modal/modal.jsx';
import Input from '../../input/input.jsx'
import { OrdersLogic } from '../../../utils/orders';
//ASSETS
import Edit from '../../../assets/Images/editar.png'
import Delete from '../../../assets/Images/borrar.png'
import Check from '../../../assets/Images/listo.png'

export default function Orders() {
  // DESESTRUCTURACIÓN DE HOOK PERSONALIZADO
  const {
    getProductsList,
    getTotalOrder,
    handleMenuClick,
    getStatusColor,
    handleCheckClick,
    handleConfirmDeleteClick,
    handleOpenModalDelete,
    handleCloseModal,
    handleOpenEditModal,
    handleEditModalProductQtyChange,
    handleConfirmEditClick,
    getUpdatedTotalOrder,
    handleAddProductToOrder,
    handleEditModalProductDelete,
    modalOpenDelete,
    modalOrderId,
    modalOpenEdit,
    editModalTable,
    setEditModalTable,
    editModalClient,
    setEditModalClient,
    editModalStatus,
    setEditModalStatus,
    productsData,
    editModalProducts,
    handleStatusChange,
    filteredOrdersData,
    selectedStatus,
    errorLabel,
  } = OrdersLogic();

  // RENDERIZADO
  return (
    <>
      <div className='containerOrders'>
        <nav className='navOrders'>
          <Button
            label='MENU'
            onClick={handleMenuClick}
            classButton='buttonMenu' />
          <div className='filterOrders'>
            <h2 className='textFilterOrders'>Filtrar ordenes por estatus :</h2>
            <div className='checkboxesContainer'>
              <label className='optionsFilterOrders'>
                <input
                  type='checkbox'
                  value='Entregado'
                  onChange={handleStatusChange}
                  checked={selectedStatus.includes('Entregado')}
                />
                Entregado
              </label>
              <label className='optionsFilterOrders'>
                <input
                  type='checkbox'
                  value='Listo en barra'
                  onChange={handleStatusChange}
                  checked={selectedStatus.includes('Listo en barra')}
                />
                Listo en barra
              </label>
              <label className='optionsFilterOrders'>
                <input
                  type='checkbox'
                  value='En preparación'
                  onChange={handleStatusChange}
                  checked={selectedStatus.includes('En preparación')}
                />
                En preparación
              </label>
            </div>
          </div>
        </nav>
        <div className='orders'>
          <table className='orders-table'>
            <thead>
              <tr>
                <th className="tableHeader">MESA</th>
                <th className="tableHeader">CLIENTE</th>
                <th className="tableHeader">PEDIDO</th>
                <th className="tableHeader">ESTATUS</th>
                <th className="tableHeader">TOTAL</th>
                <th className="tableHeader">EDITAR</th>
                <th className="tableHeader">ELIMINAR</th>
                <th className="tableHeader">ENTREGADO</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrdersData.map((order) => (
                <tr key={order.id}>
                  <td>
                    #{order.table}
                  </td>
                  <td>
                    {order.client}
                  </td>
                  <td>
                    {getProductsList(order.products)}
                  </td>
                  <td className={getStatusColor(order.status)}>
                    {order.status}
                  </td>
                  <td>
                    ${getTotalOrder(order.products)},00
                  </td>
                  <td className='buttonsTable'>
                    <img
                      src={Edit}
                      className="edit"
                      alt="buttonEdit"
                      onClick={() => handleOpenEditModal(order.id)} />
                  </td>
                  <td className='buttonsTable'>
                    {order.status !== 'Entregado' && (
                      <img
                        src={Delete}
                        className="delete"
                        alt="buttonDelete"
                        onClick={() => handleOpenModalDelete(order.id)}
                      />
                    )}
                  </td>
                  <td className='buttonsTable'>
                    {order.status !== 'Entregado' && (
                      <img
                        src={Check}
                        className="check"
                        alt="buttonCheck"
                        onClick={() => handleCheckClick(order.id)}
                      />
                    )}
                  </td>
                  <td className='modalDelete'>
                    <Modal open={modalOpenDelete && modalOrderId === order.id} onClose={handleCloseModal}>
                      <h2 className='textModal'>Estas seguro que deseas eliminar el pedido de la mesa {order.table} ?</h2>
                      <div>
                        <Button
                          label='CONFIRMAR'
                          onClick={() => handleConfirmDeleteClick(order.id)}
                          classButton='buttonsModal'>
                        </Button>
                        <Button
                          label='CANCELAR'
                          onClick={handleCloseModal}
                          classButton='buttonsModal'>
                        </Button>
                      </div>
                    </Modal>
                    <Modal open={modalOpenEdit && modalOrderId === order.id} onClose={handleCloseModal}>
                      <h2 className='textModal'>Editando pedido de la mesa {order.table}:</h2>
                      <div className='infoOrderModal'>
                        <div className='infoClientModal'>
                          <Input
                            type='number'
                            placeholder='Escribe aquí'
                            label='MESA :'
                            classInputLabel='labelsModalEdit'
                            classInput='inputModalEdit cantidadModal'
                            value={editModalTable}
                            onChange={(event) => setEditModalTable(event.target.value)}
                          />
                          <Input
                            type='text'
                            placeholder='Escribe aquí'
                            label='CLIENTE :'
                            classInputLabel='labelsModalEdit'
                            classInput='inputModalEdit'
                            value={editModalClient}
                            onChange={(event) => setEditModalClient(event.target.value)}
                          />
                        </div>
                        <div className='selectStatusModal'>
                          <label className='bebas'>ESTADO : </label>
                          <select value={editModalStatus} onChange={(event) => setEditModalStatus(event.target.value)} className='boxSelect'>
                            <option value='Entregado'>Entregado</option>
                            <option value='Listo en barra'>Listo en barra</option>
                            <option value='En preparación'>En preparación</option>
                          </select>
                        </div>
                        <div className='selectProductModal'>
                          <label className='bebas'>AÑADIR PRODUCTO :</label>
                          <select
                            value={''}
                            onChange={(e) => handleAddProductToOrder(e.target.value)}
                            className='boxSelect'
                          >
                            <option value='' disabled>Seleccione un producto</option>
                            {productsData.map((product) => {
                              const isProductAlreadyAdded = editModalProducts.some((addedProduct) => addedProduct.productId === product.id);

                              if (!isProductAlreadyAdded) {
                                return (
                                  <option key={product.id} value={product.id}>
                                    {product.name} - ${product.price}
                                  </option>
                                );
                              }

                              return null;
                            })}
                          </select>
                        </div>
                        <label className='bebas'>PEDIDO :</label>
                        <div className='lineModal'></div>
                        <div className='allProductsOrdersModal'>
                          {editModalProducts.map((product) => (
                            <div key={product.productId} className='productOrdersModal'>
                              <img
                                src={Delete}
                                className="deleteModal"
                                alt="buttonDelete"
                                onClick={() => handleEditModalProductDelete(product.productId)}
                              />
                              <Input
                                key={product.productId}
                                type='number'
                                placeholder='Escribe aquí'
                                label={''}
                                name={`productQty_${product.productId}`}
                                classInputLabel='labelsModalEdit'
                                classInput='inputModalEdit cantidadModal'
                                value={product.qty}
                                onChange={(event) => handleEditModalProductQtyChange(product.productId, event)}
                              />
                              <p className='productPriceModal'>
                                <label>{product.name}</label>
                                <label>${product.price},00</label>
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className='lineModal'></div>
                        <div className='totalOrderModal'>
                          <label className='bebas'> TOTAL :</label>
                          <label>${getUpdatedTotalOrder()},00</label>
                        </div>
                        <label className="labelErrorAdmin">{errorLabel}</label>
                      </div>
                      <div>
                        <Button
                          label='CONFIRMAR'
                          classButton='buttonsModal'
                          onClick={handleConfirmEditClick}
                        >
                        </Button>
                        <Button
                          label='CANCELAR'
                          onClick={handleCloseModal}
                          classButton='buttonsModal'>
                        </Button>
                      </div>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <LogoutButton />
      </div>
    </>
  );
}
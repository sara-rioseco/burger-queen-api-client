import { useNavigate } from 'react-router-dom'; // navegar entre 
// CSS
import './products.css';
//COMPONENTES
import Button from '../../button/button.jsx';
import LogoutButton from '../../logoutButton/logoutButton.jsx';
import { ProductsLogic } from '../../../utils/products';
import Modal from '../../modal/modal.jsx';
import Input from '../../input/input.jsx'
//ASSETS
import Edit from '../../../assets/Images/editar.png'
import Delete from '../../../assets/Images/borrar.png'
import Add from '../../../assets/Images/add.png'

export default function Products() {
  const navigate = useNavigate();
  const {
    productsData,
    handleOpenModalDeleteProducts,
    handleConfirmDeleteClickProducts,
    handleConfirmEditClickProducts,
    handleOpenEditModalProducts,
    handleCloseModalProducts,
    handleAddClick,
    setNewProduct,
    handleInputChange,
    handleConfirmAddClick,
    modalProductId,
    modalOpenDeleteProducts,
    modalOpenEditProducts,
    editingProductData,
    addModalOpen,
    newProduct,
  } = ProductsLogic();

  return (
    <>
      <div className='containerProducts'>
        <div className='products-container'>
          <div className='headerContainerProducts'>
            <h2 className='titleProducts'>Productos</h2>
            <Button label='Usuarios' classButton='buttonProducts'
              onClick={() => {
                navigate('/users');
              }} />
            <img
              src={Add}
              className="add"
              alt="buttonAddProducts"
              onClick={handleAddClick}
            />
          </div>
          <div className='products'>
            <table className='products-table'>
              <thead>
                <tr>
                  <th className="tableHeader">PRODUCTO</th>
                  <th className="tableHeader">PRECIO</th>
                  <th className="tableHeader">TIPO</th>
                  <th className="tableHeader buttTable">EDITAR</th>
                  <th className="tableHeader buttTable">ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.type}</td>
                    <td className='buttonsTable'>
                      <img
                        src={Edit}
                        className="edit"
                        alt="buttonEdit"
                        onClick={() => handleOpenEditModalProducts(product.id)}
                      />
                    </td>
                    <td className='buttonsTable'>
                      <img
                        src={Delete}
                        className="delete"
                        alt="buttonDelete"
                        onClick={() => handleOpenModalDeleteProducts(product.id)}
                      />
                    </td>
                    <td className='modalDelete'>
                      <Modal open={modalOpenDeleteProducts && modalProductId === product.id} onClose={handleCloseModalProducts}>
                        <h2 className='textModal'>Estas seguro que deseas eliminar el siguiente producto?</h2>
                        <div className='containerTextDeleteModal'>
                          <label className="textLabelsModalDeleteProducts">Producto:</label><label className='productModalText'>{product.name}</label></div>
                        <div className='containerTextDeleteModal'>
                          <label className="textLabelsModalDeleteProducts">Tipo:</label><label className='productModalText'>{product.type}</label></div>
                        <div>
                          <Button
                            label='CONFIRMAR'
                            onClick={() => handleConfirmDeleteClickProducts(product.id)}
                            classButton='buttonsModal'>
                          </Button>
                          <Button
                            label='CANCELAR'
                            onClick={handleCloseModalProducts}
                            classButton='buttonsModal'>
                          </Button>
                        </div>
                      </Modal>
                      <Modal open={modalOpenEditProducts && modalProductId === product.id} onClose={handleCloseModalProducts}>
                        <h2 className='textModal'>Editando producto  {product.name} :</h2>
                        <div className='infoProductModal'>
                          <Input
                            type='text'
                            placeholder='Escribe aquí'
                            label='PRODUCTO :'
                            classInputLabel='labelsModalEdit'
                            classInput='inputModalEdit'
                            value={editingProductData?.name || ''}
                            onChange={(event) => handleInputChange('name', event.target.value)}
                          />
                          <Input
                            type='number'
                            placeholder='Escribe aquí'
                            label='Precio :'
                            classInputLabel='labelsModalEdit'
                            classInput='inputModalEdit'
                            value={editingProductData?.price || ''}
                            onChange={(event) => handleInputChange('price', event.target.value)}
                          />
                          <div className='selectRolModal'>
                            <label className='bebas'>TIPO : </label>
                            <select
                              className='boxSelect'
                              value={editingProductData?.type}
                              onChange={(event) => handleInputChange('type', event.target.value)}
                            >
                              <option value='Desayuno'>Desayuno</option>
                              <option value='Almuerzo'>Almuerzo</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <Button
                            label='CONFIRMAR'
                            classButton='buttonsModal'
                            onClick={handleConfirmEditClickProducts}
                          >
                          </Button>
                          <Button
                            label='CANCELAR'
                            onClick={handleCloseModalProducts}
                            classButton='buttonsModal'
                          >
                          </Button>
                        </div>
                      </Modal>
                      {addModalOpen && (
                        <Modal open={addModalOpen} onClose={handleCloseModalProducts}>
                          <h2 className='textModal'>Agregar Producto :</h2>
                          <div className='infoProductModal'>
                            <Input
                              type='text'
                              placeholder='Escribe aquí'
                              label='PRODUCTO :'
                              classInputLabel='labelsModalEdit'
                              classInput='inputModalEdit'
                              value={newProduct.name}
                              onChange={(event) => setNewProduct({ ...newProduct, name: event.target.value })}
                            />
                            <Input
                              type='number'
                              placeholder='Escribe aquí'
                              label='PRECIO :'
                              classInputLabel='labelsModalEdit'
                              classInput='inputModalEdit'
                              value={newProduct.price}
                              onChange={(event) => setNewProduct({ ...newProduct, price: event.target.value })}
                            />
                            <div className='selectRolModal'>
                              <label className='bebas'>TIPO :</label>
                              <select
                                className='boxSelect'
                                value={newProduct.type}
                                onChange={(event) => setNewProduct({ ...newProduct, type: event.target.value })}
                              >
                                <option value='' disabled>Seleccione un tipo</option>
                                <option value='Desayuno'>Desayuno</option>
                                <option value='Almuerzo'>Almuerzo</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <Button
                              label='CONFIRMAR'
                              classButton='buttonsModal'
                              onClick={handleConfirmAddClick}
                            />
                            <Button
                              label='CANCELAR'
                              onClick={handleCloseModalProducts}
                              classButton='buttonsModal'
                            />
                          </div>
                        </Modal>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <LogoutButton />
      </div>
    </>
  );
}
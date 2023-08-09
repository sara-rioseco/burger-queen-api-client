// CSS
import './users.css';
//COMPONENTES
import Button from '../../button/button.jsx';
import LogoutButton from '../../logoutButton/logoutButton.jsx';
import { UsersLogic } from '../../../utils/users';
import Modal from '../../modal/modal.jsx';
//ASSETS
import Edit from '../../../assets/Images/editar.png'
import Delete from '../../../assets/Images/borrar.png'
import Add from '../../../assets/Images/add.png'

export default function Users() {
  const {
    usersData,
    getRoleLabel,
    handleOpenModalDelete,
    handleConfirmDeleteClick,
    handleCloseModal,
    modalUserId,
    modalOpenDelete
  } = UsersLogic();

  return (
    <>
      <div className='containerUsers'>
        <div className='users-container'>
          <div className='headerContainerUsers'>
            <h2 className='titleUsers'>Usuarios</h2>
            <img
              src={Add}
              className="add"
              alt="buttonAddUsers" />
          </div>
          <div className='users'>
            <table className='users-table'>
              <thead>
                <tr>
                  <th className="tableHeader">ID</th>
                  <th className="tableHeader">CORREO</th>
                  <th className="tableHeader">ROL</th>
                  <th className="tableHeader buttTable">EDITAR</th>
                  <th className="tableHeader buttTable">ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{getRoleLabel(user.role)}</td>
                    <td className='buttonsTable'>
                      <img
                        src={Edit}
                        className="edit"
                        alt="buttonEdit" />
                    </td>
                    <td className='buttonsTable'>
                      <img
                        src={Delete}
                        className="delete"
                        alt="buttonDelete"
                        onClick={() => handleOpenModalDelete(user.id)}
                      />
                    </td>
                    <td className='modalDelete'>
                      <Modal open={modalOpenDelete && modalUserId === user.id} onClose={handleCloseModal}>
                        <h2 className='textModal'>Estas seguro que deseas eliminar al siguiente usuario?</h2>
                        <div className='containerTextDeleteModal'>
                        <label className="textLabelsModalDeleteUsers">Puesto:</label><label className='userModalText'>{getRoleLabel(user.role)}</label></div>
                        <div className='containerTextDeleteModal'>
                        <label className="textLabelsModalDeleteUsers">Correo:</label><label className='userModalText'>{user.email}</label></div>
                        <div>
                          <Button
                            label='CONFIRMAR'
                            onClick={() => handleConfirmDeleteClick(user.id)}
                            classButton='buttonsModal'>
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
        </div>
        <LogoutButton />
      </div>
    </>
  );
}
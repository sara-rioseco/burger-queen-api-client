// CSS
import './users.css';
//COMPONENTES
import LogoutButton from '../../logoutButton/logoutButton.jsx';
import { UsersLogic } from '../../../utils/users';
//ASSETS
import Edit from '../../../assets/Images/editar.png'
import Delete from '../../../assets/Images/borrar.png'
import Add from '../../../assets/Images/add.png'

export default function Users() {
  const {
    usersData,
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
                  <th>ID</th>
                  <th>EMAIL</th>
                  <th>ROL</th>
                  <th className="tableHeader">EDITAR</th>
                  <th className="tableHeader">ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
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
                        alt="buttonDelete" />
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
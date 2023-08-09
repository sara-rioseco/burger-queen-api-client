import Button from '../../button/button.jsx';
import './users.css';
import { UsersLogic } from '../../../utils/users';

export default function Users() {
  const {
    usersData,
    // Otros datos y funciones que necesitas de UsersLogic
  } = UsersLogic();

  return (
    <div className='users-container'>
      <h2>Usuarios</h2>
      <table className='users-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button label='Agregar Usuario'/>
    </div>
  );
}
// CSS
import './login.css'
//COMPONENTES
import Input from '../../input/input.jsx'
import Button from '../../button/button.jsx'
import { LoginLogic } from '../../../utils/login';
//ASSETS
import gif from '../../../assets/Images/hamb.gif'
import hide from '../../../assets/Images/hide.png'
import show from '../../../assets/Images/show.png'


export default function Login() {
  // DESESTRUCTURACIÓN DE HOOK PERSONALIZADO
  const {
    formData,
    handleFieldChange,
    errorLabel,
    togglePasswordVisibility,
    getPasswordInputType,
    handleLoginClick,
  } = LoginLogic();

  // RENDERIZADO
  return (
    <>
      <div className='login'>
        <div className='form'>
          <h2 className='title'>INICIAR SESIÓN</h2>
          <div className='line'></div>
          <Input
            type='text'
            placeholder='Escribe aquí'
            value={formData.name}
            onChange={(e) => handleFieldChange('name', e)}
            label='NOMBRE:'
            classInputLabel='labels'
            classInput='inputs'
          />
          <div className='password'>
            <Input
              type={getPasswordInputType()}
              placeholder='*************'
              value={formData.password}
              onChange={(e) => handleFieldChange('password', e)}
              label='CONTRASEÑA:'
              classInputLabel='labels'
              classInput='inputs passwd'
              classContainer='containerInput'
            />
            <img
              alt='toggle-password-button'
              src={formData.showPassword ? hide : show}
              className="togglePassword"
              onClick={togglePasswordVisibility}
            />
          </div>
          <label className='labelErrorLogin'>{errorLabel}</label>
          <Button label="ENTRAR" onClick={handleLoginClick} classButton='buttonEnter' />
        </div>
        <img src={gif} className="gif" alt="gif" />
      </div>
    </>
  )
}
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function Login() {
  const { email, password, handleEmail, handlePassword } = useContext(Context);
  const emailValid = /\S+@\S+\.\S+/.test(email);
  const minimumPassword = 7;
  const history = useHistory();

  const saveUser = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <form>
      <label htmlFor="email">
        Email
        <input
          type="text"
          name="email"
          data-testid="email-input"
          placeholder="Email"
          value={ email }
          onChange={ handleEmail }
        />
      </label>
      <label htmlFor="password">
        Senha
        <input
          type="password"
          name="senha"
          data-testid="password-input"
          placeholder="Senha"
          value={ password }
          onChange={ handlePassword }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        onClick={ saveUser }
        disabled={ !(password.length >= minimumPassword && emailValid) }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;

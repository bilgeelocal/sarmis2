import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Login.module.css'; // Importing the styles

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '$4rmis467') {
      sessionStorage.setItem('auth', 'true');
      router.push('/');
    } else {
      setLoginError('Invalid credentials');
      sessionStorage.removeItem('auth');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
          className={styles.loginInput}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.loginInput}
        />
        <button type="submit" className={styles.loginButton}>Login</button>
        {loginError && <p className={styles.errorMessage}>{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;

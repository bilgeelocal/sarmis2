import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation (In real scenario, replace this with proper authentication logic)
    if (username === 'admin' && password === '$4rmis467') {
      sessionStorage.setItem('auth', 'true'); // Setting session storage item
      router.push('/'); // Navigate to the home page
    } else {
      setLoginError('Invalid credentials');
      sessionStorage.removeItem('auth'); // Ensure auth session is cleared
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  );
};

export default Login;

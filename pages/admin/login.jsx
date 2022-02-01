import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';


export const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  /* recuerda que el router de Next es un hook */
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/login', { username, password });
      
      if (response.data.ok) {
        setError(false);
      }

      router.push('/admin');
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  return <div className={styles.container}>
    <div className={styles.wrapper}>
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        className={styles.input}
        placeholder='username'
        onChange={(e) => setUsername(e.target.value)} />
      <input
        type="password"
        className={styles.input}
        placeholder='password'
        onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleLogin} className={styles.button}>Sign In</button>
      {error && <p className={styles.error}>Invalid username or password</p>}

    </div>
  </div>;
};

export default Login;

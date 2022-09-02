import { useState } from 'react';
import jwt, { verify } from 'jsonwebtoken';
import { Router, useRouter } from 'next/router';
import styles from '../styles/Login.module.css'
import { setTokenCookie } from '../src/auth/tokenCookies';

export default function Home() {

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    console.log(email, password);
    e.preventDefault();

    try {
      const res = await fetch(`https://task-manager-aryankush25.herokuapp.com/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }).then((t) => t.json());
      console.log(res);
      const token = res.token;
      console.log(token);

      if (token) {
        setTokenCookie(token);
        await router.replace('/home');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.Login}>
      <h1>Login</h1>
      <div>
        <input type="email" className={styles.inputField}
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        <input type="password" className={styles.inputField}
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <button type='submit' onClick={handleLogin}>Login</button>
    </div>
  )
}
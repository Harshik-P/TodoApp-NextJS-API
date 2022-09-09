import { useEffect, useState } from 'react';
import jwt, { verify } from 'jsonwebtoken';
import { Router, useRouter } from 'next/router';
import styles from '../styles/Login.module.css'
import { setTokenCookie } from '../src/auth/tokenCookies';
import { getUserAction } from '../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJWT } from './api/user';
import { wrapper } from '../store/store.js';


export default function Home() {

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDet.user);


  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(getUserAction({ email, password }));
    router.replace('/home');
    console.log(user);
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
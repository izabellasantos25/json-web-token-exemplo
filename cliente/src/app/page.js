'use client'
import { useState } from "react";
import handlerAcessUser from "./functions/handlerAcess"
import { useRouter } from "next/navigation";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.css';


export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { push, refresh } = useRouter();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const userAuth = await handlerAcessUser(user);
      if(userAuth.token === undefined){
        toast.error("Erro no e-mail ou senha!");
      }
      push('/pages/dashboard');
    } catch {
      toast.error("Erro na aplicação");
    }
  }
  return (
    <div className={styles.body}>
    <div className={styles.loginbox}>
  <h2>Login</h2>
  <form className={styles.form} onSubmit={handlerLogin}>
    <div className={styles.userbox}>
      <input type="email" onChange={(e) => { setUser({ ...user, email: e.target.value }) }}/>
      <label>Username</label>
    </div>
    <div className={styles.userbox}>
      <input type="password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }}/>
      <label >Password</label>
    </div>
    <button>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </button>
  </form>
  <ToastContainer/>
</div>
</div>
  )
}

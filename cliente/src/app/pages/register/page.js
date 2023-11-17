'use client'
import { Suspense, useState } from "react";
import styles from "../pages.module.css";
import {ToastContainer, toast} from "react-toastify";
import { postUser } from "@/app/functions/handlerAcessAPI";
import handlerAcessUser from "@/app/functions/handlerAcess";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';


export default async function Register() {
     const [user, setUser] = useState({
      nome: '',
      email: '',
      password: '',
     });
     const { push } = useRouter();

     const handlerFormSubmit = async (event) => {
      event.preventDefault();
      try{
        await postUser(user);
        return push("/pages/dashboard");
      } catch {
        return toast.error("Erro");
      }
     };


    return (
        <div className={styles.body}>
            <Suspense fallback={<span className={styles.carregando}>Carregando...</span>}></Suspense>

    <div className={styles.loginbox}>
  <h2>Cadastro</h2>
  <form className={styles.form} onSubmit={handlerAcessUser}>
    <div className={styles.userbox}>
      <input type="text" id="name"  onChange={(e) => { setUser({ ...user, name: e.target.value });}} 
      required/>
      <label>Username</label>
    </div>
    <div className={styles.userbox}>
      <input type="email" id="email" onChange={(e) => { setUser({ ...user, email: e.target.value });}} 
      required/>
      <label>Email</label>
    </div>
    <div className={styles.userbox}>
      <input type="password" id="password" onChange={(e) => { setUser({ ...user, password: e.target.value });}} 
      required/>
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

    );
};
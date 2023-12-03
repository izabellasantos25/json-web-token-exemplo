'use client'
import { Suspense, useState } from "react";
import styles from "../pages.module.css";
import {ToastContainer, toast} from "react-toastify";
import { postUser } from "@/app/functions/handlerAcessAPI";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import Pag from "@/app/componentes/Pag";


export default function Register() {
     const [user, setUser] = useState({
      nome: '',
      senha: '',
      senha2: '',
     });
     const { push } = useRouter();

     const handlerFormSubmit = (e) => {
      e.preventDefault();
      try{
        postUser(user);
        return push("/pages/dashboard");
      } catch {
        return toast.error("Erro");
      }
     };


    return (
        <div className={styles.body}>
        <Pag/>
    <div className={styles.loginbox}>
  <h2>Cadastro</h2>
  <form className={styles.form} onSubmit={handlerFormSubmit}>
    <div className={styles.userbox}>
      <input type="text" id="name" name="nome"  onChange={(e) => { setUser({ ...user, nome: e.target.value });}} 
      required/>
      <label>Username</label>
    </div>
    <div className={styles.userbox}>
      <input type="password" id="password" name="senha" onChange={(e) => { setUser({ ...user, senha: e.target.value });}} 
      required/>
      <label >senha</label>
    </div>
    <div className={styles.userbox}>
      <input type="password" id="password2" name="senha2" onChange={(e) => { setUser({ ...user, senha2: e.target.value });}} 
      required/>
      <label >senha 2</label>
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
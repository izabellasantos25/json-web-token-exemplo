'use client'
import { Suspense } from "react";
import styles from "../pages.module.css";
import {ToastContainer, toast} from "react-toastify";

export default async function Alter() {

    const handlerLogin = async (e) => {
        e.preventDefault();
        toast.success("Usuário alterado com sucesso!");
      }    

    return (
        <div>
            <Suspense fallback={<span className={styles.carregando}>Carregando...</span>}></Suspense>

            <div className={styles.body}>
    <div className={styles.loginbox}>
  <h2>Alterar Usuário</h2>
  <form className={styles.form} onSubmit={handlerLogin}>
    <div className={styles.userbox}>
      <input type="text"/>
      <label>Username</label>
    </div>
    <div className={styles.userbox}>
      <input type="email"/>
      <label>Email</label>
    </div>
    <div className={styles.userbox}>
      <input type="password"/>
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
</div>

    );
};
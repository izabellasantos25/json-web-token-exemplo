
import { getUsers } from "@/app/functions/handlerAcessAPI";
import { Suspense } from "react";
import ListUsers from "@/app/componentes/ListUsers";
import styles from '../pages.module.css';

export default async function Dashboard() {
   const users = await getUsers();
    return (
        <div>
            <Suspense fallback={<span className={styles.carregando}>Carregando...</span>}>
        <div className={styles.body}>
            <div className={styles.card}>
                <h1><ListUsers users={users}/></h1>
            </div>
        </div>
            </Suspense>
        </div>
    );
};
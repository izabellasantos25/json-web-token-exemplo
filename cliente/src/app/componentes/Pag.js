import './Pag.css'

export default function Pag() {
    return(
        <div class="wrapper">
    <div class="sidebar">
        <ul>
        <li><a href="/pages/dashboard"><i class="fas fa-address-book"></i>Usuarios</a></li>
            <li><a href="/pages/register"><i class="fas fa-user"></i>Cadastrar</a></li>
        </ul> 
    </div>
        </div>
    );
}
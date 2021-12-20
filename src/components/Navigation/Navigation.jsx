import { NavLink } from "react-router-dom";
import s from '../Navigation/Navigation.module.css';

const Navigation = () => {
    return (
        <ul className={s.navList}>
            <li className={s.navListItem}>
                <NavLink activeClassName={s.navLink} exact to="/">Home</NavLink>
            </li>
            <li className={s.navListItem}>
                <NavLink activeClassName={s.navLink} to='/movies'>Movies</NavLink>
            </li>
        </ul>
    )
}

export default Navigation;
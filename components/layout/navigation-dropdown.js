import {useContext} from 'react';
import Link from 'next/link';
import Switch from '../ui/switch';
import ModeContext from '../../store/mode-context';
import Sun from '../icons/sun';
import Moon from '../icons/moon';
import styles from './navigation-dropdown.module.css';
import useSession from "../../hooks/useSession";
import Button from "../ui/button";

export default function NavigationDropdown() {
    const modeContext = useContext(ModeContext);
    const toggleModeHandler = () => (modeContext.toggleMode());
    const { loading, session, logout } = useSession();
    return (
      <nav className={styles.nav}>
        <ul>
            <li>
                <Link href='/'>Home</Link>
            </li>
            <li>
                <Link href='/poems'>Poems</Link>
            </li>
            <li>
                <Link href='/blogs'>Blogs</Link>
            </li>
            <li>
                <Link href='/contact'>Contact</Link>
            </li>
            {
               (!loading && session) ?
                (
                    <>
                        <li>
                            <Link href="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <a onClick={() => logout()}>Logout</a>
                        </li>
                    </>
                ) :
                (
                    <li>
                       <Button href="/login">
                           Login
                       </Button>
                    </li>
                )
            }
            <li className={styles.switch}>
                <Switch checked={(modeContext.mode === 'dark')} onChange={toggleModeHandler} />
                <div className={styles.icon}>
                    {
                        (modeContext.mode === 'light')
                            ?
                            <Sun color='var(--text-color)' width={25} height={25} />
                            :
                            <Moon color='var(--text-color)' width={25} height={25} />
                    }
                </div>
            </li>
        </ul>
      </nav>
    );
}

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
    const mode = modeContext.mode;
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
            <li>
                <Button
                    title={session ? 'Logout' : 'Login'}
                    href={!session ? '/login' : null}
                    onClick={() => session ? logout() : null}
                />
            </li>
            <li className={styles.switch}>
                <Switch checked={(modeContext.mode === 'dark')} onChange={toggleModeHandler} />
                <Button
                    height={35}
                    width={35}
                    shape="icon"
                    Icon={mode === 'light' ? Moon : Sun}
                    IconProps={{
                        color: 'var(--text-color)',
                        size: mode === 'light' ? 22 : 28
                    }}
                    border={false}
                />
            </li>
        </ul>
      </nav>
    );
}

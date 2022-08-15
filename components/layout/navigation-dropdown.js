import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import Switch from '../ui/switch';
import ModeContext from '../../store/mode-context';
import Sun from '../icons/sun';
import Moon from '../icons/moon';
import { useSession, signOut } from 'next-auth/client';
import Button from '../ui/button';
import styles from './navigation-dropdown.module.css';

export default function NavigationDropdown() {
    const modeContext = useContext(ModeContext);
    const toggleModeHandler = () => (modeContext.toggleMode());
    const [session, _] = useSession();
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
                session &&
                (
                    <li>
                        <a onClick={() => signOut()}>Logout</a>
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
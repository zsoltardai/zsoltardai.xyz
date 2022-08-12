import { useContext } from 'react';
import Link from 'next/link';
import Logo from './logo';
import Button from '../ui/button';
import Moon from '../icons/moon';
import Sun from '../icons/sun';
import ModeContext from '../../store/mode-context';
import styles from './navigation.module.css'

export default function Navigation() {
    const modeContext = useContext(ModeContext);
    const toggleModeHandler = () => (modeContext.toggleMode());
    return (
        <header className={styles.header}>
            <Link href='/'>
                <a>
                    <Logo />
                </a>
            </Link>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link href='/'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href='/poems'>
                            Poems
                        </Link>
                    </li>
                    <li>
                        <Link href='/blogs'>
                            Blogs
                        </Link>
                    </li>
                    <li>
                        <Button height='35px' width='35px' circle onClick={toggleModeHandler}>
                            {
                                (modeContext.mode === 'light')
                                    ?
                                <Sun color='var(--text-color)' width={25} height={25} />
                                    :
                                <Moon color='var(--text-color)' width={20} height={20} />
                            }
                        </Button>
                    </li>
                    <li>
                        <Button height='10px' width='180px' href='/contact'>
                            Contact me
                        </Button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
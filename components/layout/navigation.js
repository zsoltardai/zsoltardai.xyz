import {useContext} from 'react';
import Link from 'next/link';
import Logo from './logo';
import Button from '../ui/button';
import Moon from '../icons/moon';
import Sun from '../icons/sun';
import ModeContext from '../../store/mode-context';
import styles from './navigation.module.css'
import useSession from "../../hooks/useSession";

export default function Navigation() {
  const modeContext = useContext(ModeContext);
  const toggleModeHandler = () => (modeContext.toggleMode());
  const { session, logout } = useSession();
  const mode = modeContext.mode;
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
              <Link href='/contact'>Contact</Link>
            </li>
            <li>
              <Button
                height={35}
                width={35}
                shape="icon"
                Icon={mode === 'light' ? Moon : Sun}
                IconProps={{
                  color: 'var(--text-color)',
                  size: mode === 'light' ? 18 : 22
                }}
                onClick={toggleModeHandler}
                border={false}
              />
            </li>
            <li>
              <Button
                title={session ? 'Logout' : 'Login'}
                href={!session ? '/login' : null}
                onClick={() => session ? logout() : null}
                width={150}
              />
            </li>
          </ul>
        </nav>
      </header>
  );
}

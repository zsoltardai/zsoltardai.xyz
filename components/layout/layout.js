import { useContext } from 'react';
import Navigation from './navigation';
import MobileNavigation from './mobile-navigation';
import ModeContext from '../../store/mode-context';
import styles from './layout.module.css';

export default function Layout({ children }) {
    const modeContext = useContext(ModeContext);
    return (
        <div className={modeContext.mode}>
            <Navigation />
            <MobileNavigation />
            <main className={styles.main}>{children}</main>
        </div>
    );
}
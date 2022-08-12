import { useState, useContext, useEffect } from 'react';
import Button from '../ui/button';
import Logo from './logo';
import Menu from '../icons/menu';
import Times from '../icons/times';
import NavigationDropdown from './navigation-dropdown';
import ModeContext from '../../store/mode-context';
import { useRouter } from 'next/router';
import styles from './mobile-navigation.module.css';

export default function MobileNavigation() {
    const modeContext = useContext(ModeContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdownHandler = () => (setIsDropdownOpen(previous => !previous));
    const path = useRouter().asPath;
    useEffect(() => setIsDropdownOpen(false), [path]);
    return (
        <header className={styles.header}>
            <div className={styles.bar}>
                <Logo />
                <Button circle onClick={toggleDropdownHandler}>
                    {
                        isDropdownOpen
                            ?
                        <Times width={30} height={30} color={(modeContext.mode === 'dark') ? '#FFFFFF' : '#000000'} />
                            :
                        <Menu width={30} height={30} color={(modeContext.mode === 'dark') ? '#FFFFFF' : '#000000'} />
                    }
                </Button>
            </div>
            {
                isDropdownOpen &&
                <NavigationDropdown />
            }
        </header>
    );
}

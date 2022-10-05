import { useState, useEffect } from 'react';
import Button from '../ui/button';
import Logo from './logo';
import Menu from '../icons/menu';
import Times from '../icons/times';
import NavigationDropdown from './navigation-dropdown';
import { useRouter } from 'next/router';
import styles from './mobile-navigation.module.css';

export default function MobileNavigation() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdownHandler = () => setIsDropdownOpen(previous => !previous);
    const path = useRouter().asPath;
    useEffect(() => setIsDropdownOpen(false), [path]);
    return (
        <header className={styles.header}>
            <div className={styles.bar}>
                <Logo />
                <Button
                    Icon={isDropdownOpen ? Times : Menu}
                    IconProps={{
                        color: 'var(--text-color)',
                        size: isDropdownOpen ? 32 : 24
                    }}
                    onClick={toggleDropdownHandler}
                    border={false}
                    shape="icon"
                    width={30}
                />
            </div>
            {
                isDropdownOpen &&
                <NavigationDropdown />
            }
        </header>
    );
}

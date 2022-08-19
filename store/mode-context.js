import { createContext, useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';

const ModeContext = createContext({ mode: 'light', toggleMode: () => {} });

export function ModeContextProvider({ children }) {
    const hour = new Date().getHours();
    const [mode, setMode] = useState((hour > 17 || hour < 6) ? 'dark' : 'light');

    useEffect(() => {
        if (getCookie('mode') !== undefined) {
            const _mode = getCookie('mode');
            setMode(_ => { return _mode });
        }
    }, []);

    const toggleModeHandler = () => {
        const _mode = (mode === 'light') ? 'dark' : 'light'
        setMode(_mode);
        setCookie('mode', _mode);
    };

    const context = { mode: mode, toggleMode: toggleModeHandler };

    return (
      <ModeContext.Provider value={context}>
          {children}
      </ModeContext.Provider>
    );
}

export default ModeContext;

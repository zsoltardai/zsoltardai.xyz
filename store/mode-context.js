import { createContext, useState } from 'react';

const ModeContext = createContext({ mode: 'light', toggleMode: () => {} });

export function ModeContextProvider({ children }) {
    const hour = new Date().getHours();

    const [mode, setMode] = useState((hour > 17 || hour < 6) ? 'dark' : 'light');

    const toggleModeHandler = () => setMode((mode === 'light') ? 'dark' : 'light');

    const context = { mode: mode, toggleMode: toggleModeHandler };

    return (
      <ModeContext.Provider value={context}>
          {children}
      </ModeContext.Provider>
    );
}

export default ModeContext;

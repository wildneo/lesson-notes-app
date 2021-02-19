import { createContext, useContext, Context } from 'react';

import { Nullable } from '../typings';

export interface ThemeContextProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export const ThemeContext = createContext<Nullable<ThemeContextProps>>(null);

export default () => useContext(ThemeContext as Context<ThemeContextProps>);

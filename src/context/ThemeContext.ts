import {createContext} from 'react';

export const themes = {
    agdq2019: 'agdq2019',
    sgdq2018: 'sgdq2018',
};

export function isThemeValid(theme: string): boolean {
    return themes.hasOwnProperty(theme);
}

export const ThemeContext = createContext({
    theme: themes.agdq2019,
    changeTheme: (_: string) => {},
});

import {createContext} from 'react';

interface Theme {
    key: string;
    display: string;
}

export const themes: Theme[] = [
    {
        key: 'agdq2019',
        display: 'Awesome Games Done Quick 2019',
    },
    {
        key: 'sgdq2018',
        display: 'Summer Games Done Quick 2018',
    }
];

export const defaultTheme = findTheme('agdq2019').key;

export function isThemeValid(themeKey: string): boolean {
    return findTheme(themeKey) !== undefined;
}

export function findTheme(key: string): Theme {
    const theme = themes.find(theme => theme.key === key);

    if (theme) {
        return theme;
    }

    throw new Error(`Theme with key ${key} does not exist`);
}

export const ThemeContext = createContext({
    theme: defaultTheme,
    changeTheme: (_: string) => {},
});

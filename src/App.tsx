import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

import {ThemeContext, themes, isThemeValid} from './context/ThemeContext';
import {ClockWithControls} from './clock/ClockWithControls';

import styles from './App.module.css';

export class App extends Component {
    state = {
        theme: themes.agdq2019,
    }

    changeTheme = (theme: string) => {
        if (isThemeValid(theme)) {
            this.setState({
                theme,
            });
        }
    }

    render = () => <div className={styles.app}>
        <div className={styles.clockContainer}>
            <div className={styles.innerClockContainer}>
                <ThemeContext.Provider value={{ theme: this.state.theme, changeTheme: this.changeTheme }}>
                    <ClockWithControls />
                </ThemeContext.Provider>
            </div>
        </div>

        <footer className={styles.footer}>
            <a href="https://github.com/RVxLab/GDQTimer" target="_blank" rel="noopener,noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
        </footer>
    </div>
    }

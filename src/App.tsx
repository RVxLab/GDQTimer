import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

import {ClockWithControls} from './clock/ClockWithControls';

import styles from './App.module.css';

export const App = () => <div className={styles.app}>
    <div className={styles.clockContainer}>
        <div className={styles.innerClockContainer}>
            <ClockWithControls />
        </div>
    </div>

    <footer className={styles.footer}>
        <a href="https://github.com/RVxLab/GDQTimer" target="_blank" rel="noopener,noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
    </footer>
</div>;

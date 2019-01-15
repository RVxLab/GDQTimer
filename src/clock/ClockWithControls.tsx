import React, {Component, Fragment} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlayCircle, faPauseCircle, faStopCircle} from '@fortawesome/free-regular-svg-icons';

import {Clock} from './Clock';

import {ThemeContext, themes} from './../context/ThemeContext';

import styles from './ClockWithControls.module.css';

interface State {
    started: boolean;
    paused: boolean;
}

export class ClockWithControls extends Component<any, State> {
    public state = {
        paused: false,
        started: false,
    };

    private start = (): void => {
        this.setState({
            started: true,
        });
    }

    private stop = (): void => {
        this.setState({
            paused: false,
            started: false,
        });
    }

    private pause = (): void => {
        this.setState({
            paused: true,
        });
    }

    private resume = (): void => {
        this.setState({
            paused: false,
        });
    }

    private getStartPauseButtonIcon = (): JSX.Element => {
        if (this.state.started && !this.state.paused) {
            return <FontAwesomeIcon icon={faPauseCircle} size="3x" />;
        }

        return <FontAwesomeIcon icon={faPlayCircle} size="3x" />;
    }

    private getStartPauseButtonOnClickFunc = (): () => void => {
        if (this.state.paused) {
            return this.resume;
        } else if (this.state.started) {
            return this.pause;
        }

        return this.start;
    }

    private renderButtons = (): JSX.Element => {
        const startPauseButton = <div className={styles.iconButton} onClick={this.getStartPauseButtonOnClickFunc()}>
            {this.getStartPauseButtonIcon()}
        </div>

        const stopButton = <div className={styles.iconButton} onClick={this.stop}>
            <FontAwesomeIcon icon={faStopCircle} size="3x" />
        </div>;

        return <div>
            {startPauseButton}
            {this.state.started && stopButton}
        </div>
    };

    public render = () => <ThemeContext.Consumer>
        {({ changeTheme, theme }) => <Fragment>
            <Clock started={this.state.started} paused={this.state.paused} />

            <div className={styles.controls}>
                {this.renderButtons()}

                <select className={styles.themeSelector} onChange={e => changeTheme(e.target.value)}>
                    {themes.map(t => <option key={t.key} value={t.key} selected={theme === t.key}>{t.display}</option>)}
                </select>
            </div>
        </Fragment>}
    </ThemeContext.Consumer>;
}

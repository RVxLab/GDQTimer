import React from 'react';
import { Column } from './Column';

import styles from './Clock.module.css';

interface Props {
    paused?: boolean;
    started?: boolean;
}

interface State {
    difference: number;
    pastDifference: number;
    startDate: Date;
}

interface TimeDifference {
    hours: number;
    milliseconds: number;
    minutes: number;
    seconds: number;
}

export class Clock extends React.Component<Props, State> {
    public static defaultProps = {
        paused: false,
        started: false,
    };

    public state: State = {
        difference: 0,
        pastDifference: 0,
        startDate: new Date(),
    }

    private differenceUpdateInterval: any = null;

    public componentDidMount() {
        if (this.props.started) {
            this.prepareAndStart();
        }
    }

    public componentWillUnmount() {
        this.stopTimer();
    }

    public componentDidUpdate(prevProps: Props) {
        if (prevProps.started && !this.props.started) {
            this.stopTimer();
        } else if (!prevProps.started && this.props.started) {
            this.resetTimer();
            this.prepareAndStart();
        } else if (prevProps.paused && !this.props.paused) {
            this.prepareAndStart();
        } else if (!prevProps.paused && this.props.paused) {
            this.pauseTimer();
        }
    }

    private prepareAndStart = (): void => {
        this.setState({
            startDate: new Date(),
        }, () => {
            this.startTimer();
        });
    }

    private startTimer = (): void => {
        this.differenceUpdateInterval = setInterval(() => {
            const difference = this.getDifference();

            this.setState({
                difference,
            });
        }, 100);
    }

    private stopTimer = (): void => {
        clearInterval(this.differenceUpdateInterval);
    }

    private pauseTimer = (): void => {
        this.stopTimer();

        const {pastDifference, difference} = this.state;

        this.setState({
            difference: 0,
            pastDifference: difference + pastDifference,
        });
    }

    private resetTimer = (): void => {
        this.setState({
            pastDifference: 0,
            difference: 0
        });
    }

    private getDifference = (): number => {
        const now = Date.now();
        return now - this.state.startDate.getTime();
    }

    private calculateTimeDifference = (milliseconds: number): TimeDifference => {
        const hours = Math.floor(milliseconds / 1000 / 60 / 60);
        milliseconds -= hours * 1000 * 60 * 60;

        const minutes = Math.floor(milliseconds / 1000 / 60);
        milliseconds -= minutes * 1000 * 60;

        const seconds = Math.floor(milliseconds / 1000);
        milliseconds -= seconds * 1000;

        return {
            hours,
            milliseconds: Math.floor(milliseconds / 100),
            minutes,
            seconds,
        }
    }

    private getActualTimeDifference = (): TimeDifference => {
        const {pastDifference, difference} = this.state;

        return this.calculateTimeDifference(pastDifference + difference);
    }

    public render = () => {
        const difference = this.getActualTimeDifference();

        const minutesDisplay = difference.minutes.toString().padStart(2, '0');
        const secondsDisplay = difference.seconds.toString().padStart(2, '0');

        const displayTextParts = [ `${minutesDisplay}:${secondsDisplay}.${difference.milliseconds}` ];

        if (difference.hours > 0) {
            displayTextParts.unshift(difference.hours.toString());
        }

        // Only check for 1st 4 bits to be on
        const minutesPart1 = difference.minutes & 15;

        // Only check for the 2nd 4 bits to be on
        const minutesPart2 = (difference.minutes >> 4) & 15;

        const secondsPart1 = difference.seconds & 15;
        const secondsPart2 = (difference.seconds >> 4) & 15;

        return <div className={styles.clock}>
            <p className={styles.clockText}>
                {displayTextParts.join(':')}
            </p>

            <Column timeSection={difference.hours} />
            <Column timeSection={minutesPart2} />
            <Column timeSection={minutesPart1} />
            <Column timeSection={secondsPart2} />
            <Column timeSection={secondsPart1} />
            <Column timeSection={difference.milliseconds} />
        </div>;
    };
}

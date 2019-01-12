import React from 'react';
import { Column } from './Column';

import styles from './Clock.module.css';

interface Props {
    startDate: Date;
}

interface State {
    difference: TimeDifference;
}

interface TimeDifference {
    hours: number;
    milliseconds: number;
    minutes: number;
    seconds: number;
}

export class Clock extends React.Component<Props, State> {
    public state: State = {
        difference: {
            hours: 0,
            milliseconds: 0,
            minutes: 0,
            seconds: 0,
        },
    }

    private differenceUpdateInterval: any = null;

    public componentDidMount() {
        clearInterval(this.differenceUpdateInterval);
        this.differenceUpdateInterval = setInterval(() => {
            const difference = this.getDifference();

            this.setState({
                difference,
            });
        }, 100);
    }

    public componentWillUnmount() {
        clearInterval(this.differenceUpdateInterval);
    }

    private getDifference(): TimeDifference {
        const now = Date.now();

        let diff = now - this.props.startDate.getTime();

        const hours = Math.floor(diff / 1000 / 60 / 60);
        diff -= hours * 1000 * 60 * 60;

        const minutes = Math.floor(diff / 1000 / 60);
        diff -= minutes * 1000 * 60;

        const seconds = Math.floor(diff / 1000);
        diff -= seconds * 1000;

        return {
            hours,
            milliseconds: Math.floor(diff / 100),
            minutes,
            seconds,
        }
    }

    public render = () => {
        const {difference} = this.state;

        const minutesDisplay = difference.minutes.toString().padStart(2, '0');
        const secondsDisplay = difference.seconds.toString().padStart(2, '0');
        const displayText = `${difference.hours}:${minutesDisplay}:${secondsDisplay}.${difference.milliseconds}`

        // Only check for 1st 4 bits to be on
        const minutesPart1 = difference.minutes & 15;

        // Only check for the 2nd 4 bits to be on
        const minutesPart2 = (difference.minutes >> 4) & 15;

        const secondsPart1 = difference.seconds & 15;
        const secondsPart2 = (difference.seconds >> 4) & 15;

        return <div>
            <p>{displayText}</p>

            <div className={styles.clock}>
                <Column timeSection={difference.hours} />
                <Column timeSection={minutesPart2} />
                <Column timeSection={minutesPart1} />
                <Column timeSection={secondsPart2} />
                <Column timeSection={secondsPart1} />
                <Column timeSection={difference.milliseconds} />
            </div>
        </div>;
    };
}

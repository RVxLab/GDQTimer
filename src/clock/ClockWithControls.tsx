import React, {Component, Fragment} from 'react';
import { Clock } from './Clock';

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

    private getStartPauseButtonText = (): string => {
        if (this.state.paused) {
            return 'Resume';
        } else if (this.state.started) {
            return 'Pause';
        }

        return 'Start';
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
        const startPauseButton = <button onClick={this.getStartPauseButtonOnClickFunc()}>
            {this.getStartPauseButtonText()}
        </button>;

        const stopButton = <button onClick={this.stop}>Stop</button>;

        return <Fragment>
            {startPauseButton}
            {stopButton}
        </Fragment>
    };

    public render = () => <div>
        <Clock started={this.state.started} paused={this.state.paused} />

        {this.renderButtons()}
    </div>;
}

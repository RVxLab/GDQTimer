import React from 'react';
import { Clock } from './Clock';

interface State {
    started: boolean;
}

export class ClockWithControls extends React.Component<any, State> {
    public state = {
        started: false,
    };

    private toggleStart = (): void => {
        this.setState(prevState => ({
            started: !prevState.started,
        }));
    }

    public render = () => <div>
        <Clock start={this.state.started} />

        <button onClick={this.toggleStart}>{this.state.started ? 'Stop' : 'Start'}</button>
    </div>;
}

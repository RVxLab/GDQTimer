import React from 'react';
import { Digit } from './Digit';

interface Props {
    timeSection: number;
}

export class Column extends React.Component<Props> {
    private isDigitEnabled = (n: number): boolean => (n & this.props.timeSection) !== 0;

    public render = () => <div>
        <Digit enabled={this.isDigitEnabled(8)} />
        <Digit enabled={this.isDigitEnabled(4)} />
        <Digit enabled={this.isDigitEnabled(2)} />
        <Digit enabled={this.isDigitEnabled(1)} />
    </div>;
}

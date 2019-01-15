import React, {Component} from 'react';
import classnames from 'classnames';

import baseStyles from './Digit.base.module.css';
import { ThemeContext, findTheme } from '../context/ThemeContext';

import agdq2019Styles from './Digit.agdq2019.module.css';
import sgdq2018Styles from './Digit.sgdq2018.module.css';

interface Props {
    enabled?: boolean;
};

export class Digit extends Component<Props> {
    render = () => {
        const agdq2019 = findTheme('agdq2019');
        const sgdq2018 = findTheme('sgdq2018');

        return <ThemeContext.Consumer>
            {({theme}) => <div data-test={theme} className={classnames(
            baseStyles.digit,
            {
                [agdq2019Styles.digit]: theme === agdq2019.key,
                [sgdq2018Styles.digit]: theme === sgdq2018.key,
                [agdq2019Styles.enabled]: this.props.enabled && theme === agdq2019.key,
                [sgdq2018Styles.enabled]: this.props.enabled && theme === sgdq2018.key,
            })}
        />}
        </ThemeContext.Consumer>
    };
}

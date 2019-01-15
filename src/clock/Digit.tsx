import React, {Component} from 'react';
import classnames from 'classnames';

import baseStyles from './Digit.base.module.css';
import { ThemeContext, themes } from '../context/ThemeContext';

import agdq2019Styles from './Digit.agdq2019.module.css';
import sgdq2018Styles from './Digit.sgdq2018.module.css';

interface Props {
    enabled?: boolean;
};

export class Digit extends Component<Props> {
    render = () => <ThemeContext.Consumer>
        {({theme}) => <div data-test={theme} className={classnames(
        baseStyles.digit,
        {
            [agdq2019Styles.digit]: theme === themes.agdq2019,
            [sgdq2018Styles.digit]: theme === themes.sgdq2018,
            [agdq2019Styles.enabled]: this.props.enabled && theme === themes.agdq2019,
            [sgdq2018Styles.enabled]: this.props.enabled && theme === themes.sgdq2018,
        })}
    />}
    </ThemeContext.Consumer>;
}

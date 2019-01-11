import classnames from 'classnames';
import React from 'react';

import styles from './Digit.module.css';

interface Props {
    enabled?: boolean;
};

export const Digit = (props: Props) =>
    <div className={classnames(styles.digit, { [styles.enabled]: props.enabled })}></div>;

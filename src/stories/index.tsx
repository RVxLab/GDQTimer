import React from 'react';

import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
import { Digit } from '../timer/Digit';

storiesOf('Digit', module)
    .add('disabled Digit', () => <Digit />)
    .add('enabled Digit', () => <Digit enabled />);

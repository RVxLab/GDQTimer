import React from 'react';

import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { storiesOf } from '@storybook/react';
import { Clock } from '../timer/Clock';
import { Column } from '../timer/Column';
import { Digit } from '../timer/Digit';

storiesOf('Clock', module)
    .add('Clock', () => <Clock startDate={new Date()} />);

storiesOf('Column', module)
    .add('column with no digits enabled', () => <Column timeSection={0} />)
    .add('column with first digit enabled', () => <Column timeSection={1} />)
    .add('column with second digit enabled', () => <Column timeSection={2} />)
    .add('column with first and second digit enabled', () => <Column timeSection={3} />)
    .add('column with third digit enabled', () => <Column timeSection={4} />)
    .add('column with first and third digit enabled', () => <Column timeSection={5} />)
    .add('column with second and third digit enabled', () => <Column timeSection={6} />)
    .add('column with first, second and third digit enabled', () => <Column timeSection={7} />)
    .add('column with fourth digit enabled', () => <Column timeSection={8} />)
    .add('column with first and fourth digit enabled', () => <Column timeSection={9} />);

storiesOf('Digit', module)
    .add('disabled Digit', () => <Digit />)
    .add('enabled Digit', () => <Digit enabled />);

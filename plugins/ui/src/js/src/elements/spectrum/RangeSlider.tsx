import React, { useCallback, useState } from 'react';
import {
  RangeSlider as SpectrumRangeSlider,
  SpectrumRangeSliderProps,
} from '@adobe/react-spectrum';
import { useDebouncedCallback } from '@deephaven/react-hooks';

const VALUE_CHANGE_DEBOUNCE = 250;

const EMPTY_FUNCTION = () => undefined;

function RangeSlider(props: SpectrumRangeSliderProps): JSX.Element {
  const {
    defaultValue = { start: 0, end: 0 },
    value: propValue,
    onChange: propOnChange = EMPTY_FUNCTION,
    ...otherProps
  } = props;

  const [value, setValue] = useState(propValue ?? defaultValue);

  const debouncedOnChange = useDebouncedCallback(
    propOnChange,
    VALUE_CHANGE_DEBOUNCE
  );

  const onChange = useCallback(
    newValue => {
      setValue(newValue);
      debouncedOnChange(newValue);
    },
    [debouncedOnChange]
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SpectrumRangeSlider value={value} onChange={onChange} {...otherProps} />
  );
}

RangeSlider.displayName = 'RangeSlider';

export default RangeSlider;

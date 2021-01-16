import React from 'react';

import { useFormContext, Controller } from 'react-hook-form';

import FormControl from '@material-ui/core/FormControl';
import { DatePicker, DatePickerProps as MUIDatePickerProps } from '@material-ui/pickers';

import { InputComponent, BaseTextFieldProps } from './TextField';

export interface DatePickerProps extends BaseTextFieldProps {
  pickerVariant?: MUIDatePickerProps['variant'];
}

const TextField = (props: DatePickerProps) => {
  const {
    name,
    variant,
    pickerVariant,
    inputComponent = InputComponent,
    ...otherProps
  } = props;

  const { control } = useFormContext();

  return (
    <FormControl fullWidth>
      <Controller
        render={({ ref, ...inputProps }) => (
          <DatePicker
            autoOk
            inputVariant={variant}
            variant={pickerVariant}
            inputRef={ref}
            TextFieldComponent={inputComponent}
            {...otherProps}
            {...inputProps}
          />
        )}
        name={name}
        control={control}
      />
    </FormControl>
  );
};

export default React.memo(TextField);

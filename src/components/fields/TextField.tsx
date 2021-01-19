import React from 'react';

import { useFormContext, Controller } from 'react-hook-form';

import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import MUITextField, {
  TextFieldProps as MUITextFieldProps,
} from '@material-ui/core/TextField';

export interface BaseTextFieldProps {
  name: string;
  label: React.ReactNode;
  error?: MUITextFieldProps['error'];
  required?: MUITextFieldProps['required'];
  disabled?: MUITextFieldProps['disabled'];
  variant?: MUITextFieldProps['variant'];
  placeholder?: MUITextFieldProps['placeholder'];
  helperText?: MUITextFieldProps['helperText'];
  inputComponent?: React.ComponentType<MUITextFieldProps>;
}

export interface TextFieldProps extends BaseTextFieldProps {
  multiline?: MUITextFieldProps['multiline'];
  rowsMax?: MUITextFieldProps['rowsMax'];
  rows?: MUITextFieldProps['rows'];
  type?: MUITextFieldProps['type'];
}

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      marginBottom: 8,
    },
  }),
);

export const InputComponent = (props: MUITextFieldProps) => {
  const classes = useStyles();

  return (
    <MUITextField
      InputLabelProps={{
        shrink: true,
        classes: {
          root: classes.root,
        },
      }}
      {...props}
    />
  );
};

export const InputComponentFR = React.forwardRef<
  HTMLElement,
  MUITextFieldProps
>((props, ref) => <MUITextField inputRef={ref} {...props} />);

const TextField = (props: TextFieldProps) => {
  const {
    name,
    inputComponent: Input = InputComponentFR,
    ...otherProps
  } = props;

  const { control } = useFormContext();

  return (
    <FormControl fullWidth>
      <Controller
        render={(inputProps) => <Input {...otherProps} {...inputProps} />}
        name={name}
        control={control}
      />
    </FormControl>
  );
};

export default React.memo(TextField);

import * as React from 'react';
import { FieldProps } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';

export const MyField: React.FC<FieldProps & TextFieldProps> = ({
    placeholder,
    field,
    label,
}) => {
    return <TextField label={label} placeholder={placeholder} {...field} />;
};

import React from 'react';
import { useField, FieldAttributes } from 'formik';
import { TextField } from '@material-ui/core';

export const CustomTextField: React.FC<FieldAttributes<{}>> = ({
    type,
    placeholder,
    ...props
}) => {
    const [field, meta] = useField<{}>(props);
    const errorText = meta.error && meta.touched ? meta.error : '';
    return (
        <TextField
            {...field}
            fullWidth
            type={type}
            variant="outlined"
            margin="normal"
            label={placeholder}
            placeholder={placeholder}
            error={!!errorText}
            helperText={errorText}
        />
    );
};

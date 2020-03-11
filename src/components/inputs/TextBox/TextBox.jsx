import React from 'react'
import MuiTextField from '@material-ui/core/TextField'

export const TextBox = ({
  name,
  label,
  onBlur,
  onChange,
  value,
  defaultValue,
  disabled
}) => (
  <MuiTextField
    name={name}
    label={label}
    onChange={onChange}
    onBlur={onBlur}
    value={value}
    fullWidth
    disabled={disabled}
    InputLabelProps={{
      shrink: true
    }}
    inputProps={{
      defaultValue: defaultValue
    }}
  />
)

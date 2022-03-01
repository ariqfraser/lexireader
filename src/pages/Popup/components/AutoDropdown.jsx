import React from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import styled from '@emotion/styled';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const Selector = styled(Autocomplete)({
  color: 'var(--primary)',
  '#language-selector-label, #language-selector': {
    color: 'var(--primary)',
  },
  '.MuiAutocomplete-endAdornment > button> svg': {
    color: 'var(--primary)',
  },
  width: 320,
  padding: '0 16px',
});

const CustomField = styled(TextField)({});

const AutoDropdown = ({ id = '', label = '', data }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }

    (async () => {
      //   await sleep(1e3); // For test purposes.

      if (active) {
        setOptions([...languagesDB]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Selector
      id={id}
      sx={{ width: 300, magrinLeft: 10 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.code === value.code} // idk what the point of this is
      getOptionLabel={(option) => option.name + ', ' + option.code}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <CustomField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

const languagesDB = [
  { name: 'Spanish', code: 'ES' },
  { name: 'Indonesian', code: 'ID' },
  { name: 'English', code: 'GB' },
];

export default AutoDropdown;

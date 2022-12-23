import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Slider,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import { blue } from '@mui/material/colors';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from 'react';
import { UPPERCASE, NUMBERS, SPECIAL_CHARS, LOWERCASE } from '../../constants/index';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#000000'
    }
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightBold: '700',
    fontWeightLight: '400',
    fontWeightRegular: '500'
  }
});

const SLIDER_TYPOGRAPHY_STYLE = {
  border: '1px solid black',
  height: '1.5rem',
  width: '1.2rem',
  paddingLeft: '.3rem',
  paddingBottom: '.35rem',
  paddingRight: '.3rem'
};

const BOX_SHADOW =
  '1px 1px 0px #999, 2px 2px 0px #999, 3px 3px 0px #999, 4px 4px 0px #999, 5px 5px 0px #999, 6px 6px 0px #999';

function Menu() {
  const [sliderValue, setSliderValue] = useState<number>(4);

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [selectedCheckbox, setSelectedCheckbox] = useState<{
    isUppercase: boolean;
    isLowercase: boolean;
    isNumber: boolean;
    isSpecialChar: boolean;
  }>({ isUppercase: true, isLowercase: true, isNumber: true, isSpecialChar: true });

  const [generatedPassword, setGeneratedPassword] = useState<string>('');

  /**
   * Handles the change in slider value.
   *
   * @param event - The event (this is not in use)
   * @param newValue - The new value of the slider
   * @returns nothing
   *
   */
  function handleSliderValueChange(event: Event, newValue: number | number[]): void {
    setSliderValue(newValue as number);
  }

  type checkBoxes = {
    isUppercase: boolean;
    isLowercase: boolean;
    isNumber: boolean;
    isSpecialChar: boolean;
  };

  /**
   * Handles the change in checkbox selected.
   *
   * @param event - .target.checked changes to true when checkbox is selected and vice versa
   * @param prop - The key of checkBoxes object which extends selectedCheckbox
   * @returns nothing
   *
   */

  function handleCheckBoxSelection(event: React.ChangeEvent<HTMLInputElement>, prop: keyof checkBoxes): void {
    setSelectedCheckbox({ ...selectedCheckbox, [prop]: event.target.checked });
  }

  /**
   * Generates a random number from 0 to n.
   *
   * @param n - The max range upto which the random number should be generated
   * @returns the random number
   *
   */
  function genRandomNumberWRTn(n: number): number {
    return Math.floor(Math.random() * (n - 0 + 1) + 0);
  }

  /**
   * Gets the value from constants and pushes it to the password array
   *
   * @returns generated password's joined array
   *
   */
  function handleSubmit(): void {
    let password: string[] = [];

    for (let i = 1; i <= sliderValue; i++) {
      const capCharRandomNum = genRandomNumberWRTn(25);
      const smallCharRandomNum = genRandomNumberWRTn(25);
      const specialCharRandomNum = genRandomNumberWRTn(12);
      const randomNum = genRandomNumberWRTn(9);

      /**
       * Need to refactor if statements -> WIP
       */
      if (selectedCheckbox.isUppercase && password.length !== sliderValue) {
        password.push(UPPERCASE[capCharRandomNum]);
      }
      if (selectedCheckbox.isLowercase && password.length !== sliderValue) {
        password.push(LOWERCASE[smallCharRandomNum]);
      }
      if (selectedCheckbox.isSpecialChar && password.length !== sliderValue) {
        password.push(SPECIAL_CHARS[specialCharRandomNum]);
      }
      if (selectedCheckbox.isNumber && password.length !== sliderValue) {
        password.push(NUMBERS[randomNum]);
      }
    }

    setGeneratedPassword(password.join(''));
  }

  /**
   * Copies the generated password to clipboard
   *
   * @returns nothing
   *
   */

  function copyPassword(): void {
    navigator.clipboard.writeText(generatedPassword);
    setIsCopied(true);
  }

  /**
   * Closes the copied successfully modal
   *
   * @param event the reason why the modal was closed (optional)
   * @returns nothing
   *
   */

  function handleCloseSuccessCopyModal(event: React.SyntheticEvent | Event, reason?: string): void {
    if (reason === 'clickaway') {
      return;
    }

    setIsCopied(false);
  }

  const action = (
    <React.Fragment>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleCloseSuccessCopyModal}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </React.Fragment>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        display='flex'
        padding='5rem'
        gap='2rem'
        sx={{
          border: '2px solid blue',
          borderRadius: '1rem',
          boxShadow: BOX_SHADOW
        }}
      >
        <form
          noValidate
          autoComplete='off'
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Box
            sx={{
              mb: 3,
              borderBottom: '5px solid black',
              borderRadius: '1rem',
              backgroundColor: 'white',
              paddingBottom: '.5rem'
            }}
            display='flex'
          >
            <TextField
              placeholder='generate password'
              type='text'
              sx={{ color: '#4a4a4a', border: 'none', '& fieldset': { border: 'none' } }}
              value={generatedPassword}
              InputProps={{
                readOnly: true
              }}
            />
            <Divider orientation='vertical' sx={{ ml: 3 }} variant='middle' flexItem />
            <Button sx={{ ml: 10, height: '3.5rem', width: '2rem' }} onClick={copyPassword}>
              <ContentCopyIcon style={{ height: '3rem', width: '1.5rem' }} />
            </Button>
          </Box>
          <Typography variant='h4' align='center' sx={{ fontWeight: 700 }}>
            Customize your password
          </Typography>
          <Divider sx={{ mt: 1, mb: 3 }} />
          <Box display='flex' gap='1rem' flexDirection='column'>
            <Typography variant='subtitle1' component='span'>
              Password Length
            </Typography>
            <Box display='flex' flexDirection='row' gap='2rem'>
              <Typography variant='h6' component='span' sx={SLIDER_TYPOGRAPHY_STYLE}>
                {sliderValue}
              </Typography>
              <Slider
                sx={{ width: '20rem' }}
                size='medium'
                aria-label='Temperature'
                defaultValue={8}
                valueLabelDisplay='auto'
                value={sliderValue}
                onChange={handleSliderValueChange}
                step={4}
                marks
                min={4}
                max={16}
              />
            </Box>
          </Box>
          <FormGroup sx={{ mt: '1rem' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCheckbox.isSpecialChar}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCheckBoxSelection(event, 'isSpecialChar')}
                />
              }
              label='Special Characters'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCheckbox.isNumber}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCheckBoxSelection(event, 'isNumber')}
                />
              }
              label='Numbers'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCheckbox.isUppercase}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCheckBoxSelection(event, 'isUppercase')}
                />
              }
              label='Uppercase'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCheckbox.isLowercase}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleCheckBoxSelection(event, 'isLowercase')}
                />
              }
              label='Lowercase'
            />
          </FormGroup>
          <Button
            color='secondary'
            fullWidth
            size='medium'
            variant='contained'
            sx={{ mt: 2, width: '10rem', boxShadow: BOX_SHADOW }}
            type='submit'
          >
            <Typography variant='body1' component='span'>
              Generate
            </Typography>
          </Button>
        </form>
        <Snackbar
          open={isCopied}
          autoHideDuration={6000}
          onClose={handleCloseSuccessCopyModal}
          message='Copied Successfully'
          action={action}
        />
      </Box>
    </ThemeProvider>
  );
}

export default Menu;

import React, { useState } from 'react';
import axios from 'axios';
import {
  Card,
  Box,
  FormControl,
  InputLabel,
  Typography
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAuth0 } from "@auth0/auth0-react";


function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState(false);

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

const { loginWithRedirect, getAccessTokenSilently } = useAuth0();

const handleSubmit = async (event) => {
  event.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setPasswordError(true);
    return;
  }

  setPasswordError(false);

  // Redirect to Auth0's signup page
  loginWithRedirect({
    screen_hint: 'signup',
    initialScreen: 'signUp',
    email: formData.email,
    password: formData.password,
  });

  try {
    // Get the access token using Auth0's hook method
    const token = await getAccessTokenSilently();  // This function comes from useAuth0

    // Now, use this token in your request's Authorization header
    const response = await axios.post('http://localhost:3001/store-user-data', {
      username: formData.username  // Send username to the backend
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      console.log("User data stored successfully");
    } else {
      console.error("Error storing user data");
    }
  } catch (error) {
    console.error("There was an error:", error);
  }

  setFormData({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
};




  return (
    <div style={{ margin: '0', padding: '0' }}>
      <Box
        sx={{
          backgroundColor: '#2045a5',
          height: '99.9vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            marginTop: '5rem',
            marginLeft: '1.5rem',
            color: '#ffffff',
            fontFamily: 'Copernicus, serif',
          }}
        >
          Create an Account
        </Typography>
        <Card
          elevation={10}
          square={false}
          sx={{
            border: 'solid',
            width: '30rem',
            borderRadius: '15px',
            height: '23rem',
            marginLeft: '2rem',
            padding: '20px',
            backgroundColor: '#ffffff',
            color: '#2045a5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="username" shrink={true} style={{ color: '#2045a5', transform: 'translate(0, -22px)' }}>
                USERNAME
              </InputLabel>
              <TextField
                id="username"
                name="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="email" shrink={true} style={{ color: '#2045a5', transform: 'translate(0, -22px)' }}>
                EMAIL
              </InputLabel>
              <TextField
                id="email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="password" shrink={true} style={{ color: '#2045a5', transform: 'translate(0, -22px)' }}>
                PASSWORD
              </InputLabel>
              <TextField
                id="password"
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                required
                error={passwordError}
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="confirmPassword" shrink={true} style={{ color: '#2045a5', transform: 'translate(0, -22px)' }}>
                RE-ENTER PASSWORD
              </InputLabel>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                variant="outlined"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                error={passwordError}
                helperText={passwordError ? "Passwords do not match" : ""}
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#ff7f50',
              }}
            >
              Sign Up
            </Button>
          </form>
        </Card>
      </Box>
    </div>
  );
}

export default SignUp;
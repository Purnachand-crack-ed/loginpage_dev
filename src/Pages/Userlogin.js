import React, { useState } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Userlogin() {

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
  const [form, setForm] = useState({username:'',password:''});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate=useNavigate();

  const handleChange=(e) =>{
    setForm({...form,[e.target.name]: e.target.value});

  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError('');
    setSuccess('');

    try{
        await axios.post('http://localhost:8000/api/users/login/',form);
        setSuccess('Login Successfull');
        // setForm({username:'',password:''})
        setTimeout(()=>{
            navigate('/student');
        }, 2000)
    } catch(err){
        const errorMsg=err.response?.data || "You don't have account please create one and login";
        setError(JSON.stringify(errorMsg));
        setTimeout(()=>{
            navigate('/');
        }, 5000)

  }
  };

  return (
    <Container>
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            User Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{
            backgroundColor: '#ffebee', // light red background
            color: '#b71c1c',            // dark red text
            border: '1px solid #f44336',
            borderRadius: 2,
            fontWeight: 500,
    }}>
              {error}. Don't have an account? <a href="/">Create one</a>.
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name='username'
              fullWidth
              margin="normal"
              value={form.username}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name='password'
              type="password"
              fullWidth
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>

            <p> Don't have account ? Click here to  <a href='/'>SignUp</a></p>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

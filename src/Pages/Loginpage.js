import React, { useState } from 'react';
import { TextField, Button,Container, Typography,InputLabel, Box, Alert,MenuItem,Select } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function RegisterForm() {
  const navigate=useNavigate();
  const [form, setForm] = useState({ email: '', username: '', password: '',role:'' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:8000/api/users/register/', form);
      setSuccess("Success");
      setForm({ email: '', username: '', password: '',role:'' });
      setTimeout(()=>{
        navigate('/Userlogin')
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data || 'Something went wrong.';
      setError(JSON.stringify(errorMsg));
    }
  };

  return (
    <Container>
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 8, }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" fullWidth margin="normal" value={form.email} onChange={handleChange} required />
        <TextField label="Username" name="username" fullWidth margin="normal" value={form.username} onChange={handleChange} required />
        <TextField label="Password"
         name="password" 
         type="password"
         fullWidth
         margin="normal" 
         value={form.password} 
         onChange={handleChange}
         required 
           />
        <InputLabel id="role-label">User Role</InputLabel>
    <Select
      labelId="role-label"
      id="role"
      name="role"
      fullWidth
      value={form.role}
      label="User Role"
      onChange={handleChange}
      required
    >
      <MenuItem value="admin">Admin</MenuItem>
      <MenuItem value="student">Student</MenuItem>
      <MenuItem value="faculty">Faculty</MenuItem>
    </Select>
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>Register</Button>
      </form>
    </Box>
  </Container>
  );
}

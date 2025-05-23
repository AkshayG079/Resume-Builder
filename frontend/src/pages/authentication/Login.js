import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Card, CardContent, CardActions, Link } from '@mui/material';
import Header from '../../component/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataState } from '../../context/Contextprovider';

const Login = () => {

    const { setLoggedUser } = DataState();
    const navigate = useNavigate();

    const [formField, setFormField] = useState({ email: '', password: '' })
    function emailChecker(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    const handleSubmit = async () => {
        if (!formField.email || !formField.password) {
            return alert("fill all the feilds")
        }

        if (!emailChecker(formField.email)) {
            return alert("Invalid Email")
        }

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        try {
            const { data, status } = await axios.post('http://localhost:4455/auth/login',
                {
                    email: formField.email,
                    password: formField.password
                }, config)
            if (status === 200) {
                setLoggedUser(data.isUser)
                navigate('/');
            }
        } catch (error) {
            error.response.status === 400 ? alert(error.response.data.message) : alert('Internal Server Issue');
        } finally {
            setFormField({ password: '', email: '' })
        }
    }

    return (
        <>
            <Header />
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="calc(100vh - 5.6rem)"
                backgroundColor='#F0F8FF'
            >

                <Card sx={{ width: '100%', maxWidth: 400, padding: 2 }}>
                    <Typography variant="h5" align="center" fontWeight={600}>
                        Login
                    </Typography>

                    <CardContent>
                        <form>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box>
                                    <Typography variant="body1">Email</Typography>
                                    <TextField
                                        fullWidth
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={formField.email}
                                        onChange={(e) => setFormField((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }))}
                                        required
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="body1">Password</Typography>
                                    <TextField
                                        fullWidth
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        value={formField.password}
                                        onChange={(e) => setFormField((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }))}
                                        required
                                    />
                                </Box>
                            </Box>
                        </form>
                    </CardContent>
                    <CardActions sx={{ flexDirection: 'column', gap: 2, p: 2 }}>
                        <Button onClick={handleSubmit} variant="contained" fullWidth type="submit">
                            Log in
                        </Button>
                        <Box textAlign="center" fontSize="0.875rem">
                            Don't have an account?{" "}
                            <Link href="/signup" underline="hover" color="primary">Sign up  </Link>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    )
}

export default Login


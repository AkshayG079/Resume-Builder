import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Card, CardContent, CardActions, Link } from '@mui/material';
import Header from '../../component/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();

    const [formField, setFormField] = useState({ name: '', password: '', email: '', c_password: '' })

    function emailChecker(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailRegex.test(email)) {
            return true;  // Email is valid
        } else {
            return false; // Email is invalid
        }
    }

    const handleSubmit = async () => {
        if (!formField.name|| !formField.password || !formField.email || !formField.c_password) {
            return alert("fill all the feilds")
        }

        if (formField.password !== formField.c_password) {
            return alert("Password does not match")
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
            const { status } = await axios.post('http://localhost:4455/auth/signup', {
                    userName: formField.name,
                    email: formField.email,
                    password: formField.password
                }, config)
            if (status === 200) {
                navigate('/login')
            }
        } catch (error) {
            error.response.status === 400 ? alert(error.response.data.message) : alert('Internal Server Issue');
        } finally {
            setFormField({ name: '', password: '', email: '', c_password: '' })
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
                        Create an Account
                    </Typography>

                    <CardContent>
                        <form>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box>
                                    <Typography variant="body1">Full Name</Typography>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={formField.name}
                                        onChange={(e) => setFormField((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }))}
                                        required
                                    />
                                </Box>
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
                                        placeholder="Create a password"
                                        name="password"
                                        value={formField.password}
                                        onChange={(e) => setFormField((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }))}
                                        required
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="body1">Confirm Password</Typography>
                                    <TextField
                                        fullWidth
                                        id="confirm-password"
                                        type="password"
                                        placeholder="Confirm your password"
                                        name="c_password"
                                        value={formField.c_password}
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
                            Sign up
                        </Button>
                        <Box textAlign="center" fontSize="0.875rem">
                            Already have an account?{" "}
                            <Link href="/login" underline="hover" color="primary">
                                Log in
                            </Link>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    )
}

export default Signup



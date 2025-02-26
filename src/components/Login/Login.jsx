import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, user } = useSelector((state) => state.auth);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    if (user) {
        navigate("/private");
    }

    return (
        <Container>
            <Typography variant="h4">Login</Typography>

            {error && <Alert severity="error">{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" >
                    Login
                </Button>
            </form>

            <Typography variant="h5">
                Do not have an account? <Link to="/">Register</Link>
            </Typography> 
        </Container>
    );
};

export default Login;

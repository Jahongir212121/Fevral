import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/authSlice";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser({ email, password })).then(() => navigate("/private"));
    };

    return (
        <Container> 
            <Typography variant="h4">Register</Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" variant="contained" color="primary">Register</Button>
            </form>
            <Typography variant="h5">Already Registered <Link to='/login'>Login</Link></Typography>

        </Container>
    );
};

export default Register;
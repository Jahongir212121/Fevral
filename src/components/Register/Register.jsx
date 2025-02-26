import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/authSlice";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [showAlert, setShowAlert] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(registerUser({ email, password }));

        setAlertMessage(result.payload);
        setAlertSeverity(result.payload === "User qoʻshildi!" ? "success" : "error");
        setShowAlert(true);

        if (result.payload === "User qoʻshildi!") {
            setTimeout(() => navigate("/private"), 2000);
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" >Register</Typography>

            {showAlert && (
                <Alert severity={alertSeverity} onClose={() => setShowAlert(false)} sx={{ mb: 2 }}>
                    {alertMessage}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Register
                </Button>
            </form>

            <Typography variant="h5" align="center" sx={{ mt: 2 }}>
                Already Registered? <Link to='/login'>Login</Link>
            </Typography>
        </Container>
    );
};

export default Register;

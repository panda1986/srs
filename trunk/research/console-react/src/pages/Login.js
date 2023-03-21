import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();

    React.useEffect(() => {
        console.log('login, use effect, navigate to dvr');
        navigate('/dvr');
    }, [navigate]);

    return (
        <>
            <Container>Login</Container>
        </>
    )
}
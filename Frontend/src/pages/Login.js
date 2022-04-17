import React, { useContext, useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { useLoginUserMutation } from '../services/appApi';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/appContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);

    function handleLogin(e) {
        e.preventDefault();
        loginUser({ email, password }).then(({ data }) => {
            if (data) {
                // Socket work and we navigate to the chat
                socket.emit('new-user')

                // Navigate to the chat page
                navigate('/chat')
            }
        })
    }

    return (
        <Container>
            <Row>
                <div className='d-flex align-items-center justify-content-center pt-5 flex-direction-column' style={{ height: '60vh' }}>
                    <Form style={{ width: '50%', maxWidth: '500' }} onSubmit={handleLogin}>
                        <h2 className='text-center'>Log in to your account</h2>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Log In
                        </Button>
                    </Form>
                </div>
            </Row>
        </Container>
    )
};

export default Login;

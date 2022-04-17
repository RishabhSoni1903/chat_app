import React from 'react';
import { Nav, Navbar, Container, NavDropdown, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutUserMutation } from '../services/appApi';

function NavigationBar() {
    const user = useSelector((state) => (state.user));
    const [logoutUser] = useLogoutUserMutation();

    function handleLogout(e) {
        e.preventDefault();
    }

    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        // Redirect to homepage
        // window.location.replace('/login')
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>ChatApp</Navbar.Brand>
                    </LinkContainer>
                    <Nav className="me-auto d-flex justify-content-center align-items-center">
                        <LinkContainer to="/login">
                            <Nav.Link className={!user ? "d-block" : "d-none"}>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signup">
                            <Nav.Link className={!user ? "d-block" : "d-none"}>Sign Up</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/chat">
                            <Nav.Link className={!user ? "d-none" : "d-block"}>Chat</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/">
                            <Nav.Link><Button variant='danger' className={!user ? "d-none" : "d-block"} style={{ height: 40 }} onClick={handleLogout}>Logout {user?.name}</Button></Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
};

export default NavigationBar;

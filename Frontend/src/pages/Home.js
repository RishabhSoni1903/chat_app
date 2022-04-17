import React from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

function Home() {
    return <Row>
        <Col className='d-flex flex-direction-column align-items-center justify-content-center pt-5 pr-0' style={{ height: '60vh' }}>
            <div className='text-center'>
                <h2>Welcome to the ChatApp, Stranger</h2>
                <p>We helps you connect to your friends and people all around the world</p>
                <LinkContainer to='/login'>
                    <Button variant='success'>Get Started
                        <i className="fa-brands fa-rocketchat mx-2"></i>
                    </Button>
                </LinkContainer>
            </div>
        </Col>
    </Row>
}
export default Home;
import React, { useState } from 'react';
import { useSignupUserMutation } from '../services/appApi';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import bot from '../assets/bot.jpg';
import './Signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file sixe is 1 mb")
        } else {
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    async function uploadImage() {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'tpuyetmx');
        try {
            setUploadingImg(true);
            let res = await fetch('https://api.cloudinary.com/v1_1/dy7w54dh1/image/upload', {
                method: 'POST',
                body: data,
            })
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    };

    async function handleSignUp(e) {
        e.preventDefault();
        if (!image) return alert('Please select a profile picture')
        const url = await uploadImage(image);
        console.log(url)

        // Signup user
        signupUser({ name, email, password, picture: url }).then(({ data }) => {
            if (data) {
                console.log(data)
                navigate('/chat')
            }
        })
    };


    return (
        <Container>
            <Row>
                <div className='d-flex align-items-center justify-content-center pt-5 flex-direction-column'>
                    <Form style={{ width: '50%', maxWidth: '500' }} onSubmit={handleSignUp}>
                        <h2 className='text-center'>Create an account</h2>
                        <div className='userProfilePicture_container'>
                            <img src={imagePreview || bot} alt='' className='userProfilePicture' />
                            <label htmlFor="imageUpload" className='image_upload_label'>
                                <i className="fas fa-plus-circle add-picture-icon"></i>
                            </label>
                            <input type="file" id='imageUpload' hidden accept='image/png, image/jpeg' onChange={validateImg} />
                        </div>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            {uploadingImg ? "Signing you up..." : "Sign Up"}
                        </Button>
                    </Form>
                </div>
            </Row>
        </Container>
    )
};

export default Signup;

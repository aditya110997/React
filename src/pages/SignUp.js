import React, { useState, useContext } from "react";

import {
    Container,
    Form,
    Button,
    FormGroup,
    Label,
    Col,
    Input,
    Row,
    Card,
    CardBody,
    CardFooter,
    CardHeader
} from "reactstrap";

import firebase from "firebase/app";
import {UserContext} from "../context/UserContext"; 
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";

// Import Google Signin Button
import GoogleButton from 'react-google-button'

// Import GitHub Signin Button
import GithubButton from 'react-github-login-button'

const SignUp = () => {

	const context = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSignup = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                context.setUser({email : res.user.email, uid : res.user.uid});
            })
            .catch(error => {
                console.log(error)
                toast(error.message, {
                    type : "error"
                })
            })

    }

    const handleSubmit = e => {
        e.preventDefault();
        handleSignup();
    }

	const GoogleSignIn = e => {
		e.preventDefault();
		GoogleProviderSignIn();
	}
	const GitHubSignIn = e => {
		e.preventDefault();
		GitHubProviderSignIn();
	}

	const GoogleProviderSignIn = () => {
		var provider = new firebase.auth.GoogleAuthProvider();

		firebase.auth().signInWithPopup(provider).then(function(result) {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			// Save the user id and email from the user object in the context
			context.setUser({email : user.email, uid : user.uid});
			
		  }).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			
		  });
	}

	const GitHubProviderSignIn = () => {
		var provider = new firebase.auth.GithubAuthProvider();

		firebase.auth().signInWithPopup(provider).then(function(result) {
			// This gives you a GitHub Access Token. You can use it to access the GitHub API.
			var token = result.credential.accessToken;
			// The signed-in user info.
			var user = result.user;
			// Save the user id and email from the user object in the context
			context.setUser({email : user.email, uid : user.uid});

		  }).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			
		  });
	}
    if(context.user?.uid){
        return <Redirect to = "/" />
    }
    return (
		<Container className='text-center' style = {{marginTop : "7rem", marginBottom : "10rem"}}>
			<Row>
				<Col lg={6} className='offset-sm-3 mt-5'>
					<Card>
						<Form onSubmit={handleSubmit}>
							<CardHeader className='h5'>SignUp here</CardHeader>
							<CardBody>
								<FormGroup row>
									<Label for='email' sm={3}>
										Email
									</Label>
									<Col sm={9}>
										<Input
											type='email'
											name='email'
											id='email'
											placeholder='provide your email'
											value={email}
											onChange={e => setEmail(e.target.value)}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for='password' sm={3}>
										Password
									</Label>
									<Col sm={9}>
										<Input
											type='password'
											name='password'
											id='password'
											placeholder='your password here'
											value={password}
											onChange={e => setPassword(e.target.value)}
										/>
									</Col>
								</FormGroup>
							</CardBody>
							<CardFooter style = {{marginBottom : "2rem"}}>
								<Button type='submit' block color='primary'>
									Sign Up
								</Button>
								<div className="text-center" >OR</div>
							</CardFooter>
							<GoogleButton className = "mx-auto" style = {{marginBottom : "2rem"}} 
							onClick = {GoogleSignIn}
							/>
							<GithubButton className = "mx-auto" style = {{marginBottom : "2rem"}}
							onClick = {GitHubSignIn}
							/>
						</Form>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default SignUp;
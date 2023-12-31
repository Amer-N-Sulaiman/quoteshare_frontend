import Button from 'react-bootstrap/Button';
import Head from 'next/head'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/features/userSlice';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



function SignUp() {

  const [full_name, setFull_name] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user.user)
  const router = useRouter()
  const error = useSelector(state=>state.user.error)
  
  const handleSignup = async ()=>{
    dispatch(signup({full_name, username, password}))
  }

  useEffect(()=>{
    if (user){
      router.replace('/feed')
    }
  }, [user])

  return (
    <>
      <Head>
          <title>Sign Up</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 style={{textAlign: 'center', margin: '30px 0'}}>Sign Up</h1>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} xs={10}>
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" >
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control value={full_name} onChange={(e)=>setFull_name(e.target.value)} type="text" placeholder="Enter your full name" />
                    
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Enter your username" />
                    
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
                  </Form.Group>
                  
                  <Button variant="primary" onClick={handleSignup}>
                    Sign Up
                  </Button>
                  {error && <Alert severity="error" style={{marginTop: '30px'}}>
                      <AlertTitle>Error</AlertTitle>
                      <strong>{error}</strong>
                  </Alert>}
                </Form>
    
              </Card.Body>
            </Card>
         </Col>

        </Row>
      </Container>
    </>
  );
}

export default SignUp;
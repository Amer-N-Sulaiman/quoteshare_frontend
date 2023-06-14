import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {useState} from 'react'
import {login} from '../redux/features/userSlice'
import { useDispatch } from 'react-redux';


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()


  const handleLogin = async ()=>{
    console.log('username & password', username, password)
    dispatch(login({username, password}))
  }
  return (
    <>
      <h1 style={{textAlign: 'center', margin: '30px 0'}}>Login</h1>
      <Container>
        <Row className="justify-content-center">
          <Col lg={8} xs={10}>
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Enter your username" />
                    
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
                  </Form.Group>
                  
                  <Button variant="primary" onClick={handleLogin}>
                    Login
                  </Button>
                </Form>
    
              </Card.Body>
            </Card>
         </Col>

        </Row>
      </Container>
    </>
  );
}

export default Login;
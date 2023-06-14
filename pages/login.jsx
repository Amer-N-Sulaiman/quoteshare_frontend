import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {useState, useEffect} from 'react'
import {login} from '../redux/features/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import {useRouter} from 'next/router'


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user.user)
  const router = useRouter()

  const handleLogin = async ()=>{
    dispatch(login({username, password}))
  }

  useEffect(()=>{
    if (user){
      router.replace('/feed')
    }
  }, [user])
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
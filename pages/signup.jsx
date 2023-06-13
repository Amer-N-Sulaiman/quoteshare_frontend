import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


function SignUp() {
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
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your full name" />
                    
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter your username" />
                    
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  
                  <Button variant="primary" type="submit">
                    Sign Up
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

export default SignUp;
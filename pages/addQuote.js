import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import {useState} from 'react'
import { addQuote } from "../redux/features/quoteSlice"
import { useDispatch, useSelector } from 'react-redux'


const AddQuote = ()=>{
    const [author, setAuthor] = useState('')
    const [quote, setQuote] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.user)

    const handleAddQuote = async() => {
        if (!user) {
            console.log('You should be logged in')
            return
        }
        dispatch(addQuote({author, quote, token:user.token}))
    }

    return (
        <>
            <h1 style={{textAlign: 'center', margin: '30px 0'}}>Add Quote</h1>
            <Container>
                <Row className="justify-content-center">
                <Col lg={8} xs={10}>
                    <Card>
                    <Card.Body>
                        <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Author</Form.Label>
                            <Form.Control value={author} onChange={(e)=>setAuthor(e.target.value)} type="text" placeholder="Enter The Author Name" />
                            
                        </Form.Group>

                        <InputGroup style={{marginBottom: '10px'}}>
                            <InputGroup.Text>Quote</InputGroup.Text>
                            <Form.Control as="textarea" value={quote} onChange={(e)=>setQuote(e.target.value)} aria-label="Enter Your Quote" />
                        </InputGroup>
                        
                        <Button variant="primary" onClick={handleAddQuote}>
                            Add Quote
                        </Button>
                        </Form>
            
                    </Card.Body>
                    </Card>
                </Col>

                </Row>
            </Container>
        </>
    
    )
}

export default AddQuote
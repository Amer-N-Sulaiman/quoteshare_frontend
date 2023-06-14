import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {logout} from '../redux/features/userSlice'
import {useDispatch} from 'react-redux'

function MyNavbar() {
    const dispatch = useDispatch()
    return (
        <>
            <Navbar bg="dark" variant="dark" style={{marginBottom: '30px'}}>
            <Container>
                <Navbar.Brand href="/">Quote Share</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="/">Quotes Feed</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign up</Nav.Link>
                <Nav.Link onClick={()=>dispatch(logout())}>Log out</Nav.Link>
                </Nav>
            </Container>
            </Navbar>
        </>
    )
}

export default MyNavbar;
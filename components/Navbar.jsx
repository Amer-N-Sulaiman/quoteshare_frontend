import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {logout} from '../redux/features/userSlice'
import {useDispatch, useSelector} from 'react-redux'

function MyNavbar() {
    const dispatch = useDispatch()
    const user = useSelector(state=> state.user.user)
    return (
        <>
            <Navbar bg="dark" variant="dark" style={{marginBottom: '30px'}}>
            <Container>
                <Navbar.Brand href="/">Quote Share</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/feed">Quotes Feed</Nav.Link>
                    {!user && <Nav.Link href="/login">Login</Nav.Link>}
                    {!user && <Nav.Link href="/signup">Sign up</Nav.Link>}
                    {user && <Nav.Link href="/addQuote">Add Quote</Nav.Link>}
                    {user && <Nav.Link onClick={()=>dispatch(logout())}>Log out</Nav.Link>}
                </Nav>
            </Container>
            </Navbar>
        </>
    )
}

export default MyNavbar;
import { Container, Row, Col} from 'react-bootstrap'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuotes } from '../redux/features/quoteSlice'

const Feed = ()=>{
    const quotes = useSelector(state=>state.quote.quotes)
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.user)

    useEffect(()=>{
        if (!user){
            return
        }
        dispatch(fetchQuotes({token: user.token}))
    }, [user])


    return (
        <>
            
            <Container>
                <h1 style={{textAlign: 'center'}}>Quotes Feed</h1>
                {quotes.map(quote=>(<Row>
                    <Col>
                        {quote.body}
                    </Col>
                </Row>))}
            </Container>
        </>

    )
}

export default Feed
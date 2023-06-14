import { Container, Row, Col} from 'react-bootstrap'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuotes } from '../redux/features/quoteSlice'
import QuoteCard from '../components/QuoteCard'

const Feed = ()=>{
    const quotes = useSelector(state=>state.quote.quotes)
    const dispatch = useDispatch()
    const user = useSelector(state=>state.user.user)

    useEffect(()=>{
        if (!user){
            console.log('no user')
            return
        }
        dispatch(fetchQuotes({token: user.token}))
    }, [user])

    if (!user){
        return (
            <h4>Please Login To View The Quotes Feed</h4>
        )
    }

    return (
        <>
            
            <Container>
                <h1 style={{textAlign: 'center'}}>Quotes Feed</h1>
                {quotes.map(quote=>(<Row key={quote._id}>
                    <Col>
                        <QuoteCard quote={quote} />
                    </Col>
                </Row>))}
            </Container>
        </>

    )
}

export default Feed
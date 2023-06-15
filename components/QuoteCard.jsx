import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { like } from '../redux/features/quoteSlice';

function QuoteCard({quote, quoteIndex}) {
  const user = useSelector(state=>state.user.user)
  const [liked, setLiked] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    if (!user){
      return
    }
    console.log(user.username)
    setLiked(quote.likes.includes(user.username))
  }, [user])

  const handleLike = async()=>{
    setLiked(!liked)
    dispatch(like({liked, token: user.token, quoteId: quote._id, username: user.username, quoteIndex}))
  }

  return (
    <Card style={{marginTop: '40px'}}>
      <Card.Header>Uploaded by {user.full_name} ({user.username})</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            {quote.body}
            {' '}
          </p>
          <footer className="blockquote-footer">
            <cite title="Source Title">{quote.author}</cite>
          </footer>
          <Card.Footer>
            {!liked && <Button onClick={handleLike} variant="outlined" startIcon={<ThumbUpAltIcon />}>Like</Button>}
            {liked && <Button onClick={handleLike} variant="contained" startIcon={<ThumbUpAltIcon />}>Unlike</Button>}
          </Card.Footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default QuoteCard;
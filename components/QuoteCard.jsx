import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function QuoteCard({quote}) {
  const user = useSelector(state=>state.user.user)
  const [liked, setLiked] = useState(false)

  useEffect(()=>{
    if (!user){
      return
    }
    setLiked(quote.likes.includes(user.username))
  }, [user])

  const handleLike = async()=>{
    if (liked) {
      setLiked(false)
      // asyncthunk function to remove like
    }
    else {
      setLiked(true)
      // async function to add like
    }
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
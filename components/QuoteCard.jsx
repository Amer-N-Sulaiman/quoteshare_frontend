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
  const [likesNum, setLikesNum] = useState(quote.likes.length)

  const [pleaseLoginPopup, setPleaseLoginPopup] = useState(false)

  useEffect(()=>{
    if (!user){
      return
    }
    console.log(user.username)
    setLiked(quote.likes.includes(user.username))
  }, [user])

  const handleLike = async()=>{
    if (!liked){
      setLikesNum(likesNum+1)
    } else {
      setLikesNum(likesNum-1)
    }
    setLiked(!liked)
    dispatch(like({liked, token: user.token, quoteId: quote._id, username: user.username, quoteIndex}))
  }

  return (
    <>
      {pleaseLoginPopup && <Alert variant="danger" onClose={() => setPleaseLoginPopup(false)} dismissible>
        <Alert.Heading>Please Login or Sign up to like</Alert.Heading>
      </Alert>}
      <Card style={{marginTop: '40px'}}>
        <Card.Header>Uploaded by {quote.full_name} ({quote.username})</Card.Header>
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
              {user && !liked && <Button style={{float: 'left', marginLeft: '30px', marginTop: '10px'}} onClick={handleLike} variant="outlined" startIcon={<ThumbUpAltIcon />}>Like</Button>}
              {user && liked && <Button style={{float: 'left', marginLeft: '30px', marginTop: '10px'}} onClick={handleLike} variant="contained" startIcon={<ThumbUpAltIcon />}>Unlike</Button>}
              {!user && <Button style={{float: 'left', marginLeft: '30px', marginTop: '10px'}} onClick={()=>setPleaseLoginPopup(true)} variant="outlined" startIcon={<ThumbUpAltIcon />}>Like</Button>}
              <Card.Text style={{float: 'left', marginLeft: '30px', marginTop: '10px'}}>Liked by {likesNum}</Card.Text>
            </Card.Footer>
          </blockquote>
        </Card.Body>
      </Card>
    </>
    
  );
}

export default QuoteCard;
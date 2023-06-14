import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';

function QuoteCard({quote}) {
  const user = useSelector(state=>state.user.user)
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
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default QuoteCard;
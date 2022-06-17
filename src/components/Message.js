import KeyMapper from "./KeyMapper";
import '../components/Array.css';

const Message = (props) => {
  const { 
    message,
    providerId,
    providerName,
    customerName
  } = props;

  const authorName = message.providerId == providerId ? `${providerName} (provider)` : `${customerName} (customer)`;

  return (
    <div className="itemDetails">
      <div className="data">
        <p>Author: {authorName}</p>
        <p>Sent at: {message.createdAt}</p>
        <p>Message: {message.content}</p>
      </div>
    </div>
  )
}

export default Message;
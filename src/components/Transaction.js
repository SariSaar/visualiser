import React from "react";
import '../components/Array.css';
import KeyMapper from "./KeyMapper";
import Message from "./Message";

const Transaction = (props) => {
  const { transaction } = props;

  return (
    <div className="arrayContainer">
      <div className="itemDetails">
        {Object.keys(transaction).map(key => (
          <KeyMapper item={transaction} attr={key} key={key} />
        ))}
      </div>
        {(!!transaction.customerReview || !!transaction.providerReview) && (
          <div>
        <h4>Reviews</h4>
          <div className="itemDetails">
          {!!transaction.customerReview && Object.keys(transaction.customerReview).map(key => (
            <KeyMapper item={transaction.customerReview} attr={key} key={key} />
          ))}
          {!!transaction.providerReview && Object.keys(transaction.providerReview).map(key => (
            <KeyMapper item={transaction.providerReview} attr={key} key={key} />
          ))}
        </div>
      </div>)
      }
      <h4>Messages</h4>
        {!!transaction.messages.length ? transaction.messages.map(msg => (
            <Message 
              message={msg}
              key={msg.id} 
              providerId={transaction.providerId}
              providerName={transaction.providerName}
              customerName={transaction.customerName}
            />
          )) : (<p>No messages in transaction</p>)}
    </div>
  )
}

export default Transaction;
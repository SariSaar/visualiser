import React, { useState } from "react";
import '../components/User.css';
import UserDetails from "./UserDetails";
import Listing from "./Listing";
import Transaction from "./Transaction";

/**
 * - Show user info
 *
 */


const User = (props) => {
  const {
    attributes,
    listings,
    customerTransactions,
    providerTransactions,
  } = props.user;

  // console.log({ customerTransactions: customerTransactions.length }, { customerTransactions })

  const user = props.user;

  const [ open, setOpen ] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  }

  return (
    <div className="item">
      <button onClick={toggleOpen}>Toggle user data</button>
      <div className="header">
        <p>
          { user.firstName } {user.lastName} ({user.listings.length} listing(s), {customerTransactions.length} customer transaction(s), {providerTransactions.length} provider transaction(s))</p>
      </div>
      {open && (
        <div className="drawer">
          <h2>User details</h2>
          <UserDetails user={user} />
          <h2>Listings</h2>
          {listings.map(listing => (
            <Listing listing={listing} key={listing.id} /> 
          ))}
          <h2>Customer transactions</h2>
          {customerTransactions.map(tx => (
            <Transaction transaction={tx} />
          ))}
          <h2>Provider transactions</h2>
          {providerTransactions.map(tx => (
            <Transaction transaction={tx} />
          ))}

      </div>
      )}
    </div>
  )
}

export default User;
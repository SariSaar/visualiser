import React, { useState } from "react";
import '../components/User.css';
import UserDetails from "./UserDetails";
import Listing from "./Listing";
import Transaction from "./Transaction";

const User = (props) => {
  const {
    attributes,
    listings,
    customerTransactions,
    providerTransactions,
  } = props.user;

  const user = props.user;

  const [ open, setOpen ] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  }

  const listingsViewer = (listings) => {
    return listings.length > 0 ? (
      listings.map(listing => (
        <Listing listing={listing} key={listing.id} /> 
      ))
    ) : (<p>No listings</p>)
  }

  const transactionsViewer = (transactions) => {
    return transactions.length > 0 ? (
      transactions.map(tx => (
        <Transaction transaction={tx} key={tx.id} />
      ))
    ) : (<p>No transactions</p>)
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
          {listingsViewer(listings)}
          <h2>Customer transactions</h2>
          {transactionsViewer(customerTransactions)}
          <h2>Provider transactions</h2>
          {transactionsViewer(providerTransactions)}

      </div>
      )}
    </div>
  )
}

export default User;
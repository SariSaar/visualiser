import React from "react";
import '../components/Array.css';
import KeyMapper from "./KeyMapper";


const Listing = (props) => {
 const { listing } = props;

 return (
   <div className="arrayContainer">
     <h3>{listing.title}</h3>
    <div className="itemDetails">
      {Object.keys(listing).map(attr => (
        <KeyMapper item={listing} attr={attr} key={attr} />
      ))}
    </div>
  </div>
 )
}

export default Listing;
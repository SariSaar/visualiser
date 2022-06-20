import React from "react";
import '../components/Array.css';
import KeyMapper from "./KeyMapper";
import Image from "./Image";


const Listing = (props) => {
 const { listing, images } = props;
 const listingImages = images.filter(img => listing.images.includes(img.name));

 return (
   <div className="arrayContainer">
     <h3>{listing.title}</h3>
    <div className="itemDetails">
      {Object.keys(listing).map(attr => (
        <KeyMapper item={listing} attr={attr} key={attr} />
      ))}
    </div>
    {listingImages.length > 0 && <h4>Images</h4>}
    <div className="itemDetails">
      {listingImages.map(img => (
        <Image image={img} key={img.name}/>
      ))}
    </div>
  </div>
 )
}

export default Listing;
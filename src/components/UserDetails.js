import React from "react";
import '../components/User.css';
import KeyMapper from "./KeyMapper";

const UserDetails = (props) => {
  const { user } = props;
  return (
    <div className="userDetails">
      {Object.keys(user).map(key => (
        <KeyMapper 
          item={user}
          attr={key}
          key={key}
        />
      ))}
    </div>
  )
}

export default UserDetails;
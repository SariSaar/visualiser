import React from "react";
import '../components/Array.css';

const KeyMapper = (props) => {
  const { item, attr } = props;
  // console.log({ props })

  return (
    <div>
    {typeof item[attr] === ('string') ?
    (
      <div className="data">
        <p>{attr}</p> <p>{item[attr]}</p>
        </div>
    ) : null}
  </div>
  )
}

export default KeyMapper;
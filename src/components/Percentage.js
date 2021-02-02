import React, { useState } from 'react';

const Percentage = () => {
  const [number, setNumber] = useState(0);

  return <div>{number}%</div>;
};

export default Percentage;

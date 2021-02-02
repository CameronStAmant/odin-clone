import Header from './HeaderFooter/Header';
import LessonCard from './Cards/LessonCard';
import React, { useState } from 'react';

const FoundationsCourse = () => {
  const [number, setNumber] = useState(0);
  const lessons = [
    'Get a computer',
    'Hop on Discord and introduce yourself',
    'Mark off lessons as you complete them',
    'Keep working',
    'And working',
  ];

  const plusMinus = (sign) => {
    if (sign === '+') {
      setNumber((prevNumber) => prevNumber + 1);
    } else {
      setNumber((prevNumber) => prevNumber - 1);
    }
  };

  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">Foundations course!</div>
        <div>{(number / lessons.length) * 100}%</div>
        <ol>
          <LessonCard
            name="Introduction"
            description="This is the start of the rest of your career!"
            lesson={lessons}
            changePercentage={(sign) => plusMinus(sign)}
          />
        </ol>
      </div>
    </div>
  );
};

export default FoundationsCourse;

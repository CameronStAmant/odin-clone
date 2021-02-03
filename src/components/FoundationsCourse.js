import Header from './HeaderFooter/Header';
import LessonCard from './Cards/LessonCard';
import React, { useState, useEffect } from 'react';
import { auth } from '../services/firebase';

const FoundationsCourse = () => {
  const [number, setNumber] = useState(0);
  const [isLoggedIn, setisLoggedIn] = useState(false);

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

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        if (isLoggedIn !== true) {
          setisLoggedIn(true);
        }
      } else {
        if (isLoggedIn !== false) {
          setisLoggedIn(false);
        }
      }
    });
  });

  return (
    <div>
      <Header />
      <div className="section">
        <div className="headerText">Foundations course!</div>

        {isLoggedIn && <div>{(number / lessons.length) * 100}%</div>}
        <ol>
          <LessonCard
            name="Introduction"
            description="This is the start of the rest of your career!"
            lesson={lessons}
            changePercentage={(sign) => plusMinus(sign)}
            isLoggedIn={isLoggedIn}
          />
        </ol>
      </div>
    </div>
  );
};

export default FoundationsCourse;

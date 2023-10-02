import React, { useState } from 'react';
import { getAudio } from '../../audioData';
import { ReactComponent as SoundSvg } from './sound.svg';

const Flashcard = ({ flashcard, imageURL }) => {
  const [flip, setFlip] = useState(false);
  const sound =
    getAudio(flashcard.korean) === null
      ? null
      : new Audio(require(`../../audios/words/${getAudio(flashcard.korean)}`));

  const playSound = (event) => {
    event.stopPropagation();
    sound.play();
  };

  return (
    <div className={`card${flip ? ' flip' : ''}`} onClick={() => setFlip(!flip)}>
      <div className='front'>
        <div className='content-container'>
          {imageURL && (
            <div className='image-preview'>
              <img src={imageURL} alt='Image Preview' />
            </div>
          )}
          <div className='content-wrapper'>
            <div className='content'>{flashcard.english}</div>
            {sound !== null && (
              <div className='sound' onClick={playSound}>
                <SoundSvg />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='back'>
        <div className='content-container'>
          <div className='content'>{flashcard.korean}</div>
          {sound !== null && (
            <div className='sound' onClick={playSound}>
              <SoundSvg />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;

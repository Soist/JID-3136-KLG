import React, { useState } from 'react';
import { getAudio } from '../../audioData';
import { ReactComponent as SoundSvg } from './sound.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Flashcard = ({ flashcard, imageURL, onDeleteFlashcard, isStarred, onToggleFavorite }) => {
  const [flip, setFlip] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const sound =
    getAudio(flashcard.korean) === null
      ? null
      : new Audio(require(`../../audios/words/${getAudio(flashcard.korean)}`));

  const playSound = (event) => {
    event.stopPropagation();
    sound.play();
  };

  const toggleFavorite = (event) => {
    event.stopPropagation();
    setIsFavorited(!isFavorited);
    
  };

  const toggleStar = (event) => {
    event.stopPropagation();
    onToggleFavorite(); 
  };

  const handleDelete = () => {
    if (flashcard.isUserAdded && window.confirm("Are you sure you want to delete this flashcard?")) {
      onDeleteFlashcard();
      console.log("Deleting Flashcard", flashcard);
    }
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
            <div className='star-icon' onClick={toggleStar}>
              {isStarred ? '⭐️' : '☆'}
            </div>
            {flashcard.isUserAdded && (
              <div className='delete-icon' onClick={handleDelete}>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                />
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
          <div className='star-icon' onClick={toggleStar}>
              {isStarred ? '⭐️' : '☆'}
            </div>
            {flashcard.isUserAdded && (
              <div className='delete-icon' onClick={handleDelete}>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;

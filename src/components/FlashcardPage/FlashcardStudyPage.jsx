import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getVocab } from '../../vocabData';
import Flashcard from './Flashcard';
import './FlashcardStudyPage.css';

function FlashcardStudyPage() {
  const location = useLocation();
  const unit = location.state;
  const initialCards = getVocab(unit.number);

  const [flashcards, setFlashcards] = useState(initialCards);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [koreanText, setKoreanText] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleAddFlashcard = () => {
    setIsModalVisible(true);
  };

  const handleKoreanTextChange = (e) => {
    setKoreanText(e.target.value);
  };

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleSaveFlashcard = () => {
    const newFlashcard = {
      korean: koreanText,
      image: imageURL,
    };
    setFlashcards([...flashcards, newFlashcard]);
    setIsModalVisible(false);
    setKoreanText('');
    setImageURL('');
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setKoreanText('');
    setImageURL('');
  };

  return (
    <div id="flashcard-container">
      {flashcards.map((flashcard, index) => (
        <Flashcard key={index} flashcard={flashcard} />
      ))}
      <div className="add-flashcard-button">
        <button onClick={handleAddFlashcard}>Add Flashcard</button>
      </div>
      {isModalVisible && (
        <div className="modal-popup">
          <div className="flashcard-modal">
            <h2>Add a Flashcard</h2>
            <label>
              Korean Text:
              <input
                type="text"
                value={koreanText}
                onChange={handleKoreanTextChange}
                required
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                value={imageURL}
                onChange={handleImageURLChange}
                required
              />
            </label>
            <div className="modal-buttons">
              <button onClick={handleSaveFlashcard}>Save</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlashcardStudyPage;
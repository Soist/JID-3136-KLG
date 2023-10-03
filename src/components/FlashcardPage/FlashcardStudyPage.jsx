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
  const [selectedFlashcardIndex, setSelectedFlashcardIndex] = useState(null);

  const handleAddFlashcard = (index) => {
    setSelectedFlashcardIndex(index);
    setIsModalVisible(true);
  };

  const handleKoreanTextChange = (e) => {
    setKoreanText(e.target.value);
  };

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageURL(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSaveFlashcard = () => {
    if (selectedFlashcardIndex !== null) {
      const updatedFlashcards = [...flashcards];
      updatedFlashcards[selectedFlashcardIndex] = {
        ...updatedFlashcards[selectedFlashcardIndex],
        korean: koreanText,
        image: imageURL,
      };
      setFlashcards(updatedFlashcards);
    } else {
      const newFlashcard = {
        korean: koreanText,
        image: imageURL,
      };
      setFlashcards([...flashcards, newFlashcard]);
    }

    setIsModalVisible(false);
    setKoreanText('');
    setImageURL('');
    setSelectedFlashcardIndex(null);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setKoreanText('');
    setImageURL('');
    setSelectedFlashcardIndex(null);
  };

  return (
    <div id='flashcard-container'>
      {flashcards.map((flashcard, index) => (
        <Flashcard
          key={index}
          flashcard={flashcard}
          imageURL={flashcard.image}
          onAddFlashcard={() => handleAddFlashcard(index)}
        />
      ))}
      <div className='add-flashcard-button'>
        <button onClick={() => handleAddFlashcard(null)}>Add Flashcard</button>
      </div>
      {isModalVisible && (
        <div className='modal-popup'>
          <div className='flashcard-modal'>
            <h2>{selectedFlashcardIndex !== null ? 'Edit' : 'Add'} Flashcard</h2>
            <div className='modal-content'>
              <label>
                Korean Text:
                <input
                  type='text'
                  value={koreanText}
                  onChange={handleKoreanTextChange}
                  required
                />
              </label>
              <div className="image-input-container">
                <label>
                  Image URL:
                  <input
                    type='text'
                    value={imageURL}
                    onChange={handleImageURLChange}
                    required
                  />
                </label>
                <label>
                  or Upload Image:
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <label>
                Image URL:
                <input
                  type='text'
                  value={imageURL}
                  onChange={handleImageURLChange}
                  required
                />
              </label>
              {imageURL && (
                <div className='image-preview'>
                  <img src={imageURL} alt='Image Preview' />
                </div>
              )}
            </div>
            <div className='modal-buttons'>
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

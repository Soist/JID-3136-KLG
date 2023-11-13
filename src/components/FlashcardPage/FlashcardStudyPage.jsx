import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getVocab } from '../../vocabData';
import Flashcard from './Flashcard';
import './FlashcardStudyPage.css';

function FlashcardStudyPage() {
  const location = useLocation();
  const unit = location.state;
  const initialCards = getVocab(unit.number);

  const [preExistingFlashcards, setPreExistingFlashcards] = useState(initialCards);
  const [userAddedFlashcards, setUserAddedFlashcards] = useState(() => {
    const localData = localStorage.getItem('userAddedFlashcards');
    return localData ? JSON.parse(localData) : [];
  });

  const [flashcards, setFlashcards] = useState(initialCards);
  const [favoriteFlashcards, setFavoriteFlashcards] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [koreanText, setKoreanText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [selectedFlashcardIndex, setSelectedFlashcardIndex] = useState(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  useEffect(() => {
    localStorage.setItem('userAddedFlashcards', JSON.stringify(userAddedFlashcards));
  }, [userAddedFlashcards]);


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

  const handleDelete = (index) => {
    if (index < preExistingFlashcards.length) {
      return;
    }
  
    const userAddedIndex = index - preExistingFlashcards.length;
    const updatedUserAddedFlashcards = [...userAddedFlashcards];
    updatedUserAddedFlashcards.splice(userAddedIndex, 1);
    setUserAddedFlashcards(updatedUserAddedFlashcards);
  };
  
  const handleToggleFavoritesFilter = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };

  const handleToggleFavorite = (index) => {
    const updatedFlashcards = [...flashcards];
    const toggledFlashcard = updatedFlashcards[index];

    toggledFlashcard.isStarred = !toggledFlashcard.isStarred;

    if (toggledFlashcard.isStarred) {
      setFavoriteFlashcards([...favoriteFlashcards, toggledFlashcard]);
    } else {
      const updatedFavorites = favoriteFlashcards.filter((favFlashcard) => favFlashcard !== toggledFlashcard);
      setFavoriteFlashcards(updatedFavorites);
    }

    setFlashcards(updatedFlashcards);
  };

  const filteredFlashcards = showFavoritesOnly
    ? flashcards.filter((flashcard) => flashcard.isStarred)
    : flashcards.filter((flashcard) => !showFavoritesOnly || flashcard.isStarred);


  const handleSaveFlashcard = () => {
    if (selectedFlashcardIndex !== null) {
      const updatedUserAddedFlashcards = [...userAddedFlashcards];
      updatedUserAddedFlashcards[selectedFlashcardIndex] = {
        ...updatedUserAddedFlashcards[selectedFlashcardIndex],
        korean: koreanText,
        image: imageURL,
      };
      setUserAddedFlashcards(updatedUserAddedFlashcards);
    } else {
      const newFlashcard = {
        korean: koreanText,
        image: imageURL,
        isUserAdded: true,
      };
      setUserAddedFlashcards([...userAddedFlashcards, newFlashcard]);
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
      <div className='filter-buttons'>
        <button onClick={handleToggleFavoritesFilter}>
          {showFavoritesOnly ? 'Show All' : 'Show Favorites Only'}
        </button>
      </div>
      {filteredFlashcards.map((flashcard, index) => (
        <Flashcard
          key={index}
          flashcard={flashcard}
          imageURL={flashcard.image}
          onDeleteFlashcard={() => handleDelete(index)}
          onToggleFavorite={() => handleToggleFavorite(index)}
          isStarred={flashcard.isStarred}
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

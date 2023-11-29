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
  const [mainPageUserAddedFlashcards, setMainPageUserAddedFlashcards] = useState(() => {
    const localData = localStorage.getItem('mainPageUserAddedFlashcards');
    return localData ? JSON.parse(localData) : [];
  });
  const [favoritesPageUserAddedFlashcards, setFavoritesPageUserAddedFlashcards] = useState(() => {
    const localData = localStorage.getItem('favoritesPageUserAddedFlashcards');
    return localData ? JSON.parse(localData) : [];
  });

  const [flashcards, setFlashcards] = useState(initialCards);
  const [favoriteFlashcards, setFavoriteFlashcards] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [koreanText, setKoreanText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [selectedFlashcardIndex, setSelectedFlashcardIndex] = useState(null);

  const [currentPage, setCurrentPage] = useState('main');
 
    
  useEffect(() => {
    localStorage.setItem('mainPageUserAddedFlashcards', JSON.stringify(mainPageUserAddedFlashcards));
    localStorage.setItem('favoritesPageUserAddedFlashcards', JSON.stringify(favoritesPageUserAddedFlashcards));
  }, [mainPageUserAddedFlashcards, favoritesPageUserAddedFlashcards]);

  const userAddedFlashcards = currentPage === 'main' ? mainPageUserAddedFlashcards : favoritesPageUserAddedFlashcards;

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
    const updatedUserAddedFlashcards = currentPage === 'main'
    ? [...mainPageUserAddedFlashcards]
    : [...favoritesPageUserAddedFlashcards];
  updatedUserAddedFlashcards.splice(userAddedIndex, 1);
  
  if (currentPage === 'main') {
    setMainPageUserAddedFlashcards(updatedUserAddedFlashcards);
  } else {
    setFavoritesPageUserAddedFlashcards(updatedUserAddedFlashcards);
  }
};

const handleToggleFavoritesFilter = () => {

  setCurrentPage('favorites');
};

const handleToggleFavorite = (index) => {
  const updatedFlashcards = [...flashcards];
  const toggledFlashcard = { ...updatedFlashcards[index] };

  toggledFlashcard.isStarred = !toggledFlashcard.isStarred;

  updatedFlashcards[index] = toggledFlashcard;
  setFlashcards(updatedFlashcards);

  if (toggledFlashcard.isStarred) {
    setFavoriteFlashcards((prevFavorites) => [...prevFavorites, toggledFlashcard]);
  } else {
    setFavoriteFlashcards((prevFavorites) =>
      prevFavorites.filter((favFlashcard) => favFlashcard !== toggledFlashcard)
    );
  }
};



const filteredFlashcards = [...preExistingFlashcards, ...userAddedFlashcards]
  .filter(flashcard => flashcard.unit === `unit${unit.number}` || !flashcard.unit);

    const handleSaveFlashcard = () => {
      if (selectedFlashcardIndex !== null) {
        const updatedUserAddedFlashcards = currentPage === 'main'
          ? [...mainPageUserAddedFlashcards]
          : [...favoritesPageUserAddedFlashcards];
        updatedUserAddedFlashcards[selectedFlashcardIndex] = {
          ...updatedUserAddedFlashcards[selectedFlashcardIndex],
          korean: koreanText,
          image: imageURL,
        };
   
        if (currentPage === 'main') {
          setMainPageUserAddedFlashcards(updatedUserAddedFlashcards);
        } else {
          setFavoritesPageUserAddedFlashcards(updatedUserAddedFlashcards);
        }
      } else {
        const newFlashcard = {
          korean: koreanText,
          image: imageURL,
          isUserAdded: true,
          isStarred: false,
          unit: `unit${unit.number}`,
        };
    
        if (currentPage === 'main') {
          setMainPageUserAddedFlashcards([...mainPageUserAddedFlashcards, newFlashcard]);
        } else {
          setFavoritesPageUserAddedFlashcards([...favoritesPageUserAddedFlashcards, newFlashcard]);
        }
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

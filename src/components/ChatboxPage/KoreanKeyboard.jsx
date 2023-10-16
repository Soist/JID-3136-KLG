import React, { useState } from 'react';

function KoreanKeyboard({ onCharacterClick }) {
  const koreanCharacters = ['ㄱ', 'ㄴ', 'ㄷ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ'];

  return (
    <div className="korean-keyboard">
      {koreanCharacters.map((char, index) => (
        <button key={index} onClick={() => onCharacterClick(char)}>
          {char}
        </button>
      ))}
    </div>
  );
}

export default KoreanKeyboard;

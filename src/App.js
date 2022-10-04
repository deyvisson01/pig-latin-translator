import React, { useState } from 'react';
import './App.css';

function App() {

  const [sentenceInput, setSentenceInput] = useState('');
  const [sentenceInputResult, setSentenceInputResult] = useState('Output');

  const punctuations = [',','.','?','!','(',')'];
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','u','v','w','x','y','z'];
  const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'z'];

  function returnHasConsonants(word) {
    for (let i = 0; i < word.length; i++) {
      let letter = word.charAt(i).toLowerCase()
      if (consonants.includes(letter)) {
        return true
      }
    }
    return false
  }

  function returnNoLettler(word) {
    let count = 0
    for (let i = 0; i < word.length; i++) {
      let letter = word.charAt(i).toLowerCase()
      if (alphabet.includes(letter)) {
        count++
      }
    }
    return (count === 0)
  }

  function returnHasSymbol(word) {
    return (punctuations.includes(word.charAt(word.length-1)))
  }

  function verifyUpperCase(word) {
    let letter = word.charAt(0)
    return (letter === letter.toUpperCase())
  }

  function returnPrefix(word) {
    let aux = ''
    for (let i = 0; i <= word.length; i++) {
      let letter = word.charAt(i).toLowerCase()
      if (consonants.includes(letter)) {
        aux = aux + letter
      } else {
        let steam = word.slice(i)
        return steam+aux
      }
    }
  }

  function translateWord(word) {
    let aux = returnPrefix(word)
    return (returnHasConsonants(word)) ? aux + 'ay' : aux + 'yay'
  }

  function formWord(word) {
    if (returnNoLettler(word)) {
      return word
    }
    let finalWord = translateWord(returnHasSymbol(word) ? word.slice(0,-1) : word)
    
    if (verifyUpperCase(word)) {
      let auxWord = finalWord.slice(1)
      auxWord = finalWord.charAt(0).toUpperCase() + auxWord
      finalWord = auxWord
    }

    if (returnHasSymbol(word)) {
      finalWord = finalWord+word.charAt(word.length-1)
    }
    return finalWord
  }

  function splitSentence(sentence) {
    let arraySentence = sentence.split(' ')
    let resulteSentence = ''

    arraySentence.map((word) => {
      resulteSentence = resulteSentence+formWord(word)+' '
    })

    setSentenceInputResult(resulteSentence)
  }

  function translateByInput(sentenceInput) {
    splitSentence(sentenceInput)
  }

  return (
    <div className='App'>
      <div className='App-header'>
        <p> Translate test! </p>
        <span> Rules: </span>
        <div className='rulesWrap'>
          <span> 1. If a word has no letters, don't translate it. </span>
          <span> 2. All punctuation should be preserved.</span>
          <span> 3. If the word begins with a capital letter, then the translated word should too. </span>
          <span> 4. Separate each word into two parts. The first part is called the “prefix” and extends from the beginning
  of the word up to, but not including, the first vowel. (The letter “y” will be considered a
  vowel.) The Rest of the word is called the “stem.” </span>
          <span> 5. The translated text is formed by reversing the order of the prefix and stem and adding the
  letters “ay” to the end. For example, “sandwich” is composed of “s” + “andwich” + “ay” +
  “.” and would translate to “andwichsay.” </span>
          <span> 6. If the word contains no consonants, let the prefix be empty and the word be the stem.
  The word ending should be “yay” instead of merely “ay.” For example, “I” would be
  “Iyay.” </span>
        </div>

        <p>
        Enter the sentence and click to translate.
        </p>

        <input
          type='text'
          onChange={(e) => setSentenceInput(e.target.value)}
        >
        </input>

        <p>{sentenceInputResult}</p>

        <button onClick={()=>translateByInput(sentenceInput)}>
          Translate
        </button>
        
      </div>
    </div>
  );
}

export default App;

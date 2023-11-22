const MAX = {
    LETTERS_PER_ROW: 5,
    ATTEMPTS: 6
}

const KEY = {
    BACKSPACE: 'Backspace',
    ENTER: 'Enter',
    DELETE: 'Delete'
}

const GRAY_COLOR_HEXADECIMAL = '#585858'
const YELLOW_COLOR_HEXADECIMAL = '#B59F3B'
const GREEN_COLOR_HEXADECIMAL = '#538D4E'

const NOTIFICATION = {
    DISPLAY_LETTER_SUCCESSFULLY: 'Showing letter with success',
    BACKSPACE_KEY_PRESSED: 'Backspace key pressed',
    BACKSPACE_WHEN_EMPTY_GUESS: 'Could not erase when is an empty guess',
    ENTER_KEY_PRESSED: 'Enter key pressed',
    EMPTY_GUESS: 'Empty guess',
    INCOMPLETE_GUESS: 'Incomplete guess',
    INVALID_PRESSED_KEY: 'Invalid Pressed Key',
    REACH_MAX_ATTEMPTS: 'Reach Max Attempts',
    REACH_MAX_LETTERS_PER_ROW: 'Reach Max letter per row',
    WORD_NOT_IN_DATABASE: 'Word not in database',
    GAME_OVER_GUESS_RIGHT: 'Parabéns! Você acertou a palavra'

}

const gameInitialConfig = {
    database: [],
    currentRow: 1,
    currentLetterPosition: 1,
    currentGuess: '',
    rightGuess: ''
}



const getGameBoardLetter = (currentRow, currentLetterPosition) => {
    return document.querySelector(`.jogo .linha-${currentRow} .letra-${currentLetterPosition}`)
}

const isBackspaceKeyPressed = (pressedKey) => {
    return [KEY.BACKSPACE, KEY.DELETE].includes(pressedKey)
}

const isEnterKeyPressed = (pressedKey) => {
    return pressedKey === KEY.ENTER
}

const isOneAlphabeticLetter = (pressedKey) => {
    return pressedKey.length === 1 && /[A-Za-z]/.test(pressedKey)
}

const isValidKeyPressed = (pressedKey) => {
    return isEnterKeyPressed(pressedKey)
        || isBackspaceKeyPressed(pressedKey)
        || isOneAlphabeticLetter(pressedKey)
}

const isGuessInDatabase = (guess, database) => {
    return database.includes(guess.toLowerCase())
}

const isCurrentGuessEmpty = (currentGuess) => {
    return currentGuess === ''
}

const reachMaxLetterPerRow = (currentLetterPosition) => {
    return currentLetterPosition > MAX.LETTERS_PER_ROW
}

const reachMaxAttempts = (currentRow) => {
    return currentRow > MAX.ATTEMPTS
}

const removeLastLetter = (currentGuess) => {
    return currentGuess.slice(0, currentGuess.length - 1)
}

const removeLetterFromBoard = (game) => {
    const { currentGuess, currentRow, currentLetterPosition } = game

    game.currentGuess = removeLastLetter(currentGuess)
    game.currentLetterPosition--

    const element = getGameBoardLetter(currentRow, currentLetterPosition - 1)
    element.textContent = ''

    return NOTIFICATION.BACKSPACE_KEY_PRESSED
}

const displayLetterOnTheBoard = (game, pressedKey) => {
    const { currentRow, currentLetterPosition } = game

    const element = getGameBoardLetter(currentRow, currentLetterPosition)
    element.textContent = pressedKey

    game.currentGuess += pressedKey
    game.currentLetterPosition++

    return NOTIFICATION.DISPLAY_LETTER_SUCCESSFULLY
}

const nextGuess = (game) => {
    game.currentRow++
    game.currentGuess = ''
    game.currentLetterPosition = 1

    return NOTIFICATION.ENTER_KEY_PRESSED
}

const checkGuess = (game) => {
    const { database, currentLetterPosition, currentGuess, rightGuess } = game

    if (isCurrentGuessEmpty(currentGuess)) {
        return NOTIFICATION.EMPTY_GUESS
    }

    if (!reachMaxLetterPerRow(currentLetterPosition)) {
        return NOTIFICATION.INCOMPLETE_GUESS
    }

    if (!isGuessInDatabase(currentGuess, database)) {
        return NOTIFICATION.WORD_NOT_IN_DATABASE
    }

    if (isCorrectGuess(currentGuess, rightGuess)) {
        displayColor(game)
        setTimeout(() => alert(NOTIFICATION.GAME_OVER_GUESS_RIGHT), 250)
        return NOTIFICATION.GAME_OVER_GUESS_RIGHT
    }

    displayColor(game)

    return nextGuess(game)
}

const onKeyPressed = (pressedKey, game) => {
    const { currentLetterPosition, currentGuess, currentRow } = game

    if (reachMaxAttempts(currentRow)) {
        return NOTIFICATION.REACH_MAX_ATTEMPTS
    }

    if (!isValidKeyPressed(pressedKey)) {
        return NOTIFICATION.INVALID_PRESSED_KEY
    }

    if (isBackspaceKeyPressed(pressedKey) && !isCurrentGuessEmpty(currentGuess)) {
        return removeLetterFromBoard(game)
    }

    if (isBackspaceKeyPressed(pressedKey) && isCurrentGuessEmpty(currentGuess)) {
        return NOTIFICATION.BACKSPACE_WHEN_EMPTY_GUESS
    }

    if (isEnterKeyPressed(pressedKey)) {
        return checkGuess(game)
    }

    if (reachMaxLetterPerRow(currentLetterPosition)) {
        return NOTIFICATION.REACH_MAX_LETTERS_PER_ROW
    }

    return displayLetterOnTheBoard(game, pressedKey)
}


const getOneRandomWord = (wordsList) => {
    const countWords = wordsList.length
    const shuffleIndex = Math.floor(Math.random() * countWords)
    return wordsList[shuffleIndex]
}

const isTestEnviroment = () => {
    return typeof process !== 'undefined'
            && process.env.NODE_ENV === 'test'
}

const loadWords = async () => {
    return fetch('/resouces/assets/json/database.json')
                    .then((response) => response.json())
                    .then(({ words }) => words)
                    .catch(() => [])
}

//Dia 4

const isCorrectGuess = (currentGuess, rightGuess) => {
    return rightGuess === currentGuess
}

const isLetterInRightGuess = (letter, rightGuess) => {
    const letterPosition = rightGuess.indexOf(letter)
    return letterPosition > -1
}

const isLettersEqualsInSamePosition = (position, currentGuess, rightGuess) => {
    return currentGuess[position] === rightGuess[position]
}

const applyColor = (element, color) => {
    element.style.backgroundColor = color
}

const displayColor = (game) => {
    const { currentGuess, currentRow, rightGuess } = game

    const row = document.querySelector(`.linha-${currentRow}`)

    for (let position = 0; position < currentGuess.length; position++) {
        const box = row.querySelector(`.letra-${position+1}`)
        const letter = currentGuess[position]

        if (!isLetterInRightGuess(letter, rightGuess)) {
            applyColor(box, GRAY_COLOR_HEXADECIMAL)
            continue
        }

        if (isLettersEqualsInSamePosition(position, currentGuess, rightGuess)) {
            applyColor(box, GREEN_COLOR_HEXADECIMAL)
            continue
        }

        applyColor(box, YELLOW_COLOR_HEXADECIMAL)
    }
}

const start = () => {
    if (isTestEnviroment()) {
        module.exports = {
            checkGuess,
            nextGuess,
            displayColor,
            displayLetterOnTheBoard,
            removeLetterFromBoard,
            removeLastLetter,
            getOneRandomWord,
            isBackspaceKeyPressed,
            isCorrectGuess,
            isCurrentGuessEmpty,
            isGuessInDatabase,
            isEnterKeyPressed,
            isLettersEqualsInSamePosition,
            isLetterInRightGuess,
            isValidKeyPressed,
            isTestEnviroment,
            loadWords,
            onKeyPressed,
            reachMaxAttempts,
            reachMaxLetterPerRow
        }

        return
    }

    window.onload = async () => {
        const database = await loadWords()
        const rightGuess = getOneRandomWord(database)

        const game = { ...gameInitialConfig, database, rightGuess }
        console.log(database)
        console.log('get one random word: ', rightGuess)

        document.addEventListener('keydown', (event) => onKeyPressed(event.key, game))
    }
}

start()

































// const loadWords = async () => {
//     try {
//         const response = await fetch('resouces/assets/json/database.json');
//         if (!response.ok) {
//             throw new Error('Failed to fetch words');
//         }
//         const data = await response.json();
//         console.log('Dados carregados:', data);
//         return data.words || [];
//     } catch (error) {
//         console.error('Error fetching words:', error.message);
//         return [];
//     }
// }

// const isTestEnviroment = () => {
//     return typeof process !== 'undefined'
//         && process.env.NODE_ENV === 'test'
// }

// const getRandomWord = async () => {
//     const words = await loadWords();
//     const randomIndex = Math.floor(Math.random() * words.length);
//     const randomWord = words[randomIndex];
//     return randomWord;
// }

// document.addEventListener('DOMContentLoaded', async () => {
//     const palavraAleatoria = await getRandomWord();
//     console.log('Palavra aleatória:', palavraAleatoria);
// });

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

const start = () => {
    if (isTestEnviroment()) {
        module.exports = {
            getOneRandomWord,
            isTestEnviroment,
            loadWords
        }

        return
    }

    window.onload = async () => {
        const database = await loadWords()
        console.log(database)
        console.log('get one random word: ', getOneRandomWord(database))
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

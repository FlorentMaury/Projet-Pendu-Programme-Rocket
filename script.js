// Initialisation des variables :

let userLetter, hangman, wordButton, letterButton, alertMessageLetter, alertMessageWord, restartButton, userWord, userInput, wordToFind, shortcutButton, userWordForm, wordToFindInArray, hiddenWord;
let last   = 0;
let score  = 0;
let hidden = true;




  // Tableau contenant la liste des mots du jeux :

const words = [
    'PETUNIA', 'HOROSCOPE', 'TAMBOURIN', 'CONQUISTADOR', 'DIAPASON', 'BROUHAHA',
    'ICEBERG', 'AVALANCHE', 'BILBOQUET', 'CORNEMUSE', 'BELIEVEMY', 'CHIMPANZE'
    ];



    // Récupération des élèments HTML sur le JavaScript :

hangman        = document.querySelector('#hangman');
hiddenWord     = document.querySelector('#hiddenWord');
userLetter     = document.querySelector('#userLetter');
userWord       = document.querySelector('#userWord');
letterButton   = document.querySelector('#letterButton');
wordButton     = document.querySelector('#wordButton');
userInput      = document.querySelector('#userInput'); 
restartButton     = document.querySelector('#restartButton');
shortcutButton     = document.querySelector('#shortcutButton');
userWordForm       = document.querySelector('#userWordForm');
alertMessageLetter = document.querySelector('#alertMessageLetter');
alertMessageWord   = document.querySelector('#alertMessageWord');




    // Création de l'interface pour le début de partie :

hangman.innerHTML                = `<img src="img/hangman${score++}.jpg" alt="Image du pendu">`;
alertMessageLetter.style.display = 'none';
alertMessageWord.style.display   = 'none';
userWordForm.style.display       = 'none';
restartButton.style.display      = 'none';

    
    
        // Sortie d'un des mots du tableau 'words' aléatoirement :
    
    function randomWord() {
    
        do {
            wordToFind = words[Math.floor(Math.random() * words.length)];
        } while (words.indexOf(wordToFind) === words[last]);
    
        last = words.indexOf(wordToFind); 
    
        hiddenWord.textContent = wordToFind.slice().replaceAll(/[A-Z]/g, '_');
    }
    
    

        // Fonction de lancement de la partie :
    
    function newGame() {   
    
        randomWord();

        console.log(wordToFind);
    
        wordToFindInArray = wordToFind.split('');

        for (let i = 0; i < wordToFind.length; i++) {
            wordToFindInArray[i] = "_";
        };
    
        letterButton.addEventListener('click', () => {
    
            if (wordToFind.includes(userLetter.value.toUpperCase())) {

                for (let j = 0; j < wordToFind.length; j++) {
                    if (wordToFind[j] === userLetter.value.toUpperCase()) {
                        wordToFindInArray[j] = userLetter.value.toUpperCase();
                    }
                };

                hiddenWord.textContent = wordToFindInArray.join('');

            } else {

                hangman.innerHTML = `<img src="img/hangman${score++}.jpg" alt="Image du pendu">`;

                if (score == 7) {
                    userInput.style.display = 'none';
                    hiddenWord.textContent  = wordToFind;
                    hiddenWord.prepend(textContent   = 'Le mot était :');
                    restartButton.style.display      = 'block';
                }
            }
        });
    


        wordButton.addEventListener('click', () => {
    
            if (wordToFind == userWord.value.toUpperCase()) {
                userInput.style.display = 'none';
                hiddenWord.textContent  = wordToFind;
                hiddenWord.prepend(textContent   = 'Félicitations, vous avez trouvé : ');
                restartButton.style.display      = 'block';
            } else {
                hangman.innerHTML = `<img src="img/hangman${score++}.jpg" alt="Image du pendu">`;
                if (score == 7) {
                    userInput.style.display = 'none';
                    hiddenWord.textContent  = wordToFind;
                    hiddenWord.prepend(textContent   = 'Le mot était :');
                    restartButton.style.display      = 'block';
                }
            }
        });
    }
    



        // Création du bouton masqué si l'utilisateur pense connaître le mot :

    shortcutButton.addEventListener('click', () => {

        if (hidden) {
            userWordForm.style.display = 'block';
            shortcutButton.textContent = 'Finalement... peut-être pas !';
            hidden = false;
            
        } else {
            shortcutButton.textContent = `J'ai trouvé le mot !`;
            userWordForm.style.display = 'none';
            hidden = true;
        }
    });

    
    

        // Message d'alerte si l'utilisateur rentre un nombre plutôt qu'une lettre :
    
    userLetter.addEventListener('keyup', () => {
        if (isNaN(userLetter.value) || userLetter.value !== '') { 
            alertMessageLetter.style.display = 'none';
        } else {
            alertMessageLetter.style.display = 'block';
        }
    });


        // Message d'alerte si l'utilisateur rentre un nombre plutôt qu'un mot :
    
    userWord.addEventListener('keyup', () => {
         if (isNaN(userWord.value) || userWord.value !== '') { 
            alertMessageWord.style.display = 'none';
         } else {
             alertMessageWord.style.display = 'block';        
         }
    });


                // Appel de la fonction de début de partie :


                newGame();
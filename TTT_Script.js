
// GAME CONTROLLER - MODULE ----------------------------------------------------------------------------

const gameBoard = (() => {
    const newGameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',];

    const checkGameWin = (boardArr) => {
        if (_checkBoard(boardArr, 'X')) return 'Cross Wins!';
        if (_checkBoard(boardArr, 'O')) return 'Circle Wins!';
        return false;
    }
    const htmlBoardToArray = (elementCollection) => {
        var newBoard = [];
        for(var i = 0; i < elementCollection.length; i++) {
            newBoard.push(elementCollection[i].textContent);
        };
        return newBoard;
    }

    function _checkBoard(board, token) {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];
        for(let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (board[a] === token && board[b] === token && board[c] === token) {
                return true;
            }
        }
        return false;
    }

    return {
        newGameBoard,
        htmlBoardToArray,
        checkGameWin
    };
})();


// DISPLAY CONTROLLER - MODULE ----------------------------------------------------------------------------

const displayController = (() => {

    const clearBoard = () => {
        gameArea.innerHTML = '';
    };

    const _display = () => {
        const gameArea = document.getElementById('gameArea');
        gameArea.innerHTML = '';
        gameBoard.newGameBoard.forEach(sqrValue => {
            sqr = document.createElement('div');
            sqr.classList.add("gameSqr");
            sqr.id = 'sqrAvail';
            sqr.textContent = sqrValue;
            gameArea.appendChild(sqr);
        })
    };

    const _addToGameHistory = (finalBoardArr) => {
        const gameHistoryArea = document.getElementById('gameHistory'); 
        const recentGame = document.createElement('div');
        recentGame.classList.add('hGame');
        gameHistoryArea.appendChild(recentGame);
        finalBoardArr.forEach(sqrValue => {
            sqr = document.createElement('div');
            sqr.classList.add("hGameSqr");
            sqr.textContent = sqrValue;
            recentGame.appendChild(sqr);
        });
    }

    const _placeToken = (square, token) => {
        if (square.textContent == " ") square.textContent = token;
        square.id = 'notAvail';
    }
    
    const _playTwoPlayer = () => {
        let moves = 0;
        const gameSqrs = document.querySelectorAll('.gameSqr');
        for(var i = 0; i < gameSqrs.length; i++) {
            gameSqrs[i].addEventListener("click", function playerMove(e, token) {
                moves % 2 == 0 ? token = 'O' : token = 'X';
                _placeToken(this, token);
                moves++;
                let gameArr = gameBoard.htmlBoardToArray(gameSqrs);
                let playerWin = gameBoard.checkGameWin(gameArr)
                if(playerWin !== false) return _boardMessage(playerWin, gameArr);
                if(moves == 9) return _boardMessage('Tie Game', gameArr);
                this.removeEventListener("click", playerMove);
            });            
        };  
    }

    function _boardMessage(Message, gameArr){
        const gameArea = document.getElementById('gameArea');
        gameArea.innerHTML = '';
        const endGame = document.createElement('div');
        endGame.classList.add("gameEnd");
        endGame.textContent = `${Message}`
        gameArea.appendChild(endGame);
        _addToGameHistory(gameArr);
    }

    const playGame = () => {
        _display();
        _playTwoPlayer();
    }

    return {
        playGame,
        clearBoard,
    }
})();

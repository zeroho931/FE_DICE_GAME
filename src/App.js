import React, { useState } from "react";
import "./App.css";

function App() {
  const [player1, setPlayer1] = useState({ totalScore: 0, currentScore: 0 });
  const [player2, setPlayer2] = useState({ totalScore: 0, currentScore: 0 });
  const [currentPlayer, setCurrentPlayer] = useState(1); // Player 1이면 1, Player 2이면 2
  const [gameOver, setGameOver] = useState(false);
  const [diceValue, setDiceValue] = useState(null);

  const handleNewGame = () => {
    setPlayer1({ totalScore: 0, currentScore: 0 });
    setPlayer2({ totalScore: 0, currentScore: 0 });
    setCurrentPlayer(1);
    setGameOver(false);
    setDiceValue(null); // 새 게임 시작 시 주사위 값 초기화
  };

  const rollDice = () => {
    if (gameOver) return;
    const diceNumber = Math.floor(Math.random() * 6) + 1; // 1부터 6까지의 랜덤 숫자 생성
    setDiceValue(diceNumber); // 주사위 값 설정
    if (diceNumber === 1 || diceNumber === 2) {
      // 주사위 숫자가 1 또는 2인 경우
      if (currentPlayer === 1) {
        setPlayer1((prevPlayer1) => ({ ...prevPlayer1, currentScore: 0 }));
        setCurrentPlayer(2); // 플레이어 변경
      } else {
        setPlayer2((prevPlayer2) => ({ ...prevPlayer2, currentScore: 0 }));
        setCurrentPlayer(1); // 플레이어 변경
      }
    } else {
      // 주사위 숫자가 3부터 6인 경우
      const newScore =
        currentPlayer === 1
          ? player1.currentScore + diceNumber
          : player2.currentScore + diceNumber;
      if (currentPlayer === 1) {
        setPlayer1((prevPlayer1) => ({
          ...prevPlayer1,
          currentScore: newScore,
        }));
      } else {
        setPlayer2((prevPlayer2) => ({
          ...prevPlayer2,
          currentScore: newScore,
        }));
      }
    }
  };

  const hold = () => {
    if (gameOver) return;
    if (currentPlayer === 1) {
      setPlayer1((prevPlayer1) => ({
        totalScore: prevPlayer1.totalScore + prevPlayer1.currentScore,
        currentScore: 0,
      }));
      if (player1.totalScore + player1.currentScore >= 50) {
        setGameOver(true);
      } else {
        setCurrentPlayer(2); // 플레이어 변경
      }
    } else {
      setPlayer2((prevPlayer2) => ({
        totalScore: prevPlayer2.totalScore + prevPlayer2.currentScore,
        currentScore: 0,
      }));
      if (player2.totalScore + player2.currentScore >= 50) {
        setGameOver(true);
      } else {
        setCurrentPlayer(1); // 플레이어 변경
      }
    }
  };

  return (
    <div className="App">
      <div className="background"></div>
      <div className="wrapper">
        <div
          className={`player player1${currentPlayer === 1 ? " active" : ""}`}
        >
          <div className="player-name">PLAYER 1</div>
          <div className="player-score">
            <div className="player-total-score">
              Total Score: {player1.totalScore}
            </div>
            <div className="player-current-score">
              Current Score: {player1.currentScore}
            </div>
          </div>
        </div>
        <div className="game-controls">
          <button className="btn-new" onClick={handleNewGame}>
            NEW GAME
          </button>
          <button className="btn-roll" onClick={rollDice}>
            ROLL DICE
          </button>
          <button className="btn-hold" onClick={hold}>
            HOLD
          </button>
        </div>
        <div className="dice">
          {diceValue && (
            <div className="dice-face">
              {diceValue === 1 && <span className="dot"></span>}
              {diceValue === 2 && (
                <>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </>
              )}
              {diceValue === 3 && (
                <>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </>
              )}
              {diceValue === 4 && (
                <>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </>
              )}
              {diceValue === 5 && (
                <>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </>
              )}
              {diceValue === 6 && (
                <>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </>
              )}
            </div>
          )}
        </div>
        <div
          className={`player player2${currentPlayer === 2 ? " active" : ""}`}
        >
          <div className="player-name">PLAYER 2</div>
          <div className="player-score">
            <div className="player-total-score">
              Total Score: {player2.totalScore}
            </div>
            <div className="player-current-score">
              Current Score: {player2.currentScore}
            </div>
          </div>
        </div>
        {gameOver && (
          <div className="game-over">
            Game Over! Player {player1.totalScore >= 50 ? "1" : "2"} Wins!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

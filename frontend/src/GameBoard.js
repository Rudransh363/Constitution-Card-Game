import React, { useState, useEffect } from 'react';
import Card from './Card';
import './GameBoard.css';

const GameBoard = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/cards')
            .then(response => response.json())
            .then(data => {
                setCards(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const questionCards = cards.filter(card => card.type === 'question');
    const answerCards = cards.filter(card => card.type === 'answer');

    return (
        <div className="game-board">
            <div className="question-section">
                {questionCards.map((card, index) => (
                    <Card key={index} content={card.content} type="question" />
                ))}
            </div>
            <div className="answer-section">
                {answerCards.map((card, index) => (
                    <Card key={index} content={card.content} type="answer" />
                ))}
            </div>
        </div>
    );
};

export default GameBoard;

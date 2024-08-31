import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './Card.css';

const Card = ({ content, type }) => {
    const [flipped, setFlipped] = useState(false);

    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `rotateY(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    });

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    return (
        <div className="card-container" onClick={handleFlip}>
            <animated.div
                className="card front"
                style={{ opacity: opacity.to(o => 1 - o), transform }}
            >
                {type === 'question' ? "Question: " : "Answer: "} {content}
            </animated.div>
            <animated.div
                className="card back"
                style={{ opacity, transform: transform.to(t => `${t} rotateY(180deg)`) }}
            >
                {type === 'question' ? "Answer Here" : "True/False?"}
            </animated.div>
        </div>
    );
};

export default Card;
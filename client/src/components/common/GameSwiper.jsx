import React, { useRef, useState, useEffect } from "react";
import InteractionIcons from "./InteractionIcons";
import "./GameSwiper.css";

export default function GameSwiper({ gameState, onSwipe }) {
  const containerRef = useRef(null);
  const slotRefs = useRef([React.createRef(), React.createRef(), React.createRef()]);

  const [slots, setSlots] = useState([
    gameState.prev,
    gameState.current,
    gameState.next
  ]);
  const [position, setPosition] = useState(1); // center index
  const [isAnimating, setIsAnimating] = useState(false);

  const touchStartY = useRef(0);
  const deltaY = useRef(0);

  useEffect(() => {
    setSlots([gameState.prev, gameState.current, gameState.next]);
  }, [gameState]);

  const handleTouchStart = (e) => {
    if (isAnimating) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (isAnimating || touchStartY.current === null) return;
    deltaY.current = e.touches[0].clientY - touchStartY.current;
    updateSlotTransforms(deltaY.current);
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;

    const threshold = window.innerHeight / 2;
    const direction = deltaY.current < 0 ? "up" : "down";

    if (Math.abs(deltaY.current) > threshold) {
      setIsAnimating(true);
      animateSlide(direction);
    } else {
      // snap back
      animateSlide("reset");
    }
    touchStartY.current = 0;
    deltaY.current = 0;
  };

  const updateSlotTransforms = (offsetY) => {
    slotRefs.current.forEach((ref, i) => {
      const yOffset = (i - position) * window.innerHeight + offsetY;
      if (ref.current) ref.current.style.transform = `translateY(${yOffset}px)`;
    });
  };

  const animateSlide = (direction) => {
    if (direction === "reset") {
      slotRefs.current.forEach((ref, i) => {
        const yOffset = (i - position) * window.innerHeight;
        if (ref.current) {
          ref.current.style.transition = "transform 0.3s ease";
          ref.current.style.transform = `translateY(${yOffset}px)`;
        }
      });
      return;
    }

    const delta = direction === "up" ? -1 : 1;
    const newPosition = position + delta;

    // Animate to new position
    slotRefs.current.forEach((ref, i) => {
      const yOffset = (i - newPosition) * window.innerHeight;
      if (ref.current) {
        ref.current.style.transition = "transform 0.3s ease";
        ref.current.style.transform = `translateY(${yOffset}px)`;
      }
    });

    onSwipe(direction);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  useEffect(() => {
    // After new gameState arrives, reset slot transforms
    slotRefs.current.forEach((ref, i) => {
      const yOffset = (i - 1) * window.innerHeight;
      if (ref.current) {
        ref.current.style.transition = "none";
        ref.current.style.transform = `translateY(${yOffset}px)`;
      }
    });
    setPosition(1); // Always keep current game in center
  }, [slots]);

  const renderSlot = (game, index) => {
    if (!game) return null;
    return (
      <div
        key={game.id || index}
        ref={slotRefs.current[index]}
        className="game-slot"
        style={{ transform: `translateY(${(index - position) * 100}vh)` }}
      >
        <div
          className="game-card"
          style={{ backgroundImage: `url(${game.thumbnail_url})` }}
        >
          <div className="game-info">
            <button id="play-button">▶ Play</button>
            <InteractionIcons
              userId={window.USER_CONFIG?.USER_ID}
              gameId={game.id}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="swiper-container"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slots.map((game, idx) => renderSlot(game, idx))}
    </div>
  );
}

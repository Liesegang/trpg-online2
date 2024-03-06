'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { scaleAtom } from '../Store';
import { useAtom } from 'jotai';

interface PanZoomProps {
  children: React.ReactNode;
}

const RoomWrapper: React.FC<PanZoomProps> = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useAtom(scaleAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const origPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    startPos.current = { x: event.clientX, y: event.clientY };
    origPos.current = { x: position.x, y: position.y };

    const handleMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const dx = event.clientX - startPos.current.x;
      const dy = event.clientY - startPos.current.y;
      setPosition({
        x: origPos.current.x + dx,
        y: origPos.current.y + dy,
      });
    };

    const handleMouseUp = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp, { once: true });
  }, [position]);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const rect = wrapperRef.current?.getBoundingClientRect() || { left: 0, top: 0 };
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const scaleAdjust = scale * Math.pow(0.8, event.deltaY / 100);
    const newScale = Math.min(Math.max(0.1, scaleAdjust), 10);

    const newPosX = mouseX - (mouseX - position.x) * (newScale / scale);
    const newPosY = mouseY - (mouseY - position.y) * (newScale / scale);

    setScale(newScale);
    setPosition({ x: newPosX, y: newPosY });
  }, [scale, setScale, position]);

  useEffect(() => {
    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    setPosition({ x: wrapperRect?.width ? wrapperRect.width / 2 : 0, y: wrapperRect?.height ? wrapperRect.height / 2 : 0 });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative overflow-hidden h-full w-full"
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
      style={{ cursor: 'cursor' }}
    >
      <div>
        {position.x}, {position.y}, {scale}
      </div>
      <div
        className="absolute"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: 'center',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default RoomWrapper;

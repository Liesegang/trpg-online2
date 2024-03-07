"use client";

import { useAtom, useAtomValue } from "jotai";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { scaleAtom, selectionAtom } from "../Store";
import clsx from "clsx";

type HandlePosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center"
  | "left-center"
  | "right-center";

interface ScaleHandleProps {
  position: HandlePosition;
  handler: (event: React.MouseEvent<HTMLDivElement>) => void;
  scale: number;
}

const getPositionClass = (position: HandlePosition) => {
  let result = "";
  if (position.includes("top")) result += "top-0 -translate-y-1/2 ";
  if (position.includes("bottom")) result += "bottom-0 translate-y-1/2 ";
  if (position.includes("left")) result += "left-0 -translate-x-1/2 ";
  if (position.includes("right")) result += "right-0 translate-x-1/2 ";
  if (position.includes("center")) {
    if (position.startsWith("top") || position.startsWith("bottom")) {
      result += "left-1/2 -translate-x-1/2 ";
    } else if (position.startsWith("left") || position.startsWith("right")) {
      result += "top-1/2 -translate-y-1/2 ";
    }
  }

  return result.trim();
};

const ScaleHandle: React.FC<ScaleHandleProps> = ({ position, handler, scale }) => {
  return (
    <div
      className={`absolute cursor-nwse-resize ` + getPositionClass(position)}
      onMouseDown={handler}
    >
      <div
        className="w-2 h-2 border-1 border-white rounded-full bg-green-500"
        style={{ transform: `scale(${1 / scale}` }}
      />
    </div>
  );
};

interface RotationHandleProps {
  handler: (event: React.MouseEvent<HTMLDivElement>) => void;
  scale: number;
}

const RotateHandle: React.FC<RotationHandleProps> = ({ handler, scale }) => {
  return (
    <div
      className={`absolute cursor-grab -top-5 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      onMouseDown={handler}
    >
      <div
        className="w-2 h-2 border-1 border-white rounded-full bg-red-500"
        style={{ transform: `scale(${1 / scale}` }}
      />
    </div>
  );
};

interface TransformHandlesProps {
  onScale: (clientX: number, clientY: number) => void;
  onRotate: (clientX: number, clientY: number) => void;
  scale: number;
}

const TransformHandles: React.FC<TransformHandlesProps> = ({ onScale, onRotate, scale }) => {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <ScaleHandle
        handler={(e) => {
          e.stopPropagation();
          onScale(e.clientX, e.clientY);
        }}
        position="bottom-center"
        scale={scale}
      />
      <ScaleHandle
        handler={(e) => {
          e.stopPropagation();
          onScale(e.clientX, e.clientY);
        }}
        position="top-center"
        scale={scale}
      />
      <ScaleHandle
        handler={(e) => {
          e.stopPropagation();
          onScale(e.clientX, e.clientY);
        }}
        position="left-center"
        scale={scale}
      />
      <ScaleHandle
        handler={(e) => {
          e.stopPropagation();
          onScale(e.clientX, e.clientY);
        }}
        position="right-center"
        scale={scale}
      />
      <ScaleHandle
        handler={(e) => {
          e.stopPropagation();
          onScale(e.clientX, e.clientY);
        }}
        position="top-left"
        scale={scale}
      />
      <ScaleHandle
        handler={(e) => {
          e.stopPropagation();
          onScale(e.clientX, e.clientY);
        }}
        position="top-right"
        scale={scale}
      />
      <ScaleHandle
        handler={(e) => {
          e.stopPropagation();
          onScale(e.clientX, e.clientY);
        }}
        position="bottom-left"
        scale={scale}
      />
      <ScaleHandle
        handler={(e) => {
          e.stopPropagation();
          onScale(e.clientX, e.clientY);
        }}
        position="bottom-right"
        scale={scale}
      />
      <RotateHandle
        handler={(e) => {
          e.stopPropagation();
          onRotate(e.clientX, e.clientY);
        }}
        scale={scale}
      />
    </div>
  );
};

interface TransformableProps {
  children: React.ReactNode;
  itemId: string;
}

const TransformableItem: React.FC<TransformableProps> = ({ children, itemId }) => {
  const [selectedItem, setSelectedItem] = useAtom(selectionAtom);
  const canvasScale = useAtomValue(scaleAtom);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [showHandles, setShowHandles] = useState(false);
  const transformRef = useRef<HTMLDivElement>(null);

  const toggleHandles = useCallback(() => {
    setSelectedItem([itemId]);
  }, [itemId, setSelectedItem]);

  useEffect(() => {
    setShowHandles(selectedItem.includes(itemId));
  }, [selectedItem, itemId]);

  const handleScale = useCallback(
    (clientX: number, clientY: number) => {
      const origScale = scale;
      const box = transformRef.current?.getBoundingClientRect() || {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      };
      const xCenter = (box.left + box.right) / 2;
      const yCenter = (box.top + box.bottom) / 2;
      const origDistance = Math.sqrt((clientX - xCenter) ** 2 + (clientY - yCenter) ** 2);

      const onMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        const dx = e.clientX - xCenter;
        const dy = e.clientY - yCenter;
        const distance = Math.sqrt(dx * dx + dy * dy);
        setScale(origScale * (distance / origDistance));
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [scale]
  );

  const handleRotate = useCallback(
    (clientX: number, clientY: number) => {
      const origRotation = rotation;
      const box = transformRef.current?.getBoundingClientRect() || {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      };
      const xCenter = (box.left + box.right) / 2;
      const yCenter = (box.top + box.bottom) / 2;
      const position = { x: xCenter, y: yCenter };

      const startRotation =
        Math.atan2(clientY - position.y, clientX - position.x) * (180 / Math.PI);

      const onMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const currentAngle =
          Math.atan2(e.clientY - position.y, e.clientX - position.x) * (180 / Math.PI);
        const targetAngle = origRotation + currentAngle - startRotation;
        if (e.shiftKey) {
          setRotation(targetAngle - (targetAngle % 15));
        } else {
          setRotation(targetAngle);
        }
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [rotation]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setSelectedItem([itemId]);

      const startPos = { x: event.clientX, y: event.clientY };
      const origPos = { x: position.x, y: position.y };

      const onMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        setPosition({
          x: origPos.x + dx / canvasScale,
          y: origPos.y + dy / canvasScale,
        });
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [position, canvasScale, setSelectedItem, itemId]
  );

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedItem([itemId]);
  };

  return (
    <div
      ref={transformRef}
      className={clsx("cursor-grab", "absolute", "inline-block", {
        "border border-dashed border-sky-500": showHandles,
      })}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg) scale(${scale})`,
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div>{children}</div>
      {showHandles && (
        <TransformHandles onScale={handleScale} onRotate={handleRotate} scale={scale} />
      )}
      <div>
        {position.x}, {position.y}, {rotation}, {scale}
      </div>
    </div>
  );
};

export default TransformableItem;

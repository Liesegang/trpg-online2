'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';

import { Menu, Item, ItemParams, useContextMenu, Submenu } from 'react-contexify';
import { v4 as uuidv4 } from 'uuid';

import {
  MdOutlineDelete,
  MdAddCircleOutline,
  MdOutlineModeEdit,
  MdRadioButtonChecked,
  MdOutlineTitle,
  MdImage,
  MdLocationPin,
  MdOutlinePersonOutline,
} from 'react-icons/md';
import { IoDuplicateOutline } from 'react-icons/io5';

import { scaleAtom, selectionAtom } from '../Store';
import TextItemComponent from './MapItemComponents/TextItemComponent';
import CharacterItemComponent from './MapItemComponents/CharacterItemComponent';
import BackgroundItemComponent from './MapItemComponents/BackgroundItemComponent';
import PinItemComponent from './MapItemComponents/PinItemComponent';

import { Character, Attribute } from 'trpg-common';

interface MapItem {
  id: string;
  position: {
    x: number;
    y: number;
  };
  rotation: number;
  scale: {
    x: number;
    y: number;
  };
  type: string;
  selectable: boolean;
}

interface BackgroundItem extends MapItem {
  type: 'background';
  src: string;
}

interface PinItem extends MapItem {
  type: 'pin';
  src: string;
}

interface TextItem extends MapItem {
  type: 'pin';
  text: string;
}

interface CharacterItem extends MapItem {
  type: 'pin';
  character: Character;
}

const RoomCanvas: React.FC = () => {
  const itemMenuId = 'transformable-item-menu';
  const canvasMenuId = 'canvas-menu';
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useAtom(scaleAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const origPos = useRef({ x: 0, y: 0 });
  const setSelectedItem = useSetAtom(selectionAtom);

  const [sceneItems, setSceneItems] = useState(new Map<string, MapItem>());

  const { show } = useContextMenu({
    id: canvasMenuId,
  });

  const displayMenu = (e: React.MouseEvent) => {
    show({
      id: canvasMenuId,
      event: e,
    });
  };

  const renderItems = (items: Map<string, MapItem>) => {
    return Array.from(items.entries()).map(([key, value]) => {
      switch (value.type) {
        case 'background': {
          const item = value as BackgroundItem;
          return (
            <BackgroundItemComponent
              itemId={key}
              position={item.position}
              rotation={item.rotation}
              scale={item.scale}
              src={item.src}
              selectable={false}
            />
          );
        }
        case 'pin': {
          const item = value as PinItem;
          return (
            <PinItemComponent
              itemId={key}
              position={item.position}
              rotation={item.rotation}
              scale={item.scale}
              src={item.src}
              selectable={true}
            />
          );
        }
        case 'text': {
          const item = value as TextItem;
          return (
            <TextItemComponent
              itemId={key}
              position={item.position}
              rotation={item.rotation}
              scale={item.scale}
              text={item.text}
              selectable={true}
            />
          );
        }
        case 'character': {
          const item = value as CharacterItem;
          return (
            <CharacterItemComponent
              itemId={key}
              position={item.position}
              rotation={item.rotation}
              scale={item.scale}
              character={item.character}
              selectable={true}
            />
          );
        }
        default:
          return null;
      }
    });
  };

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
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
    },
    [position]
  );

  const handleWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
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
    },
    [scale, setScale, position]
  );

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setSelectedItem([]);
    },
    [setSelectedItem]
  );

  useEffect(() => {
    const wrapperRect = wrapperRef.current?.getBoundingClientRect();
    setPosition({
      x: wrapperRect?.width ? wrapperRect.width / 2 : 0,
      y: wrapperRect?.height ? wrapperRect.height / 2 : 0,
    });
  }, []);

  const handleItemMenuClick = useCallback((params: ItemParams) => {
    const uuid = params.props.id;
    switch (params.data.id) {
      case 'selectable':
        setSceneItems((prevItems) => {
          const item = prevItems.get(uuid);
          if (item) {
            item.selectable = !item.selectable;
            prevItems.set(uuid, item);
          }
          return new Map(prevItems);
        });
        break;
      case 'delete':
        setSceneItems((prevItems) => {
          prevItems.delete(uuid);
          return new Map(prevItems);
        });
        break;
      case 'duplicate':
        setSceneItems((prevItems) => {
          const item = prevItems.get(uuid);
          if (item) {
            const newKey = uuidv4().toString();
            const newItem = { ...item, id: newKey };
            prevItems.set(newKey, newItem);
          }
          return new Map(prevItems);
        });
        break;
      case 'edit':
        break;
      default:
        break;
    }
  }, []);

  const handleCanvasMenuClick = useCallback((params: ItemParams) => {
    const uuid = uuidv4().toString();
    switch (params.data.id) {
      case 'add-text':
        setSceneItems((prevItems) => {
          prevItems.set(uuid, {
            id: uuid,
            position: { x: 0, y: 0 },
            rotation: 0,
            scale: { x: 1, y: 1 },
            type: 'text',
            text: 'Default Text',
          });
          return new Map(prevItems);
        });
        break;
      case 'add-background':
        setSceneItems((prevItems) => {
          prevItems.set(uuid, {
            id: uuid,
            position: { x: 0, y: 0 },
            rotation: 0,
            scale: { x: 1, y: 1 },
            type: 'background',
            src: '/map.jpg',
          });
          return new Map(prevItems);
        });
        break;
      case 'add-pin':
        setSceneItems((prevItems) => {
          prevItems.set(uuid, {
            id: uuid,
            position: { x: 0, y: 0 },
            rotation: 0,
            scale: { x: 1, y: 1 },
            type: 'pin',
            src: '/map.jpg',
          });
          return new Map(prevItems);
        });
        break;
      case 'add-character':
        setSceneItems((prevItems) => {
          prevItems.set(uuid, {
            id: uuid,
            position: { x: 0, y: 0 },
            rotation: 0,
            scale: { x: 1, y: 1 },
            type: 'character',
            character: new Character(
              'character name',
              'ruby',
              new Attribute({
                strength: 10,
                constitution: 20,
                size: 30,
                dexterity: 40,
                appearance: 50,
                education: 60,
                intelligence: 70,
                power: 80,
              }),
              '/map.jpg'
            ),
          });
          return new Map(prevItems);
        });
        break;
      default:
        break;
    }
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative overflow-hidden h-full w-full"
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        onClick={handleClick}
        onContextMenu={displayMenu}
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
          {renderItems(sceneItems)}
        </div>
      </div>
      <Menu id={itemMenuId}>
        <Item onClick={handleItemMenuClick} data={{ id: 'selectable' }}>
          <MdRadioButtonChecked className="me-1" /> 選択可能
        </Item>
        <Item onClick={handleItemMenuClick} data={{ id: 'edit' }}>
          <MdOutlineModeEdit className="me-1" /> 編集
        </Item>
        <Item onClick={handleItemMenuClick} data={{ id: 'delete' }}>
          <MdOutlineDelete className="me-1" /> 消去
        </Item>
        <Item onClick={handleItemMenuClick} data={{ id: 'duplicate' }}>
          <IoDuplicateOutline className="me-1" /> 複製
        </Item>
      </Menu>
      <Menu id={canvasMenuId}>
        <Submenu
          label={
            <>
              <MdAddCircleOutline className="me-1" /> 追加
            </>
          }
        >
          <Item onClick={handleCanvasMenuClick} data={{ id: 'add-text' }}>
            <MdOutlineTitle className="me-1" /> テキスト
          </Item>
          <Item onClick={handleCanvasMenuClick} data={{ id: 'add-background' }}>
            <MdImage className="me-1" /> 背景
          </Item>
          <Item onClick={handleCanvasMenuClick} data={{ id: 'add-pin' }}>
            <MdLocationPin className="me-1" /> アイテム / ピン
          </Item>
          <Item onClick={handleCanvasMenuClick} data={{ id: 'add-character' }}>
            <MdOutlinePersonOutline className="me-1" /> キャラクター
          </Item>
        </Submenu>
      </Menu>
    </>
  );
};

export default RoomCanvas;

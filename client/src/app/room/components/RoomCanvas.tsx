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
import { useSyncedStore } from '@syncedstore/react';

import { scaleAtom, selectionAtom, store } from '../store';
import TextItemComponent from './MapItemComponents/TextItemComponent';
import CharacterItemComponent from './MapItemComponents/CharacterItemComponent';
import BackgroundItemComponent from './MapItemComponents/BackgroundItemComponent';
import PinItemComponent from './MapItemComponents/PinItemComponent';

import {
  Character,
  Attribute,
  MapItem,
  BackgroundItem,
  PinItem,
  TextItem,
  CharacterItem,
} from 'trpg-common';

const RoomCanvas: React.FC = () => {
  const itemMenuId = 'transformable-item-menu';
  const canvasMenuId = 'canvas-menu';
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useAtom(scaleAtom);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const origPos = useRef({ x: 0, y: 0 });
  const setSelectedItem = useSetAtom(selectionAtom);

  const state = useSyncedStore(store);

  const { show } = useContextMenu({
    id: canvasMenuId,
  });

  const displayMenu = (e: React.MouseEvent) => {
    show({
      id: canvasMenuId,
      event: e,
    });
  };

  const renderItems = (items: { [id: string]: MapItem }) => {
    return Object.entries(items).map(([key, value]) => {
      switch (value.type) {
        case 'background': {
          const item = value as BackgroundItem;
          return (
            <BackgroundItemComponent
              key={key}
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
              key={key}
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
              key={key}
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
              key={key}
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

  const handleItemMenuClick = useCallback(
    (params: ItemParams) => {
      const uuid = params.props.id;
      if (!state?.mapItems[uuid]) return;
      const item = state.mapItems[uuid];
      switch (params.data.id) {
        case 'selectable':
          state.mapItems[uuid].selectable = !state.mapItems[uuid].selectable;
          break;
        case 'delete':
          delete state.mapItems[uuid];
          break;
        case 'duplicate':
          const newKey = uuidv4().toString();
          state.mapItems[newKey] = { ...item, id: newKey };
          break;
        case 'edit':
          break;
        default:
          break;
      }
    },
    [state]
  );

  const handleCanvasMenuClick = useCallback(
    (params: ItemParams) => {
      const uuid = uuidv4().toString();
      switch (params.data.id) {
        case 'add-text':
          state.mapItems[uuid] = {
            id: uuid,
            position: { x: 0, y: 0 },
            rotation: 0,
            scale: { x: 1, y: 1 },
            type: 'text',
            text: 'Default Text',
          };
          break;
        case 'add-background':
          state.mapItems[uuid] = {
            id: uuid,
            position: { x: 0, y: 0 },
            rotation: 0,
            scale: { x: 1, y: 1 },
            type: 'background',
            src: '/map.jpg',
          };
          break;
        case 'add-pin':
          state.mapItems[uuid] = {
            id: uuid,
            position: { x: 0, y: 0 },
            rotation: 0,
            scale: { x: 1, y: 1 },
            type: 'pin',
            src: '/map.jpg',
          };
          break;
        case 'add-character':
          state.mapItems[uuid] = {
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
          };
          break;
        default:
          break;
      }
    },
    [state]
  );

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
          {renderItems(state.mapItems || {})}
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

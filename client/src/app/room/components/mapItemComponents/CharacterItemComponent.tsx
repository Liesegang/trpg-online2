import Image from "next/image";
import TransformableItem from "./TransformableItemComponent";
import { Character } from "trpg-common";

interface CharacterItemProps {
  character: Character;
  itemId: string;
  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
  selectable: boolean;
}

const CharacterItem: React.FC<CharacterItemProps> = ({
  character,
  itemId,
  position,
  rotation,
  scale,
}) => {
  return (
    <TransformableItem
      itemId={itemId}
      position={position}
      rotation={rotation}
      scale={scale}
      selectable={false}
    >
      <Image src={character.thumbnailUrl} width={50} height={50} alt="character image" />
      {character.name}
    </TransformableItem>
  );
};

export default CharacterItem;

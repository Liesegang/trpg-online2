import TransformableItem from "./TransformableItemComponent";

interface TextProps {
  text: string;
  itemId: string;
  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
  selectable: boolean;
}

const TextItem: React.FC<TextProps> = ({ text, itemId, position, rotation, scale }) => {
  return (
    <TransformableItem
      itemId={itemId}
      position={position}
      rotation={rotation}
      scale={scale}
      selectable={true}
    >
      <div>{text}</div>
    </TransformableItem>
  );
};

export default TextItem;

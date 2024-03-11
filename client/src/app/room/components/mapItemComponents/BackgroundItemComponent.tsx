import Image from "next/image";
import TransformableItem from "./TransformableItemComponent";

interface BackgroundItemProps {
  src: string;
  itemId: string;
  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
  selectable: boolean;
}

const BackgroundItemComponent: React.FC<BackgroundItemProps> = ({ src, itemId, position, rotation, scale }) => {
  return (
    <TransformableItem
      itemId={itemId}
      position={position}
      rotation={rotation}
      scale={scale}
      selectable={false}
    >
      <Image src={src} alt="map" width={498} height={500} />
    </TransformableItem>
  );
}

export default BackgroundItemComponent;

import React, { FC, useEffect } from 'react';
import { Image } from 'react-konva';

interface Props {
  image?: HTMLImageElement;
  width: number;
  height: number;
  setScale: Function;
}

const ImageComponent: FC<Props> = ({ image, width, height, setScale }) => {
  useEffect(() => {
    if (!image) return;

    if (width < image.width || height < image.height) {
      const scale = Math.min(width / image.width, height / image.height);
      setScale(scale);
    }
  }, [image]);

  return <Image image={image} />;
};

export default ImageComponent;

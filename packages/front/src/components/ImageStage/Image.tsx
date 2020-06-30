import React, { FC, useEffect, useState } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

interface Props {
  url: string;
  width: number;
  height: number;
  setScale: Function;
  setImageWidth: Function;
  setImageHeight: Function;
  setWidth: Function;
  setHeight: Function;
}

const ImageComponent: FC<Props> = ({
  url,
  width,
  height,
  setScale,
  setImageWidth,
  setImageHeight,
  setWidth,
  setHeight,
}) => {
  const [image] = useImage(url, 'Anonymous');
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    if (!image) {
      return;
    }
    const scale = Math.min(width / image.width, height / image.height);
    setScale(scale);
    setImageWidth(image.width);
    setImageHeight(image.height);

    const x = width / 2 - (image.width * scale) / 2;
    const y = height / 2 - (image.height * scale) / 2;

    setPos({ x, y });
  }, [height, image, setHeight, setImageHeight, setImageWidth, setScale, setWidth, width]);

  return <Image image={image} x={pos.x} y={pos.y} />;
};

export default ImageComponent;

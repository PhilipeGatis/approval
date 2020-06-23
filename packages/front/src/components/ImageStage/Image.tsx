import React, { FC, useEffect } from 'react';
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
  useEffect(() => {
    if (!image) {
      return;
    }
    const scale = Math.min(width / image.width, height / image.height);
    setScale(scale);
    setImageWidth(image.width);
    setImageHeight(image.height);

    const ratio = image.width / image.height;
    setWidth(width);
    setHeight(width / ratio);
  }, [height, image, setHeight, setImageHeight, setImageWidth, setScale, setWidth, width]);

  return <Image image={image} />;
};

export default ImageComponent;

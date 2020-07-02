import React from 'react';
import useImage from 'use-image';
import { useEffect, useState } from 'react';
import useLocal from '../../relayComponents/useLocal';
import useApprovalQuery from '../../relayComponents/useApprovalQuery';
import Stage from './Stage';
import { Approval } from '../../Types';

const ImageState = () => {
  const [setImageWidth] = useLocal('stage_imageWidth', 'action');
  const [setImageHeight] = useLocal('stage_imageHeight', 'action');
  const [width] = useLocal('stage_stageWidth', 'value');
  const [height] = useLocal('stage_stageHeight', 'value');
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const approval = useApprovalQuery();

  const [image, status] = useImage((approval?.assets?.length && approval?.assets[0].assetUrl) || '', 'Anonymous');

  useEffect(() => {
    if (!image || status !== 'loaded') {
      return;
    }

    setImageWidth(image.width);
    setImageHeight(image.height);

    setPos({
      x: width / 2 - image.width / 2,
      y: height / 2 - image.height / 2,
    });
  }, [height, image, setImageHeight, setImageWidth, status, width]);

  if (status !== 'loaded') return null;
  return <Stage image={image} pos={pos} approval={approval as Approval} />;
};

export default ImageState;

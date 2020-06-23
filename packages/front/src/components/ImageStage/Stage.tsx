import React, { useRef, useEffect, FC } from 'react';
import { Layer, Stage } from 'react-konva';
import konva from 'konva';
import { useQuery } from 'relay-hooks';
import graphql from 'babel-plugin-relay/macro';
import ImageComponent from './Image';
import { useParams } from 'react-router-dom';
import { StageComponentQuery } from './__generated__/StageComponentQuery.graphql';
import useLocal from '../../relay/useLocal';

const query = graphql`
  query StageComponentQuery($approvalId: String!) {
    approval(approvalId: $approvalId) {
      assets {
        asset
        assetUrl
      }
    }
  }
`;

export interface Attributes extends konva.Vector2d {
  scale: number;
}

const limitAttributes = (stage: konva.Stage, newAttrs: Attributes) => {
  const box = stage.findOne('Image').getClientRect();
  const minX = -box.width + stage.width() / 2;
  const maxX = stage.width() / 2;

  const x = Math.max(minX, Math.min(newAttrs.x, maxX));

  const minY = -box.height + stage.height() / 2;
  const maxY = stage.height() / 2;

  const y = Math.max(minY, Math.min(newAttrs.y, maxY));

  const scale = Math.max(0.05, newAttrs.scale);

  return { x, y, scale };
};

const StageComponent: FC<{}> = ({ children }) => {
  const stageRef = useRef<Stage>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useLocal('stage_scale');
  const [width, setWidth] = useLocal('stage_stageWidth');
  const [height, setHeight] = useLocal('stage_stageHeight');
  const [imageWidth, setImageWidth] = useLocal('stage_imageWidth');
  const [imageHeight, setImageHeight] = useLocal('stage_imageHeight');

  const { id } = useParams();

  const { props } = useQuery<StageComponentQuery>(
    query,
    { approvalId: id },
    {
      fetchPolicy: 'store-only',
    },
  );
  let url = '';
  if (
    props &&
    props.approval &&
    props.approval.assets &&
    props.approval.assets.length &&
    props.approval.assets[0].assetUrl
  )
    url = props.approval.assets[0].assetUrl;

  useEffect(() => {
    const checkSize = () => {
      if (stageWrapperRef.current) {
        setWidth(stageWrapperRef.current.offsetWidth);
        setHeight(stageWrapperRef.current.offsetHeight);
      }
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, [setHeight, setWidth]);

  return (
    <div ref={stageWrapperRef}>
      <Stage ref={stageRef} width={width} height={height} scaleX={scale} scaleY={scale}>
        <Layer>
          <ImageComponent
            url={url}
            height={height}
            width={width}
            setHeight={setHeight}
            setWidth={setWidth}
            setImageHeight={setImageHeight}
            setImageWidth={setImageWidth}
            setScale={setScale}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default StageComponent;

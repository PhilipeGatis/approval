import React, { FC } from 'react';
import { Line, Circle, Rect } from 'react-konva';
import { Markup, MarkupCircle, MarkupSquare, MarkupLine, MarkupType } from '../../Types';

interface Props {
  markup: Markup;
}

const MarkupSelector: FC<Props> = ({ markup }) => {
  if (markup && markup.content && !Object.keys(markup.content).length) return null;

  const type = markup.type;
  const color = markup.color;

  if (type === MarkupType.LINE) {
    const content = markup.content as MarkupLine;
    if (content.points && content.points.length > 0) {
      const points = content.points.flatMap((p) => [p.x, p.y]);
      return <Line stroke={color} fill={color} strokeWidth={2} opacity={0.5} points={points} />;
    }
  }

  if (type === MarkupType.CIRCLE) {
    const content = markup.content as MarkupCircle;
    return (
      <Circle
        stroke={color}
        opacity={0.5}
        strokeWidth={2}
        fill={color}
        x={content.x}
        y={content.y}
        radius={content.radius}
      />
    );
  }

  if (type === MarkupType.SQUARE) {
    const content = markup.content as MarkupSquare;
    return (
      <Rect
        opacity={0.5}
        fill={color}
        strokeWidth={2}
        x={content.x}
        y={content.y}
        height={content.height}
        width={content.width}
      />
    );
  }

  return null;
};

export default MarkupSelector;

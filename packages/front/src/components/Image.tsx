import React, { Fragment, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import graphql from 'babel-plugin-relay/macro';
import { useQuery } from 'relay-hooks';
import { ImageQuery } from './__generated__/ImageQuery.graphql';
import { select } from 'd3';

const query = graphql`
  query ImageQuery($approvalId: String!) {
    approval(approvalId: $approvalId) {
      id
      assets {
        assetUrl
        asset
      }
    }
  }
`;

const Image = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const svgMinimapRef = useRef<SVGSVGElement>(null);
  const { id } = useParams();
  const { props } = useQuery<ImageQuery>(
    query,
    { approvalId: id },
    {
      fetchPolicy: 'store-only',
    },
  );
  let url = '';
  if (props && props.approval && props.approval.assets && props.approval.assets[0].assetUrl)
    url = props.approval.assets[0].assetUrl;

  useEffect(() => {
    const svg = select(svgRef.current);
    const svgMinimap = select(svgMinimapRef.current);

    const imgs = svg.selectAll('img').data([0]);
    imgs
      .enter()
      .append('svg:image')
      .attr('xlink:href', url)
      .attr('x', '60')
      .attr('y', '60')
      .attr('width', '20')
      .attr('height', '20');
  }, [url]);

  return (
    <Fragment>
      <svg style={{ width: '100%', height: '100%' }} ref={svgRef} />;
      <svg ref={svgMinimapRef} />;
    </Fragment>
  );
};

export default Image;

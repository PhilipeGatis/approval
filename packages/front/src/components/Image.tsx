import React from 'react';
import { useParams } from 'react-router-dom';
import graphql from 'babel-plugin-relay/macro';
import { useQuery } from 'relay-hooks';
import { ImageQuery } from './__generated__/ImageQuery.graphql';

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

const Image: React.FC<{}> = () => {
  const { id } = useParams();
  const { props } = useQuery<ImageQuery>(
    query,
    { approvalId: id },
    {
      fetchPolicy: 'store-only',
    }
  );
  let url = '';
  if (
    props &&
    props.approval &&
    props.approval.assets &&
    props.approval.assets[0].assetUrl
  )
    url = props.approval.assets[0].assetUrl;
  return <img src={url} />;
};

export default Image;

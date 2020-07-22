import { useLazyLoadQuery } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
import { useParams, useHistory } from 'react-router-dom';
import { useApprovalQuery } from './__generated__/useApprovalQuery.graphql';
import { useEffect } from 'react';

const query = graphql`
  query useApprovalQuery($approvalId: String!) {
    approval(approvalId: $approvalId) {
      id
      dueDate
      isCanApprove
      assets {
        assetUrl
        asset
      }
      approvers {
        id
        isRequeried
        login
        name
        isApproved
      }
    }
  }
`;

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { approval } = useLazyLoadQuery<useApprovalQuery>(
    query,
    { approvalId: id },
    {
      fetchPolicy: 'store-or-network',
    },
  );

  useEffect(() => {
    if (!approval) history.push('/404');
  }, [approval, history]);

  return approval;
};

import { useQuery } from 'relay-hooks';
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
      notes {
        id
        markup
        createdBy
        createdAt
        text
        comments {
          id
          text
        }
      }
    }
  }
`;

export default () => {
  const { id } = useParams()
  const history = useHistory()
  const { props } = useQuery<useApprovalQuery>(
    query,
    { approvalId: id },
    {
      fetchPolicy: 'store-or-network',
    },
  );

  useEffect(() => {
    if (props && !props.approval) history.push('/404');
  }, [props, history]);

  return props?.approval;
};
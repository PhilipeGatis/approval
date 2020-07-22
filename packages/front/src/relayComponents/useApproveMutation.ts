import { useMutation } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
import { useApproveMutation } from './__generated__/useApproveMutation.graphql';

const mutation = graphql`
  mutation useApproveMutation($approvalId: String!, $approved: Boolean!) {
    approve(approved: { approvalId: $approvalId, approved: $approved }) {
      id
      isApproved
    }
  }
`;

export default () => {
  const [mutate, isPending] = useMutation<useApproveMutation>(mutation);

  return { mutate, isPending };
};

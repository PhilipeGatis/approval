import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'relay-hooks';
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
  const [mutate, { loading }] = useMutation<useApproveMutation>(mutation);

  return { mutate, loading };
};

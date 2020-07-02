import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'relay-hooks';
import { useAddNoteMutation } from './__generated__/useAddNoteMutation.graphql';

const mutation = graphql`
  mutation useAddNoteMutation($approvalId: String!, $markup: JSONObject!, $text: String!) {
    addNote(note: { approvalId: $approvalId, markup: $markup, text: $text }) {
      id
      markup
    }
  }
`;

export default () => {
  const [mutate, { loading }] = useMutation<useAddNoteMutation>(mutation);

  return { mutate, loading };
};

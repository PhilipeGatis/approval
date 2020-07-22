import { useMutation } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
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
  const [mutate, isPending] = useMutation<useAddNoteMutation>(mutation);

  return { mutate, isPending };
};

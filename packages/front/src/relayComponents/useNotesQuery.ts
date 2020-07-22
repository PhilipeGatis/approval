import { useLazyLoadQuery } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
import { useParams } from 'react-router-dom';
import { useNotesQuery } from './__generated__/useNotesQuery.graphql';

const query = graphql`
  query useNotesQuery($approvalId: String!) {
    notes(approvalId: $approvalId) {
      id
      markup
      ...useNoteFragment_note
    }
  }
`;

export default () => {
  const { id } = useParams();
  const { notes } = useLazyLoadQuery<useNotesQuery>(
    query,
    { approvalId: id },
    {
      fetchPolicy: 'store-or-network',
    },
  );

  return notes;
};

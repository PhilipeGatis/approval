import { useFragment } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';
import { useNoteFragment_note$key, useNoteFragment_note$data } from './__generated__/useNoteFragment_note.graphql';

const fragmentSpec = graphql`
  fragment useNoteFragment_note on Note {
    id
    createdAt
    createdBy
    text
    comments {
      id
    }
  }
`;

interface Props {
  note: useNoteFragment_note$key;
}

export type Note = useNoteFragment_note$key;

export default ({ note }: Props) => {
  const notesData: useNoteFragment_note$data = useFragment<Note>(fragmentSpec, note);
  return notesData;
};

import React, { FC } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { useFragment } from 'relay-hooks';
import { NoteFragment_note$key } from './__generated__/NoteFragment_note.graphql';

const fragmentSpec = graphql`
  fragment NoteFragment_note on Note {
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
  note: NoteFragment_note$key;
}

const NoteFragment: FC<Props> = ({ children, note }) => {
  const noteData = useFragment(fragmentSpec, note);
  console.log(noteData)
  // @ts-ignore
  return <>{children(noteData)}</>;
};

export default NoteFragment;
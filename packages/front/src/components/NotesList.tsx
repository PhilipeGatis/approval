import React from 'react';
import NoteComponent from './Note';
import useNotesQuery from '../relayComponents/useNotesQuery';

const NotesList = () => {
  const notes = useNotesQuery();

  if (notes?.length) {
    return (
      <>
        {notes.map((note) => {
          return <NoteComponent key={note.id} note={note} />;
        })}
      </>
    );
  }

  return null;
};

export default NotesList;

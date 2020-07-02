import React from 'react';
import NoteComponent from './Note';
import useApprovalQuery from '../relayComponents/useApprovalQuery';
import { Note } from '../Types';

const NotesList = () => {
  const approval = useApprovalQuery();

  if (approval?.notes?.length) {
    return (
      <>
        {approval?.notes.map((note) => {
          return <NoteComponent key={note.id} note={note as Note} />;
        })}
      </>
    );
  }

  return null;
};

export default NotesList;

import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'relay-hooks';

import useLocal from '../relay/useLocal';
import { Markup } from '../Types';
import { AddNoteDialogMutation } from './__generated__/AddNoteDialogMutation.graphql';

const mutation = graphql`
  mutation AddNoteDialogMutation($approvalId: String!, $markup: JSONObject!, $text: String!) {
    addNote(note: { approvalId: $approvalId, markup: $markup, text: $text }) {
      id
      markup
    }
  }
`;

interface Props {
  callback: Function;
  markup: Markup;
  id: string;
}

const AddNoteDialog: FC<Props> = ({ id, callback, markup }) => {
  const [open, toogleOpen] = useLocal('dialogs_addNote');
  const [text, setText] = useState<string>('');

  const [mutate, { loading }] = useMutation<AddNoteDialogMutation>(mutation);

  const handleClose = () => {
    callback();
    toogleOpen(false);
  };

  const handleSave = () => {
    mutate({
      variables: {
        approvalId: id,
        text,
        markup: { ...markup },
      },
    })
    toogleOpen(false);
  };

  const handleExit = () => {
    setText('');
    callback();
  };

  return (
    <Dialog open={open} onExit={handleExit} onClose={handleClose}>
      <DialogTitle>Add Note</DialogTitle>
      <DialogContent>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
          margin="dense"
          id="text"
          label="Note"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button disabled={loading} onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNoteDialog;

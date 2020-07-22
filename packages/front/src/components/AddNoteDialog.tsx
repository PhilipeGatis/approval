import React, { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useParams } from 'react-router-dom';

import useLocal from '../relayComponents/useLocal';
import useAddNoteMutation from '../relayComponents/useAddNoteMutation';
import { Markup } from './ImageStage/Types';

interface Props {
  callback: Function;
  markup: Markup;
}

const AddNoteDialog: FC<Props> = ({ callback, markup }) => {
  const { id } = useParams();
  const [open, toogleOpen] = useLocal('dialogs_addNote');
  const [text, setText] = useState<string>('');

  const { mutate, isPending } = useAddNoteMutation();

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
          id="text"
          type="text"
          multiline
          rows={4}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isPending} onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button disabled={isPending} onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNoteDialog;

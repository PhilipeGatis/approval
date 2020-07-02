import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { AppTheme } from '../theme';
import NotesList from '../components/NotesList';
import { InfoAreaType } from '../Types';
import AppoversList from '../components/ApproversList';

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  list: {
    overflow: 'auto',
    height: '100%',
  },
}));

interface Props {
  selected: string;
}

const InfoArea: FC<Props> = ({ selected }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.list}>
        {selected === InfoAreaType.NOTES && <NotesList />}
        {selected === InfoAreaType.APPROVERS && <AppoversList />}
      </div>
    </Paper>
  );
};

export default InfoArea;

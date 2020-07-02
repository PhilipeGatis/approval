import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { red, green } from '@material-ui/core/colors';
import { AppTheme } from '../theme';
import { Approver } from '../Types';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      maxWidth: theme.app.infoAreaWidth,
    },
    avatarApprove: {
      backgroundColor: green[500],
    },
    avatarReprove: {
      backgroundColor: red[500],
    },
  }),
);

interface Props {
  approver: Approver;
}

const ApproverComponent: React.FC<Props> = ({ approver }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Badge color="secondary" variant="dot" invisible={!approver.isRequeried}>
            <Avatar
              className={clsx({
                [classes.avatarApprove]: approver.isApproved,
                [classes.avatarReprove]: !approver.isApproved,
              })}
            >
              {approver.isApproved ? <CheckIcon /> : <CloseIcon />}
            </Avatar>
          </Badge>
        }
        title={`Approver: ${approver.name}`}
        subheader={`Login: ${approver.login}`}
      />
    </Card>
  );
};

export default ApproverComponent;

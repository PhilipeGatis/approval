import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import DrawerTools from '../components/DrawerTools';
import { makeStyles } from '@material-ui/core/styles';
import { AppTheme } from '../theme';
import graphql from 'babel-plugin-relay/macro';
import { useMutation } from 'relay-hooks';
import { RightMenuMutation } from './__generated__/RightMenuMutation.graphql';

const useStyles = makeStyles((theme: AppTheme) => ({
  approve: {
    color: 'green',
  },
  repprove: {
    color: 'red',
  },
}));

const mutation = graphql`
  mutation RightMenuMutation($approvalId: String!, $approved: Boolean!) {
    approve(approved: { approvalId: $approvalId, approved: $approved }) {
      id
      isApproved
    }
  }
`;

interface Props {
  approvalId: string;
}

const RightMenu: React.FC<Props> = ({ approvalId }) => {
  const classes = useStyles();
  const [mutate, { loading }] = useMutation<RightMenuMutation>(mutation);

  const onClick = (approved: boolean) => {
    mutate({
      variables: {
        approvalId: approvalId,
        approved: approved,
      },
    });
  };

  return (
    <DrawerTools anchor="right">
      <List>
        <ListItem disabled={loading} onClick={() => onClick(true)} button>
          <ListItemIcon className={classes.approve}>
            <CheckIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem disabled={loading} onClick={() => onClick(false)} button>
          <ListItemIcon className={classes.repprove}>
            <CloseIcon />
          </ListItemIcon>
        </ListItem>
      </List>
    </DrawerTools>
  );
};

export default RightMenu;

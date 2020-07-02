import React, { useState, MouseEvent } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { AppTheme } from '../theme';
import { Note } from '../Types';
import { format, parseISO } from 'date-fns';
import AvatarInitials from './AvatarInitals';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      maxWidth: theme.app.infoAreaWidth,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

interface Props {
  note: Note;
}

const NoteComponent: React.FC<Props> = ({ note }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<AvatarInitials className={classes.avatar} name={note.createdBy} />}
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClickMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Edit</MenuItem>
              <MenuItem onClick={handleClose}>Remove</MenuItem>
            </Menu>
          </>
        }
        title={`Note: ${note.id.slice(0, note.id.indexOf('-'))}`}
        subheader={format(parseISO(note.createdAt as string), "'At:' dd/MM/yyyy HH:mm'h'")}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {note.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Badge badgeContent={note.comments?.length || 0} color="primary">
          <Typography gutterBottom variant="subtitle1">
            Comments
          </Typography>
        </Badge>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken,
            shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp
            to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic,
            tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes.
            Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring,
            until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and
            rice is just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default NoteComponent;

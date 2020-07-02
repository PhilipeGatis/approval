import React, { useEffect, useRef, useState } from 'react';
import Popover from '@material-ui/core/Popover';
import ListItem from '@material-ui/core/ListItem';
import useLocal from '../relayComponents/useLocal';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: 300,
    padding: '10px 0px',
  },
});

const ZoomControl = () => {
  const anchorRef = useRef(null);
  const classes = useStyles();
  const [scale, updateScale] = useLocal('stage_scale');

  const [showZoomControl, toogleZoomControl] = useState(false);

  const [localScale, setLocalScale] = useState(scale);

  const handleChange = () => {
    updateScale(localScale);
    toogleZoomControl(!showZoomControl);
  };

  useEffect(() => {
    setLocalScale(scale);
  }, [scale, setLocalScale]);

  return (
    <>
      <ListItem ref={anchorRef} onClick={() => toogleZoomControl(!showZoomControl)} button>
        <Typography variant="caption">{`${Math.round(localScale * 100)}%`}</Typography>
      </ListItem>
      <Popover
        anchorEl={anchorRef.current}
        open={showZoomControl}
        onBackdropClick={() => toogleZoomControl(!showZoomControl)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <div className={classes.root}>
          <Slider
            min={0.1}
            step={0.01}
            max={3}
            onChange={(event, value) => setLocalScale(value)}
            value={localScale}
            onChangeCommitted={handleChange}
            orientation="vertical"
          />
        </div>
      </Popover>
    </>
  );
};

export default ZoomControl;

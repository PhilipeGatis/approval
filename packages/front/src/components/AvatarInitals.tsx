import Avatar from '@material-ui/core/Avatar';
import React, { FC } from 'react';
import initials from 'initials';
import Tooltip from '@material-ui/core/Tooltip';

interface Props {
  name?: string;
  image?: string;
  className?: string;
}

const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const AvatarInitials: FC<Props> = ({ image, name, className }) =>
  <Tooltip title={toTitleCase(name || '')} aria-label="add">
    {image ? (
      <Avatar src={image} className={className} />
    ) : (
      <Avatar className={className}>{initials(toTitleCase(name || ''))}</Avatar>
    )}
  </Tooltip>

export default AvatarInitials;

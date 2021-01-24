import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import useContextMenu from '../../../hooks/useContextMenu';
import { Lesson } from '../../../hooks/useDatabase';

const LessonContextMenu = () => {
  const { anchorEl, closeMenu, setIndex } = useContextMenu<Lesson>();

  const handleEdit = () => {
    setIndex(0);
    closeMenu();
  };

  const handleClose = () => {
    closeMenu();
  };

  return (
    <>
      <Menu
        onClose={handleClose}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        {/* <MenuItem onClick={() => null}>Delete</MenuItem> */}
      </Menu>
    </>
  );
};

export default React.memo(LessonContextMenu);

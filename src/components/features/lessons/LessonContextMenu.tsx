import React from 'react';

import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import useContextMenu from '../../../hooks/useContextMenu';
import { Lesson, Student } from '../../../hooks/useDatabase';

export interface LessonContextMenuState {
  student: Student;
  lesson: Lesson;
}

const LessonContextMenu = () => {
  const {
    state,
    anchorEl,
    closeMenu,
  } = useContextMenu<LessonContextMenuState>();
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  const handleEdit = () => {
    closeMenu();
    history.push({
      pathname: `/lessons/edit/${state.lesson.id}`,
      state: {
        ...state,
        background: location,
      },
    });
  };

  const handleClose = () => {
    closeMenu();
  };

  return (
    <Menu
      onClose={handleClose}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      keepMounted
    >
      <MenuItem onClick={handleEdit}>
        {t('lessonsList.lessonContextMenu.actions.edit')}
      </MenuItem>
      {/* TODO: delete lessons */}
    </Menu>
  );
};

export default React.memo(LessonContextMenu);

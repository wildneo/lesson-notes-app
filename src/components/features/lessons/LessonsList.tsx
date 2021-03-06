import React from 'react';

import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';

import useContextMenu from '../../../hooks/useContextMenu';
import useDatabase, { Lesson, Student } from '../../../hooks/useDatabase';
import { getClassNameByDay } from '../../../utils';
import Container from '../../Container';
import Paper from '../../Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      whiteSpace: 'pre-wrap',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    before: {
      color: theme.palette.getContrastText(theme.palette.grey[300]),
      backgroundColor: theme.palette.grey[300],
    },
    today: {
      color: theme.palette.getContrastText(theme.palette.success.main),
      backgroundColor: theme.palette.success.main,
    },
    after: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
    },
    wordChip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
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
  }),
);

const LessonsList = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation<{ student: Student }>();
  const [expanded, setExpanded] = React.useState<Lesson['id'] | null>(null);
  const [student, setStudent] = React.useState<Student>(location.state.student);
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const { openMenu } = useContextMenu<{ student: Student; lesson: Lesson }>();
  const classes = useStyles();
  const { subscribeOnStudent, subscribeOnLessons } = useDatabase();

  const fullName = `${student.firstName} ${student.lastName}`;

  const handleEditStudent = () => {
    history.push({
      pathname: `/students/edit/${student.id}`,
      state: {
        student,
        background: location,
      },
    });
  };

  const handleClickMore = (lesson: Lesson) => (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    openMenu(event.currentTarget, { student, lesson });
  };

  const handleClickExpand = (lessonID: Lesson['id']) => () => {
    if (lessonID === expanded) {
      setExpanded(null);

      return;
    }
    setExpanded(lessonID);
  };

  React.useEffect(() => {
    const unsubStudent = subscribeOnStudent(student.id, (stdt) => {
      setStudent(stdt);
    });
    const unsubLessons = subscribeOnLessons(student.id, (lsns) => {
      setLessons(lsns);
    });

    return () => {
      unsubStudent();
      unsubLessons();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Paper>
        <Toolbar>
          <Typography variant="h5">{fullName}</Typography>
          <IconButton onClick={handleEditStudent}>
            <EditIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {lessons.map((lesson) => (
            <ListItem key={lesson.id} divider>
              <div className={classes.wrapper}>
                <div className={classes.header}>
                  <ListItemIcon>
                    <Avatar className={classes[getClassNameByDay(lesson.date)]}>
                      {lesson.lessonNumber}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={lesson.date.toLocaleString()} />
                  <ListItemIcon>
                    <IconButton onClick={handleClickMore(lesson)}>
                      <MoreVertIcon />
                    </IconButton>
                    <IconButton
                      className={clsx(
                        classes.expand,
                        lesson.id === expanded && classes.expandOpen,
                      )}
                      onClick={handleClickExpand(lesson.id)}
                    >
                      <ExpandMoreIcon className={classes.expand} />
                    </IconButton>
                  </ListItemIcon>
                </div>
                <Collapse
                  collapsedHeight={64}
                  in={lesson.id === expanded}
                  timeout="auto"
                >
                  <div>
                    {lesson.lessonPlan && (
                      <Typography variant="body2" paragraph>
                        {lesson.lessonPlan}
                      </Typography>
                    )}
                    {lesson.homework && (
                      <>
                        <Typography variant="subtitle1" gutterBottom>
                          {t('lessonsList.subtitles.homework')}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {lesson.homework}
                        </Typography>
                      </>
                    )}
                    {lesson.comment && (
                      <>
                        <Typography variant="subtitle1" gutterBottom>
                          {t('lessonsList.subtitles.comment')}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {lesson.comment}
                        </Typography>
                      </>
                    )}
                    {lesson.newWords.length > 0 && (
                      <>
                        <Typography variant="subtitle1" gutterBottom>
                          {t('lessonsList.subtitles.newWords')}
                        </Typography>
                        {lesson.newWords.map((word) => (
                          <Chip
                            key={word}
                            className={classes.wordChip}
                            label={word.trim()}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </Collapse>
              </div>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default React.memo(LessonsList);

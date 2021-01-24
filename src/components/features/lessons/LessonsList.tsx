import React from 'react';

import { useLocation } from 'react-router-dom';

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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';

import useContextMenu from '../../../hooks/useContextMenu';
import useDatabase, { Lesson, Student } from '../../../hooks/useDatabase';
import Container from '../../Container';
import Paper from '../../Paper';
import EditStudentDialog from '../students/EditStudentDialog';

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
    lessonAvatar: {
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
  const { state } = useLocation<{ student: Student }>();
  const { openMenu } = useContextMenu<{ student: Student; lesson: Lesson }>();
  const [expanded, setExpanded] = React.useState<Lesson['id'] | null>(null);
  const [student, setStudent] = React.useState<Student>(state.student);
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const classes = useStyles();
  const { subscribeOnStudent, subscribeOnLessons } = useDatabase();

  const fullName = `${student.firstName} ${student.lastName}`;

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
    const unsubStudent = subscribeOnStudent(student.id, (s) => {
      setStudent(s);
    });
    const unsubLessons = subscribeOnLessons(student.id, (l) => {
      setLessons(l);
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
          <EditStudentDialog student={student} />
        </Toolbar>
        <Divider />
        <List>
          {lessons.map((lesson) => (
            <ListItem key={lesson.id} divider>
              <div className={classes.wrapper}>
                <div className={classes.header}>
                  <ListItemIcon>
                    <Avatar className={classes.lessonAvatar}>
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
                          Homework
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {lesson.homework}
                        </Typography>
                      </>
                    )}
                    {lesson.comment && (
                      <>
                        <Typography variant="subtitle1" gutterBottom>
                          Comment
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {lesson.comment}
                        </Typography>
                      </>
                    )}
                    {lesson.newWords && (
                      <>
                        <Typography variant="subtitle1" gutterBottom>
                          New words
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

import React from 'react';

import { useLocation, useParams } from 'react-router-dom';

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
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';

import useDatabase, { Lesson, Student } from '../hooks/useDatabase';
import Container from './Container';

const useStyles = makeStyles((theme: Theme) => createStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'spa',
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
}));

const LessonsList = () => {
  const [expanded, setExpanded] = React.useState<Lesson['id'] | null>(null);
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const classes = useStyles();
  const {
    state: { student },
  } = useLocation<{ student: Student }>();
  const { subscribeOnLessons } = useDatabase();
  const { id } = useParams<{ id: Student['id'] }>();

  const fullName = `${student.firstName} ${student.lastName}`;
  const inheritHeight = { height: 'inherit' };

  const handleClickExpand = (lessionID: Lesson['id']) => () => {
    if (lessionID === expanded) {
      setExpanded(null);

      return;
    }
    setExpanded(lessionID);
  };

  React.useEffect(() => {
    const unsubscribe = subscribeOnLessons(id, (lsns) => {
      setLessons(lsns);
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container style={inheritHeight} disableGutters maxWidth="sm">
      <Paper style={inheritHeight} variant="outlined" square>
        <Toolbar>
          <Typography variant="h5">{fullName}</Typography>
          <IconButton>
            <EditIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {lessons.map((lesson, index) => (
            <ListItem key={lesson.id} divider={index < lessons.length - 1}>
              <div className={classes.wrapper}>
                <div className={classes.header}>
                  <ListItemIcon>
                    <Avatar className={classes.lessonAvatar}>
                      {lesson.lessonNumber}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={lesson.date.toLocaleString()} />
                  <ListItemIcon>
                    <IconButton>
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
                  collapsedHeight={60}
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
                        {lesson.newWords.split(',').map((word) => (
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

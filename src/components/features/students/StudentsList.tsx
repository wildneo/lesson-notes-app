import React from 'react';

import { generatePath, useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import useDatabase, { Student } from '../../../hooks/useDatabase';
import Container from '../../Container';
import Paper from '../../Paper';

export interface StudentsListProps {
  defaultStudents: Student[];
}

const getFullName = (student: Student) =>
  `${student.firstName} ${student.lastName}`;

const getInitials = (student: Student) =>
  `${student.firstName[0]}${student.lastName[0]}`;

const StudentsList = ({ defaultStudents }: StudentsListProps) => {
  const [students, setStudents] = React.useState<Student[]>(defaultStudents);
  const { subscribeOnStudents } = useDatabase();
  const history = useHistory();

  const handleItemClick = (student: Student) => () => {
    const path = generatePath('/students/:id', { id: student.id });
    history.push(path, { student });
  };

  React.useEffect(() => {
    const unsubscribe = subscribeOnStudents(setStudents);

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Paper>
        <Toolbar>
          <Typography variant="h5">Students list</Typography>
        </Toolbar>
        <Divider />
        <List>
          {students.map((student) => (
            <ListItem
              key={student.id}
              onClick={handleItemClick(student)}
              divider
              button
            >
              <ListItemAvatar>
                <Avatar>{getInitials(student)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={getFullName(student)} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default React.memo(StudentsList);

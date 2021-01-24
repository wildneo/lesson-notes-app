import React, { useState } from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import useContextMenu from '../../../hooks/useContextMenu';
import useDatabase, {
  LessonFormValues,
  Lesson,
  Student,
} from '../../../hooks/useDatabase';
import schema from '../../../schemas/newLesson';
import { Nullable, RequestStatus } from '../../../typings';
import { pickUpdatedFields } from '../../../utils';
import LessonForm, { LessonFormProps } from '../../LessonForm';

export interface EditLessonDialogProps {
  lesson: Lesson;
}

const defaultValues: LessonFormValues = {
  date: new Date(),
  lessonNumber: '',
  lessonPlan: '',
  homework: '',
  comment: '',
  newWords: '',
};

const EditLessonDialog = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>('none');
  const [student, setStudent] = useState<Nullable<Student>>(null);
  const [lesson, setLesson] = useState<Nullable<Lesson>>(null);
  const [formValues, setFormValues] = useState(defaultValues);
  const [open, setOpen] = useState(false);
  const { state, index, setIndex } = useContextMenu<{
    student: Student;
    lesson: Lesson;
  }>();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { updateLesson } = useDatabase();

  const isLoading = requestStatus === 'requested';

  React.useEffect(() => {
    if (state) {
      setStudent(state.student);
      setLesson(state.lesson);
      setFormValues({
        date: state.lesson.date,
        lessonNumber: state.lesson.lessonNumber,
        lessonPlan: state.lesson.lessonPlan,
        homework: state.lesson.homework,
        comment: state.lesson.comment,
        newWords: state.lesson.newWords.join(','),
      });
    }
  }, [state]);

  React.useEffect(() => {
    if (index === 0) {
      setOpen(true);
    }
  }, [index]);

  const handleClose = () => {
    setOpen(false);
    setIndex(-1);
  };

  const handleUpdateLesson: LessonFormProps['onSubmit'] = async (
    values,
    dirtyFields,
  ) => {
    if (student && lesson) {
      setRequestStatus('requested');
      try {
        const updatedFields = pickUpdatedFields(values, dirtyFields);
        await updateLesson(student.id, lesson.id, updatedFields);
        setRequestStatus('finished');
      } catch (error) {
        setRequestStatus('failed');
      }
    }
    setOpen(false);
    setIndex(-1);
  };

  return (
    <Dialog
      onClose={handleClose}
      fullScreen={fullScreen}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Edit lesson</DialogTitle>
      <LessonForm
        defaultValues={formValues}
        isLoading={isLoading}
        schema={schema}
        onSubmit={handleUpdateLesson}
        onCancel={handleClose}
      />
    </Dialog>
  );
};

export default React.memo(EditLessonDialog);

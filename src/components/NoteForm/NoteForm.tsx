import css from './NoteForm.module.css'
import type { Note } from "../../types/note";
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import { useId } from "react";
import * as Yup from "yup";

interface NoteFormProps {
  onClose: () => void;
  note: Note;
}

const NoteForm = ({ onClose, note }: NoteFormProps) => {
  const id = useId();

  const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title is too long")
    .required("Title is required"),
  content: Yup.string()
    .min(10, "Content must be at least 10 characters")
    .max(500, "Content is too long")
    .required("Content is required"),
});

  const initialValues: Note = {
    id: note.id,
    title: note.title,
    content: note.content,
    tag: note.tag || "Todo",
  };

  const handleSubmit = (
    values: Note,
    actions: FormikHelpers<Note>
  ) => {
    console.log("Note data:", values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${id}-title`}>Title</label>
          <Field id={`${id}-title`} type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${id}-content`}>Content</label>
          <Field
            id={`${id}-content`}
            name="content"
            rows={8}
            className={css.textarea}
            as="textarea"
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${id}-tag`}>Tag</label>
          <Field id={`${id}-tag`} name="tag" className={css.select} as="select">
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} onClick={onClose}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
import { FormDataProps } from '../models/formModel';

// In-memory storage for now
const forms: FormDataProps[] = [];

export const getFormRepo = () => {
  return {
    saveForm: (FormDataProps: FormDataProps) => {
      const newForm = {
        id: forms.length + 1,
        ...FormDataProps,
        submittedAt: new Date(),
      };

      forms.push(newForm);
      return newForm;
    },
  };
};

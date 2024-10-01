import { FormDataProps } from '../models/formModel';

export const submitForm = async (formData: FormDataProps): Promise<any> => {
  // TODO: rework this to have res type
  try {
    const response = await fetch('http://localhost:3001/api/forms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error((error as Error).message || 'Unknown error occurred');
  }
};

import { Request, Response } from 'express';
import { submitForm } from '../services/form/submitForm';

export const handleFormSubmit = (req: Request, res: Response) => {
  try {
    const FormDataProps = req.body;
    const result = submitForm(FormDataProps);
    if (result.outcome !== 'SUCCESS') {
      // TODO: improve error message
      res.status(400).json(result);
      return;
    }

    res.status(200).json(result);
    return;
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: (error as Error).message,
    });
    return;
  }
};

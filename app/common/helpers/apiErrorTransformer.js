import { SubmissionError } from 'redux-form';

export const apiErrorToSubmissionError = (errorResponse) => {
  const formError = { _error: '' };

  const stripPrefix = entry => entry.substring(2, entry.length); // $.name --> name

  const attachFieldErrors = (fieldErrors) => {
    if (fieldErrors) {
      for (const item of fieldErrors) {
        formError[stripPrefix(item.entry)] = item.rules.map(rule => rule.description).join('; ');
      }
    }
  };

  if (errorResponse && errorResponse.error) {
    attachFieldErrors(errorResponse.error.invalid);
    formError._error = errorResponse.error.message; // general form error
    return new SubmissionError(formError);
  }
  return errorResponse;
};

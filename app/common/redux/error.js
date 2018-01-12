import { createAction, handleActions } from 'redux-actions';

export const addError = createAction('error/ADD');
export const clearError = createAction('error/CLEAR');

export default handleActions({
  [addError]: (state, action) => ({
    ...state,
    ...action.payload.errors,
  }),
  [clearError]: () => ({}),
}, {});

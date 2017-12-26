import { expect } from 'chai';
import { SubmissionError } from 'redux-form';

import { apiErrorToSubmissionError } from './apiErrorTransformer';

const mockApiError = {
  meta: {
    url: 'http://api-svc.mithril/admin/roles',
    type: 'object',
    request_id: '89f6c35e-d9c2-495d-ab8f-0dd2e6e9cb04#331',
    code: 422,
  },
  error: {
    type: 'validation_failed',
    message: 'test_message',
    invalid: [{
      rules: [{ rule: null, params: [], description: 'has already been taken' }, { rule: null, params: [], description: 'some random error' }],
      entry_type: 'json_data_property',
      entry: '$.name',
    }],
  },
};

describe('apiErrorToSubmissionError', () => {
  it('returns > 1 field error in correct format', () => {
    expect(apiErrorToSubmissionError(mockApiError)).to.deep.equal(new SubmissionError({ name: 'has already been taken; some random error', _error: 'test_message' }));
  });
  it('returns initial object if there is no error', () => {
    expect(apiErrorToSubmissionError(undefined)).to.equal(undefined);
    expect(apiErrorToSubmissionError({ test: 'test' })).to.deep.equal({ test: 'test' });
  });
});

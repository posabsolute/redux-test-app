import { CALL_API } from '../middlewares/api';
import issueModel from '../models/issue.model';
import commentModel from '../models/comment.model';
import {ISSUE_REQUEST, ISSUE_FETCH, ISSUE_FETCH_FAILURE, ISSUE_CLEAR,
	ADD_COMMENT_REQUEST, ADD_COMMENT_FETCH, ADD_COMMENT_FAILURE } from './types/issue.types';

export function fetchIssue(id) {
  return {
    [CALL_API]: {
      types: [ ISSUE_REQUEST, ISSUE_FETCH, ISSUE_FETCH_FAILURE ],
      endpoint: issueModel.endpoint(id),
      dataProcessor: issueModel.endpointProcessor,
      model: issueModel,
    },
  };
}

export function clearIssue() {
  return {
    type: ISSUE_CLEAR,
  };
}

export function addComment(comment, id) {
  return {
    [CALL_API]: {
      types: [ ADD_COMMENT_REQUEST, ADD_COMMENT_FETCH, ADD_COMMENT_FAILURE ],
      method: 'POST',
      postData: {
      	'body': comment,
      },
      endpoint: commentModel.endpoint(id),
      model: commentModel,
    },
  };
}

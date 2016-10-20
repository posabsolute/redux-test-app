import { CALL_API } from '../middlewares/api';
import issueModel from '../models/issue.model';
import commentModel from '../models/comment.model';
import {ISSUE_REQUEST, ISSUE_FETCH, ISSUE_FETCH_FAILURE, ISSUE_CLEAR,
        ISSUE_USERS_REQUEST, ISSUE_USERS_FETCH, ISSUE_USERS_FAILURE,
        ISSUE_UPDATE_REQUEST, ISSUE_UPDATE_FETCH, ISSUE_UPDATE_FAILURE, ISSUE_UPDATE_USER, ISSUE_UPDATE_PRIORITY, ISSUE_UPDATE_STATUS,
        ISSUE_UPDATE_DESCRIPTION, ISSUE_UPDATE_SUMMARY,
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

export function fetchIssueUsers(id) {
  return {
    [CALL_API]: {
      types: [ ISSUE_USERS_REQUEST, ISSUE_USERS_FETCH, ISSUE_USERS_FAILURE ],
      endpoint: issueModel.endpointUserAssignable(id),
      model: issueModel,
    },
  };
}

export function assignIssue(name, id, userObject) {
  return (dispatch) => {
    dispatch({
      type: ISSUE_UPDATE_USER,
      data: userObject,
    });
    dispatch({
      [CALL_API]: {
        types: [ ISSUE_UPDATE_REQUEST, ISSUE_UPDATE_FETCH, ISSUE_UPDATE_FAILURE ],
        method: 'PUT',
        postData: {
          update: {
            'assignee': [{'set': {'name': name}}],
          },
        },
        endpoint: issueModel.endpointUpdate(id),
        model: issueModel,
      },
    });
  }
}

export function saveDescriptionIssue(description, id) {
  return (dispatch) => {
    dispatch({
      type: ISSUE_UPDATE_DESCRIPTION,
      data: description,
    });

    dispatch({
      [CALL_API]: {
        types: [ ISSUE_UPDATE_REQUEST, ISSUE_UPDATE_FETCH, ISSUE_UPDATE_FAILURE ],
        method: 'PUT',
        postData: {
          update: {
            'description': [{'set': description}],
          },
        },
        endpoint: issueModel.endpointUpdate(id),
        model: issueModel,
      },
    });
  }
}

export function savePriorityIssue(priority, id, priorityData) {
  return (dispatch) => {
    dispatch({
      type: ISSUE_UPDATE_PRIORITY,
      data: priorityData,
    });

    dispatch({
      [CALL_API]: {
        types: [ ISSUE_UPDATE_REQUEST, ISSUE_UPDATE_FETCH, ISSUE_UPDATE_FAILURE ],
        method: 'PUT',
        postData: {
          update: {
            'priority': [{ 'set': { 'name': priority }}],
          },
        },
        endpoint: issueModel.endpointUpdate(id),
        model: issueModel,
      },
    });
  };
}

export function saveStatusIssue(statusID, id, statusData) {
  return (dispatch) => {
    dispatch({
      type: ISSUE_UPDATE_STATUS,
      data: statusData,
    });

    dispatch({
      [CALL_API]: {
        types: [ ISSUE_UPDATE_REQUEST, ISSUE_UPDATE_FETCH, ISSUE_UPDATE_FAILURE ],
        method: 'POST',
        postData: {
          'transition': {
            'id': statusID,
          },
        },
        endpoint: issueModel.endpointTransitions(id),
        model: issueModel,
      },
    });
  };
}

export function savePointsIssue(points, field, id) {
  return {
    [CALL_API]: {
      types: [ ISSUE_UPDATE_REQUEST, ISSUE_UPDATE_FETCH, ISSUE_UPDATE_FAILURE ],
      method: 'PUT',
      postData: {
        update: {
          [field]: [{'set': points} ],
        },
      },
      error: 'Story points edition is not on the appropriate screen.',
      endpoint: issueModel.endpointUpdate(id),
      model: issueModel,
    },
  };
}

export function saveSummaryIssue(summary, id) {
  return (dispatch) => {
    dispatch({
      type: ISSUE_UPDATE_SUMMARY,
      data: summary,
    });

    dispatch({
      [CALL_API]: {
        types: [ ISSUE_UPDATE_REQUEST, ISSUE_UPDATE_FETCH, ISSUE_UPDATE_FAILURE ],
        method: 'PUT',
        postData: {
          update: {
            'summary': [{'set': summary} ],
          },
        },
        endpoint: issueModel.endpointUpdate(id),
        model: issueModel,
      },
    });
  };
}

export function addComment(comment, id) {
  return {
    [CALL_API]: {
      types: [ ADD_COMMENT_REQUEST, ADD_COMMENT_FETCH, ADD_COMMENT_FAILURE ],
      method: 'POST',
      postData: {
      	"body": comment,
      },
      endpoint: commentModel.endpoint(id),
      model: commentModel,
    },
  };
}

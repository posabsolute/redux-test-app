import { Schema, arrayOf, normalize } from 'normalizr';
//import {GROWLER__SHOW} from 'actions/types/growler.types';
import $  from 'jquery';

const API_ROOT = 'http://127.0.0.1:8080/';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, user, dataProcessor, store, sideEffectSuccess, method, postData) {
  const callUrl = user.url + endpoint;
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + callUrl : callUrl;
  console.log(postData);
  /*
  const request = new Request(fullUrl, {
    method: method || 'GET',
    credentials: 'same-origin',
    headers: new Headers({
      'X-Atlassian-Token' : 'nocheck',
      'Authorization': 'Basic ' + btoa(user.username + ':' + user.password),
    })
  });

  // Now use it!
  return fetch(request).then((resp) => { return resp.json(); }).then((data) => {
    console.log(data)
    if (sideEffectSuccess) {
      sideEffectSuccess.call(this, store.dispatch);
    }
    return (dataProcessor) ? dataProcessor(data) : data;

  }, (data, status, response) =>{
    store.dispatch({
      type: 'GROWLER__SHOW',
      growler: {
        text: response,
        type: 'growler--error',
      },
    });

  });
/* */
  return $.ajax({
    url: fullUrl,
    data: JSON.stringify(postData),
    processData: false,
    xhrFields: {
      withCredentials: true,
    },
    contentType: "application/json",
    method: method || 'GET',
    headers: {
      'Accept': 'application/json',
      'X-Atlassian-Token' : 'no-check',
      'x-requested-with': 'XMLHttpRequest',
      'Authorization': 'Basic ' + btoa(user.username + ':' + user.password),
    },
  })
  .then((data) => {
    if (sideEffectSuccess) {
      sideEffectSuccess.call(this, store.dispatch);
    }
    return (dataProcessor) ? dataProcessor(data) : data;

  }, (data, status, response) =>{
    store.dispatch({
      type: 'GROWLER__SHOW',
      growler: {
        text: response,
        type: 'growler--error',
      },
    });

  });

}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  console.log("tabrnak");
  let { endpoint } = callAPI;
  const { dataProcessor, types, callData, sideEffectSuccess, validate, method, postData } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());

  }
  if (validate && !validate(store.dispatch, callData)) {
    return next({type: 'MODEL_VALIDATION_FAILURE'});
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ data: callData, type: requestType }));
  const user = store.getState().user;


  return callApi(endpoint, user, dataProcessor, store, sideEffectSuccess, method, postData).then(
    data => next(actionWith({
      data,
      type: successType,
    })),
    error => {
      next(actionWith({
        type: failureType,
        data: callData,
        error: error || 'Something bad happened',
      }));
    }
  );
};

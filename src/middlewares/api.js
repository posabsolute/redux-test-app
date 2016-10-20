import $  from 'jquery';
import { push } from 'react-router-redux';
const API_ROOT = '';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, user, dataProcessor, store, sideEffectSuccess, method, postData, error) {
  const callUrl = user.url + endpoint;
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + callUrl : callUrl;

  return new Promise((resolve, reject) => {
    let allPagedData = [];
    ajaxCall();

    function ajaxCall(startAt) {
      const param = fullUrl.indexOf('?') > -1 ? '&' : '?';
      const url = startAt ? `${fullUrl}${param}startAt=${startAt}` : fullUrl;

      if (window.cordovaFetch) {
        cordovaFetch(url, {
          body: JSON.stringify(postData),
          method: method || 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-requested-with': 'XMLHttpRequest',
            'Authorization': 'Basic ' + btoa(user.username + ':' + user.password),
          },
        })
        .then((resp) => {
            console.log(resp);
          if (resp.status === 200 || rest.status === 201 || rest.status === 204) {
            success(JSON.parse(resp.statusText));
          } else {
            catchError(resp.responseText, resp.status, resp);
          }
        });

      } else {

        $.ajax({
          url: url,
          data: JSON.stringify(postData),
          processData: false,
          crossDomain: true,
          contentType: 'application/json',
          method: method || 'GET',
          headers: {
            'Accept': 'application/json',
            'x-requested-with': 'XMLHttpRequest',
            'Authorization': 'Basic ' + btoa(user.username + ':' + user.password),
          },
        })
        .then((data) => {
          success(data);
        }, (data, status, response) =>{
          catchError(data, status, response);
        });
      }

      function success(data) {
        console.log('success', data);
        const pageData = (dataProcessor) ? dataProcessor(data) : data;
        if (!data) {
          resolve([]);
          return;
        }
        if (data.isLast === false) {
          allPagedData = [
            ...allPagedData,
            ...pageData,
          ];

          const newStartPage = data.startAt + data.maxResults;
          ajaxCall(newStartPage);
        }else {
          if (!allPagedData.length) {
            allPagedData = pageData;
          }else {
            allPagedData = [
              ...allPagedData,
              ...pageData,
            ];
          }
          if (sideEffectSuccess) {
            sideEffectSuccess.call(this, store.dispatch);
          }
          resolve(allPagedData);
        }
      }

      function catchError(data, status, response) {
        console.log('error', response);
        let errorText = response;
        if (data.status === 0) {
          errorText = 'No Server';
        }
        if (data.status === 401) {
          errorText = 'Unauthorized';
        }

        if (errorText && errorText !== 'Bad Request' ) {
          store.dispatch({
            type: 'GROWLER__SHOW',
            growler: {
              text: errorText,
              type: 'growler--error',
            },
          });
        }

        if (data.status === 401) {
          localStorage.removeItem('password');
          store.dispatch(push('/login'));
        }

        if (error) {
          store.dispatch({
            type: 'GROWLER__SHOW',
            growler: {
              text: error,
              type: 'growler--error',
            },
          });
        }

        reject(data);
      }
    }
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

  let { endpoint } = callAPI;
  const { dataProcessor, types, callData, sideEffectSuccess, validate, method, postData, notification, error } = callAPI;

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

  console.log(this);
  return callApi(endpoint, user, dataProcessor, store, sideEffectSuccess, method, postData, error).then(
    data => next(actionWith({
      data,
      notification,
      type: successType,
    }))).catch( error => {
      next(actionWith({
        type: failureType,
        data: callData,
        error: error || 'Something bad happened',
      }));
    }
  );
};

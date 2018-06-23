/**
|--------------------------------------------------
| source: [{path: 'email', message: 'xxx'},{}]
| target: {email: 'e1', 'e2', 'e3'}
|--------------------------------------------------
*/

export default (errors) =>
  errors.reduce((acc, cv) => {
    if (cv.path in acc) {
      acc[cv.path].push(cv.message);
    } else {
      acc[cv.path] = [cv.message];
    }
    return acc;
  }, {});

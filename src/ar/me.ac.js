import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

export function reduxify(component, store = {}) {
  const mapStateToProps = stateFromStore => ({
    me: stateFromStore.me,
    ...store,
  });

  const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(component));
}

const defaultFetchParams = {
  mode: "cors",
  cache: "no-cache",
  headers: { "Content-Type": "application/json" },
  redirect: "follow",
};

export function post(path, postData) {
  let p = process.env.API_URL + `/api/` + path;
  console.log("making http POST to " + p);
  console.log("with postData", postData);

  return fetch(p, {
    ...defaultFetchParams,
    method: "POST",
    body: JSON.stringify(postData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(error => {
      throw error;
    });
}

export function onLanding() {
  console.log("firing onLanding");
}

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";

export const addClassLists = () => {
  document.body.classList.add("landing-page");
  document.body.classList.add("sidebar-collapse");
  document.documentElement.classList.remove("nav-open");
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  return function cleanup() {
    document.body.classList.remove("landing-page");
    document.body.classList.remove("sidebar-collapse");
  };
};

export function reduxify(component, store = {}) {
  const mapStateToProps = stateFromStore => ({
    me: stateFromStore.me,
    ...store,
  });

  const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
  return withRouter(connect(mapStateToProps, mapDispatchToProps)(component));
}

export function onLanding() {
  console.log("firing onLanding");
}

const defaultFetchParams = {
  mode: "cors",
  cache: "no-cache",
  headers: { "Content-Type": "application/json" },
  redirect: "follow",
};

export function post(path, postData) {
  //let p = process.env.API_URL + `/api/` + path;
  let p = `http://localhost:8080/api/` + path;
  console.log("making http POST to " + p);
  console.log("with postData", postData);

  return fetch(p, {
    ...defaultFetchParams,
    method: "POST",
    body: JSON.stringify(postData),
  })
    .then(response => {
      return response.json();
    })
    .then(result => {
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    })
    .catch(error => {
      throw error;
    });
}

export function get(path) {
  //let p = process.env.API_URL + `/api/` + path;
  let p = `http://localhost:8080/api/` + path;
  console.log("making http GET to " + p);
  return fetch(p, {
    ...defaultFetchParams,
    method: "GET",
  })
    .then(response => {
      return response.json();
    })
    .then(result => {
      if (result.error) {
        throw new Error(result.error);
      }
      return result;
    })
    .catch(error => {
      throw error;
    });
}

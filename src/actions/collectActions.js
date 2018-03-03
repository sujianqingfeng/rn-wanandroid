import { createAction } from "redux-actions";

import HttpUtil from "../utils/HttpUtil";
import * as collectTypes from "../constants/collectTypes";

function postAddCollectInSite(id) {
  return dispatch => {
    dispatch(createAction(collectTypes.FETCH_ADD_IN_SITE_DOING)());
    HttpUtil.post("/lg/collect/" + id + "/json", { id: id })
    .then(res =>dispatch(createAction(collectTypes.FETCH_ADD_IN_SITE_DONE)(res.data)))
    .catch(e=>{})
  };
}

function postAddCollectOutSite(title, author, link) {
  return dispatch => {
    HttpUtil.post("/lg/collect/add/json", {
      title: ititle,
      author: author,
      like: like
    }).then(res =>
      dispatch(createAction(collectTypes.FETCH_ADD_OUT_SITE_DONE)(res.data))
    );
  };
}

function postCancelCollectInArticle(id) {
  return dispatch => {
    HttpUtil.post("/lg/uncollect_originId/" + id + "/json").then(res =>
      dispatch(
        createAction(collectTypes.FETCH_CANCEL_IN_ARTICLE_DONE)(res.data)
      )
    );
  };
}

function postCancelCollectInMy(id) {
  return dispatch => {
    HttpUtil.post("/lg/uncollect/" + id + "/json").then(res =>
      dispatch(createAction(collectTypes.FETCH_CANCEL_IN_MY_DONE)(res.data))
    );
  };
}

export {
  postAddCollectInSite,
  postAddCollectOutSite,
  postCancelCollectInArticle,
  postCancelCollectInMy
};

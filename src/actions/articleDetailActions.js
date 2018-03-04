import { createAction } from "redux-actions"

import HttpUtil from "../utils/HttpUtil"
import * as articleDetailTypes from "../constants/articleDetailTypes"

function detailAddCollectInSite(id) {
  return dispatch => {
    dispatch(createAction(articleDetailTypes.FETCH_DETAIL_ADD_IN_SITE_DOING)());
    HttpUtil.post("/lg/collect/" + id + "/json", { id: id })
    .then(res =>dispatch(createAction(articleDetailTypes.FETCH_DETAIL_ADD_IN_SITE_DONE)()))
    .catch(e=>{})
  };
}

// function detailAddCollectOutSite(title, author, link) {
//   return dispatch => {
//     HttpUtil.post("/lg/collect/add/json", {
//       title: ititle,
//       author: author,
//       like: like
//     }).then(res =>
//       dispatch(createAction(collectTypes.FETCH_ADD_OUT_SITE_DONE)(res.data))
//     );
//   };
// }

function detailCancelCollectInArticle(id) {
  return dispatch => {
    HttpUtil.post("/lg/uncollect_originId/" + id + "/json").then(res =>
      dispatch(
        createAction(articleDetailTypes.FETCH_DETAIL_CANCEL_IN_ARTICLE_DONE)()
      )
    );
  };
}

// function detailCancelCollectInMy(id) {
//   return dispatch => {
//     HttpUtil.post("/lg/uncollect/" + id + "/json").then(res =>
//       dispatch(createAction(collectTypes.FETCH_CANCEL_IN_MY_DONE)(res.data))
//     );
//   };
// }

export {
  detailAddCollectInSite,
  detailCancelCollectInArticle
}

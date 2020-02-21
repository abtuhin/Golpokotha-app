import { combineReducers } from "redux";
import { articleReducer } from "../modules/articles/reducers";
import { libraryReducer } from "../modules/library/reducers";
import { storyReducer } from "../modules/stories/reducers";
import { authReducer } from "../modules/auth/reducers";
import { storyWriteReducer } from "../modules/storywrite/reducers";

const appReducers = combineReducers({
  articles: articleReducer,
  library: libraryReducer,
  story: storyReducer,
  auth: authReducer,
  storyWrite: storyWriteReducer
});

const reducers = (state, action) => {
  return appReducers(state, action);
};

export default reducers;

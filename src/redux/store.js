import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userCredentialsReducer from "./slices/userCredentialSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import modalReducers from "./slices/modalSlice";
import workspaceReducer from "./slices/workspaceSlice";
import projectModalReducers from "./slices/projectModalSlice";
import taskModalReducers from "./slices/taskModalSlice";
import taskViewReducers from "./slices/taskViewSlice";

const rootReducer = combineReducers({
  userCredentials: userCredentialsReducer,
  modal: modalReducers,
  workspace: workspaceReducer,
  projectModal: projectModalReducers,
  taskModal: taskModalReducers,
  taskView: taskViewReducers,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;

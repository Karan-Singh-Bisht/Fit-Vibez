import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./Auth/userAuthSlice";

export default configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});

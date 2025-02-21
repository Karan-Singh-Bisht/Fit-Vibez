import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./Auth/userAuthSlice";
import ActivitySlice from "./Ai/AiSlice";

export default configureStore({
  reducer: {
    userAuth: userAuthReducer,
    Actvity: ActivitySlice,
  },
});

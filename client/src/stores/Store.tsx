import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "../slices/UserSlice";
import sessionReducer from "../slices/SessionSlice";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, userReducer),
    session: persistReducer(persistConfig, sessionReducer),
  },
});

let persistor = persistStore(store);

export { store, persistor };

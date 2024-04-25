import { configureStore } from "@reduxjs/toolkit";
import excelReduer from "../slices/excelSlice";

const store = configureStore({
  reducer: {
    excelSlice: excelReduer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});
export default store;

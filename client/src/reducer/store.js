// 다크모드, 다시보지않기 같은 쿠기를 여기서 설정 할 수 있음
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export default configureStore({
    reducer: {
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import todo from './todo';



const rootReducer = combineReducers({
   todo,
});

export default configureStore({reducer: rootReducer});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;



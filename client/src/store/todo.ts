import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {tDELETE, tGET, tPOST, tPUT} from "../../../server/src/api/types/todo";
import {json, status} from "../utils/fetch";




//Async actions
const URL = 'http://localhost:8000/api/todo/';

export const fetchAllTodo = createAsyncThunk<tGET["ResponseBody"], tGET["Param"]>(
    'todo/fetchAllTodo',
    ({count, page}) => {
        let query = '';
        if(count != undefined) {
            query += count + '/';
            if(page != undefined)
                query += page + '/';
        }

        return fetch(URL+query, {
            headers: {
                'Accept': 'application/json',
            }
        }).then(status).then(json);
    }
);

export const fetchCreateTodo = createAsyncThunk<tPOST["ResponseBody"], tPOST["RequestBody"]>(
    'todo/fetchCreateTodo',
    (payload) => {
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(status).then(json);
    }
);

export const fetchUpdateTodo = createAsyncThunk<tPUT["ResponseBody"], {param: tPUT["Param"], body: tPUT["RequestBody"]}>(
    'todo/fetchUpdateTodo',
    ({param, body}) => {
        return fetch(URL+param.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(status).then(json);

    }
);

export const fetchDeleteTodo = createAsyncThunk<tDELETE["ResponseBody"], tDELETE["Param"]>(
    'todo/fetchDeleteTodo',
    ({id}) => {
        return fetch(URL+id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
            },
        }).then(status).then(json);
    }
);


//State types
export interface ITodo {
    _id: string
    text: string;
    performed: boolean;
}

interface tState {
    items: ITodo[];
    total: number;
}


//Slice
const todo = createSlice({
    name: 'todo',
    initialState: <tState>{
        items: [],
        total: 0
    },
    reducers: {
        // setPage(state, action: PayloadAction<number>) {
        //     state.page = limit(action.payload, 1, state.total);
        // },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllTodo.fulfilled, (state, action) => {
                const {todos, total} = action.payload;
                state.total = total;
                state.items = todos;

            }).addCase(fetchCreateTodo.fulfilled, (state, action) => {
                const {_id, text} = action.payload;

            }).addCase(fetchUpdateTodo.fulfilled, (state, action) => {
                const {_id, text} = action.payload;
                const item = state.items.find(item => item._id == _id);
                if(item) item.text = text;

            }).addCase(fetchDeleteTodo.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id == action.payload._id);
                if(Number.isInteger(index)) state.items.splice(index, 1);
            })
    },
});

// export const { setPage } = todo.actions;
export default todo.reducer;

import React, {useCallback} from "react";
import {fetchAllTodo} from "../../store/todo";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../store";
import Item from "./item"
import Pagination from "../ui/Pagination";



const List = () => {
    const dispatch = useDispatch();
    console.log('list render ')

    const toDoList = useTypedSelector(state => state.todo.items);

    const countItems = 5;

    const countPages = useTypedSelector(state => Math.ceil(state.todo.total / countItems));
    const pageParam = 'page';

    const getPage = useCallback(
        (page: number) => {
            console.log('ca', page)
            dispatch(fetchAllTodo({count: countItems, page}));
        },
        [countItems],
    );

    return (
        <div className="list">
            {toDoList.map(todo =>
                <Item id={todo._id} text={todo.text} key={todo._id}/>
            )}
            <Pagination getParam={pageParam} total={countPages} onSetPage={getPage}/>
        </div>
    );
}

export default React.memo(List);
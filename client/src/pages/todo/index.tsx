import React, {FormEvent, useState} from 'react';
import './style.css';
import {useDispatch} from "react-redux";
import {fetchCreateTodo} from '../../store/todo';
import ToDoList from "../../components/todo/list"



const Todo = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);
    }

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        if(inputValue !== '') {
            dispatch(fetchCreateTodo({text: inputValue}));
            setInputValue('');
        }
    }

    return (
        <div className="App">
            <h1>TO-DO LIST</h1>
            <div className="content">
                <form onSubmit={onSubmit}>
                    <input type="text" value={inputValue} onChange={onChange}/>
                    <input type="submit" value="add"/>
                </form>
                <ToDoList/>
            </div>
        </div>
    );
};

export default Todo;
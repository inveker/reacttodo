import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {faFeatherAlt, faTrash, faSdCard, faEraser} from "@fortawesome/free-solid-svg-icons";
import {faSquare, faCheckSquare} from "@fortawesome/free-regular-svg-icons";
import BtnIcon from "../ui/BtnIcon";
import {fetchDeleteTodo, fetchUpdateTodo} from '../../store/todo';



const Item: React.FC<{id: string, text: string}> = ({id, text}) => {
    console.log('item renbder')
    const dispatch = useDispatch();
    const [editText, setEditText] = useState(text);
    const [isEdit, setIsEdit] = useState(false);

    function onInput(e: React.ChangeEvent<HTMLInputElement>) {
        setEditText(e.target.value)
    }

    function save() {
        setIsEdit(false);
        dispatch(fetchUpdateTodo({param: {id}, body: {text: editText}}));
    }

    function cancel() {
        setIsEdit(false);
        setEditText(text);
    }

    function removeItem() {
        dispatch(fetchDeleteTodo({id}));
    }

    return isEdit
        ? (
            <div className="list_item">
                <input type="text" value={editText} onInput={onInput}/>
                <div className="controls">
                    <BtnIcon
                        icon={faEraser}
                        onClick={cancel}
                        className={'undo'}
                        title="undo"
                    />
                    <BtnIcon
                        icon={faSdCard}
                        onClick={save}
                        className={'save'}
                        title="save"
                    />
                </div>
            </div>
        ) : (
            <div className="list_item">
                <BtnIcon icon={faSquare} onClick={()=>console.log('check')} />
                <BtnIcon icon={faCheckSquare} onClick={()=>console.log('check')} />
                <input type="checkbox" />
                <span>{text}</span>
                <div className="controls">
                    <BtnIcon
                        icon={faFeatherAlt}
                        onClick={() => setIsEdit(true)}
                        className={'edit'}
                        title="edit"
                    />
                    <BtnIcon
                        icon={faTrash}
                        onClick={removeItem}
                        className={'delete'}
                        title="delete"
                    />
                </div>
            </div>
        );
}

export default Item;
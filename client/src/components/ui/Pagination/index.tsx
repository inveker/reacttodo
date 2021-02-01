import React, {useEffect, useRef, useState} from 'react';
import styles from './style.module.css';
import BtnIcon from "../BtnIcon";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";
import {limit} from "../../../utils/functions";



interface tProp {
    getParam: string;
    total: number;
    onSetPage?(page: number): any;
}

const Pagination: React.FC<tProp> = (props) => {
    console.log('pag render')
    const history = useHistory();
    const query = new URLSearchParams(history.location.search);
    const _page = Number(query.get(props.getParam)) || 1;
    const [state, setState] = useState({
        page: _page,
        inputValue: String(_page)
    });

    //Change query url
    useEffect(() => {
        let lastPage = state.page;
        history.listen(({search}) => {
            const q = new URLSearchParams(search);
            const p = Number(q.get(props.getParam)) || 1;
            if(p != lastPage) {
                lastPage = p;
                setState({
                    page: p,
                    inputValue: String(p)
                });
            }
        });
    }, [])

    //Callback parent component
    useEffect(() => {
        console.log('callback')
        if(props.onSetPage)
            props.onSetPage(state.page);
    }, [state.page])

    //Input action
    function handler(p: number) {
        const page = limit(p, 1, props.total);
        query.set(props.getParam, String(page))
        history.push({
            search: query.toString()
        });
    }

    return (
        <div className={styles.pagination}>
            <BtnIcon
                className={'arrow'}
                style={state.page <= 1 ? {visibility: "hidden"} : {}}
                icon={faAngleLeft}
                onClick={() => handler(state.page - 1)}
            />
            <input
                type="number"
                value={state.inputValue}
                className={styles.input}
                onBlur={() => handler(Number(state.inputValue))}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setState({...state, inputValue: e.target.value})}
                style={{width: state.inputValue.length + 'ch'}}
            />
            <BtnIcon
                className={'arrow'}
                style={state.page >= props.total ? {visibility: "hidden"} : {}}
                icon={faAngleRight}
                onClick={() => handler(state.page + 1)}/>
            <span>/ {props.total}</span>
        </div>
    );
};

export default React.memo(Pagination);
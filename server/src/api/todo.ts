import express from 'express';
import Todo, {ITodo} from '../db/model/todo'
import {tDELETE, tGET, tPOST, tPUT} from "./types/todo";
import {tError, tParamString} from "./types";



const router = express.Router();


router.get<tParamString<tGET["Param"]>, tGET["ResponseBody"] | tError>('/:count?/:page?/', (req, res) => {
    //Params
    let count;
    if(req.params.count != undefined) {
        count = Number(req.params.count);
        if(!count || count < 0)
            return res.status(400).send('Count must be a number greater than zero');
    }

    let page;
    if(req.params.page != undefined) {
        page = Number(req.params.page);
        if(!page || page < 0)
            return res.status(400).send('Page must be a number greater than zero');
    }

    //Count all docs
    const total = Todo.countDocuments().exec();

    //Find
    const cursor = Todo.find({}, {}, {sort:{$natural:-1}});
    if(page && count)
        cursor.skip((page - 1) * count);
    if(count)
        cursor.limit(count)
    const find = cursor.exec()

    //Result
    Promise.all([total, find]).then((arr) => {
        res.send({
            todos: arr[1],
            total: arr[0],
        });
    }).catch(e => {
        res.status(500).send()
    });
});


router.post<null, tPOST["ResponseBody"] | tError, tPOST["RequestBody"]>('/', (req, res) => {

    if(typeof req.body.text != 'string')
        return res.status(400).send('The request body.text must be a string');
    if(typeof req.body.performed != 'boolean')
        return res.status(400).send('The request body.boolean must be a string');

    let todo = new Todo();
    todo.text = req.body.text;
    todo.performed = req.body.performed;
    todo.save()
        .then((todo) => res.send({
            _id: todo._id,
            text: todo.text,
            performed: todo.performed
        }))
        .catch(() => res.status(500).send());
});


router.put<tParamString<tPUT["Param"]>, tPUT["ResponseBody"] | tError, tPUT["RequestBody"]>('/:id', (req, res) => {
    if(typeof req.body.text != 'string')
        res.status(400).send('The request body must consist of {text: string}')

    Todo.findByIdAndUpdate(req.params.id,
        {text: req.body.text},
        {new: true})
        .exec()
        .then((todo: ITodo | null) => todo ? res.send({_id: todo._id, text: todo.text}) : Promise.reject(new Error('not found')))
        .catch(() => res.status(500).send());
});


router.delete<tParamString<tDELETE["Param"]>, tDELETE["ResponseBody"]>('/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id)
        .exec()
        .then((todo: ITodo | null) => todo ? res.send({_id: todo._id} ) : Promise.reject(new Error('not found')))
        .catch(() => res.status(500).send());
});



export default router;
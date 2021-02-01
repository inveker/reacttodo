import {model, Schema, Document} from 'mongoose';


export interface ITodo extends Document {
    text: string;
    performed: boolean;
}


const TodoSchema = new Schema({
    text: { type: String, required: true },
    performed: {type: Boolean, required: true }
});

export default model<ITodo>('Todo', TodoSchema);

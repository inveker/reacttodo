import mongoose from "mongoose";



const uri = "mongodb+srv://root:pass@cluster0.wsk06.mongodb.net/ReactTodo?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

export default (): Promise<typeof mongoose> => mongoose.connect(uri, options);

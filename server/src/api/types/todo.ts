export interface tGET {
    Param: {
        count?: number;
        page?: number;
    };
    ResponseBody: {
        todos: [{
            _id: string,
            text: string
            performed: boolean;
        }],
        total: number
    };
}


export interface tPOST {
    RequestBody: {
        text?: string;
        performed?: boolean;
    };
    ResponseBody: {
        _id: string;
        text: string;
        performed: boolean;
    };
}


export interface tPUT {
    Param: {
        id: string;
    };
    RequestBody: {
        text: string;
    };
    ResponseBody: {
        _id: string;
        text: string;
    };
}


export interface tDELETE {
    Param: {
        id: string
    };
    ResponseBody: {
        _id: string
    }
}



export class Response {
    result:any[]
    memory:Number[]
    err:any[]
    constructor(result:any[], memory:Number[], err:any[]){
        this.result=result;
        this.memory=memory;
        this.err=err;
    }
}

class Promise{
    constructor(executor){
        this.callbacks = [];

        try{
            executor(this.onResolve.bind(this), this.onReject.bind(this));
        }catch(err){
            
        }finally{

        }
    }
    onResolve(val){
        this.callbacks.forEach((callback) => {
            val = callback(val);
        })
    }
    onReject(){

    }
    then(){

    }
    catch(){

    }
    finally(){
        
    }
}
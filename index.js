const PENDING = 'PENDING',
     REJECTED = 'REJECTED',
    FULFILLED = 'FULFILLED';
class Promise{
    constructor(executor){
        this.state = PENDING;
        this.callbacks = [];
        this.result = null;
        this.errorHandler = () =>{}
        this.finallyHandler = () =>{}

        try{
            executor(this.onResolve.bind(this), this.onReject.bind(this));
        }catch(err){
            this.errorHandler(err);
        }finally{
            this.finallyHandler();
        }
    }
    onResolve(val){
        if(this.state === PENDING){
            this.state = FULFILLED;
            this.result = val;

            setTimeout(() => {
                this.callbacks.forEach((cb) => {
                    cb.resolvedCb(val);
                })
            })
        }
        this.finallyHandler();
    }
    onReject(err){
        if(this.state === PENDING){
            this.state = REJECTED;
            this.result = val;

            setTimeout(() => {
                this.callbacks.forEach((cb) => {
                    cb.rejectedCb(val);
                })
            })
        }
    }
    then(fn){
        
    }
    catch(fn){
        this.errorHandler = fn;
        return this;
    }
    finally(fn){
        this.finallyHandler = fn
        return this
    }
}
const PENDING = 'PENDING',
     REJECTED = 'REJECTED',
    FULFILLED = 'FULFILLED';
class Promise{
    constructor(executor){
        this.state = PENDING;
        this.callbacks = [];
        this.result = null;

        const resolve = (val) => {
            if(this.state === PENDING){
                this.state = FULFILLED;
                this.result = val;
    
                setTimeout(() => {
                    this.callbacks.forEach((cb) => {
                        cb.resolvedCb(val);
                    })
                })
            }
        }
        const reject = (err) => {
            if(this.state === PENDING){
                this.state = REJECTED;
                this.result = err;
    
                setTimeout(() => {
                    this.callbacks.forEach((cb) => {
                        cb.rejectedCb(err);
                    })
                })
            }
        }
        try{
            executor(resolve, reject);
        }catch(err){
            reject(err);
        }
    }
    then(resolvedCb, rejectedCb){
        const that = this
        resolvedCb = typeof resolvedCb === 'function' ? resolvedCb : (val) => val;
        rejectedCb = typeof rejectedCb === 'function' ? rejectedCb : (err) => { throw err }

        return new Promise((resolve, reject) => {
            function callback(type){
                try{
                    let promiseResult = type(that.result);
                    if(promiseResult instanceof Promise){
                        promiseResult.then((v) => {
                            resolve(v);
                        }, (e) => {
                            reject(e);
                        });
                    }else{
                        resolve(promiseResult);
                    }
                }catch(err){
                    reject(err);
                }
            }
            if(this.state === FULFILLED){
                setTimeout(() => {
                    callback(resolvedCb);
                });
            }
            if(this.state === REJECTED){
                setTimeout(() => {
                    callback(rejectedCb);
                });
            }
            if(this.state === PENDING){
                this.callbacks.push({
                    resolvedCb : () => {
                        callback(resolvedCb)
                    },
                    rejectedCb : () => {
                        callback(rejectedCb);
                    },
                })
            }
        })
    }
    // rejectedCb
    catch(fn){
        return this.then(null, fn);
    }

    finally(fn){
        return this.then((val) => {
            fn();
            return val;
        }).catch((err) => {
            fn();
            return err;
        })
    }


    static resolve(val){
        return new Promise((resolve, reject) => {
            if(val instanceof Promise){
                val.then((v) => resolve(v), (e) => reject(e));
            }else{
                resolve(val);
            }
        });
    }
    static reject(err){
        return new Promise((resolve, reject) => {
            reject(err);
        })
    }
    static all(promises){
        return new Promise((resolve, reject) => {
            let arr = [];
            promises.forEach((current, index) => {
                // promise 아닐 때 포함안됨
                if(current instanceof Promise){
                    current.then((val) => {
                        arr.push(val);
                        if(index === promises.length - 1){
                            resolve(arr);
                        }
                    }, (err) => {
                        reject(err);
                    })
                }
            })
        })
    }
}
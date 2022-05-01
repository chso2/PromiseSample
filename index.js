import Promise from "./promise";

// promise chain test
const chainTest = () => {
    new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve("promise received result");
            } catch (error) {
                reject(error);
            }
        }, 3000);
    }).then((result1) => {
        console.log(result1);
    }).then(() => {
        allTest();
    })
}

// promise all test
const allTest = () => {
    const promise1 = Promise.resolve(3);
    const promise2 = new Promise((resolve, reject) => {
      setTimeout(resolve, 3000, 'foo');
    });
    
    Promise.all([promise1, promise2]).then((values) => {
      console.log(values);
    });
}

new Promise((resolve, reject) => {
    console.log('Initial');
    resolve();
})
.then(() => {
    throw new Error('Something failed');
    // rejection 발생으로 아래 실행 안됨
    console.log('Do this');
})
.catch(() => {
    console.log('Do that');
})
.then(() => {
    console.log('Do this, whatever happened before');
    chainTest();
})

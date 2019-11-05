// emailWorker.js

const kue = require('kue');

// We create a queue to work with.
// Note: This is the same queue that the job will be pushed to from the controller
let queue = kue.createQueue();

// Assign worker to process a job of particular type
// 5 is the maximum number of concurrent jobs our worker will pick up.
// Can be more if you want it to be. Can be less. Figure out your case and load.
queue.process('putindb', 5, (job, done) => {
    putindb(job, done);
});

// Actual function executed by the worker
const putindb = (job, done) => {
    // Delegated to the external function to manage promises efficiently
    // job.data contains the data passed for the job execution
    //   emailSender(job.data.name, job.data.email).then((success) => {
    //     done();
    //   })
    putthisindb(job.data.hash).then((success) => {
        done();
    })
        .catch((err) => {
            // Now this is where you go crazy with the error handling.
            // In this snippet, say the broker service gives me something in the 400 Error Range,
            // it implies something is wrong with the request itself. Retrying in this case will
            // be redundant hence, I reset the job retries to be 0
            // NOTE: You can skip this bit entirely. It's just bells and whistles to show a bit
            // of kue's capabilities.
            if (400 <= err.status <= 499) {
                job.attempts(0, () => {
                    return done(new Error(JSON.stringify(err)));
                    // Passing the done() method this way registers a failed attempt.
                    // Limitation of Error module is that it only accepts strings
                    // even though I want to send an object (err) which I might want
                    // to process. Well, we will make do with what we have.
                });
            }
            return done(new Error(JSON.stringify(err))); // OTherwise scenario, keep trying.
        });
};
const putthisindb = (hash) => {
    return new Promise((resolve, reject) => {
        //put settimeout..
        //
        const delay = t => new Promise(resolve => setTimeout(resolve, t));
        delay(3000).then(() => actualfunc);


    });
};
const actualfunc = () => {
    client.hmset(temp, {
        'companyname': 'Indigo',
        'flightnumber': '61234'
    });
}

// const emailSender = (name, email) => {
//     // I've used a randomiser here to mock the behavior of an email sending service.
//     // It either succeeds (YAY!) or fails in a manner to deserve a retry or fails with
//     // a 400 series error.
//     return new Promise((resolve, reject) => {
//         // Let's play with 3 possible outcomes.
//         let responder = Math.floor(Math.random() * 10) + 1;

//         if (responder < 8) { // 7 out of 10 times our request will succeed.
//             resolve({ 'success': success });
//         }
//         else if (responder >= 8 && responder != 10) { // 2 out of 10 times our request will fail
//             reject({ 'message': "HOLY SHIT EMAIL WAS NOT SENT" });
//         }
//         else if (responder === 10) { // 1 out of 10 times our request will have faulty stuff
//             reject({
//                 'status': 420,
//                 'message': "You Blazed a 420 in your request. Sober Down and maybe you will succeed"
//             });
//         }
//     });
// };
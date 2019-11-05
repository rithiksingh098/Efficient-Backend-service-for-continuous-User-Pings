const express = require('express');
const kue = require('kue');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();
// var dbobj = {
//     companyname: "Indigo",
//     flightnumber: "61234"
// }
let queue = kue.createQueue();
// let jobs = kue.createQueue();


//so what I have done is I have is in the search post created a job queue
//and then I have sent some json in it..
//what is left is 


router.post("/", function (req, res, next) {
    // function newJob(name) {
    //     name = name || 'Default_Name';
    //     var job = jobs.create('new job', {
    //         name: name
    //     });
    //     job
    //         .on('complete', function () {
    //             console.log('Job', job.id, 'with name', job.data.name, 'is done');
    //         })
    //         .on('failed', function () {
    //             console.log('Job', job.id, 'with name', job.data.name, 'has  failed');
    //         });
    //     job.save();
    // }
    // setInterval(() => {
    //     jobs.process('new job', function (job, done) {

    //         /* carry out all the job function here */
    //         //what if I sleep here

    //         done && done();
    //     });
    // }, 3000);
    // // setInterval(function () {
    //     newJob('Send_Email');
    // // }, 3000);

    // res.json({ success: ' tthis is up and running' });


    console.log("/" + req.method);
    console.log(req.body);
    var from = req.body.from;
    var to = req.body.to;
    var d = new Date();
    var temp = "" + from + to + d.toISOString();
    //we will create a job and  push into the queue with some tag.. and soem json data.. that would be executed.. 
    const putindbJob = queue.create('putindb', {  // Job Type
        // name: req.body.name,                    // Job Data
        // email: req.body.email
        hash: temp
    })
        .removeOnComplete(true) // REMOVE THE JOB FROM THE QUEUE ONCE IT'S COMPLETED
        .attempts(5);  // The maximum number of retries you want the job to have
    // .backoff({ delay: 60 * 1000, type: 'exponential' }) // Time between retries. Read docs.
    // .save(); // PERSIST THE DAMN JOB LOL
    // //this job listens to events using redis pubsub model
    //     emailJob.on('failed', function (errorMessage) { // Huh?
    //         console.log('Job failed');
    //         let error = JSON.parse(errorMessage);
    //         // error now contains the object passed from the worker when the job failed
    //         console.log(error); // Check it out for yourself
    //         // call pagerduty or whatever jazz you wanna do in case of failure
    //     });
    //this thing got returned also wow..
    putindbJob
        .on('complete', function () {
            console.log('Job', job.id, 'with name', job.data.hash, 'is    done');
        })
        .on('failed', function () {
            console.log('Job', job.id, 'with name', job.data.hash, 'has  failed');
        });
    putindbJob.save();
    // Assign worker to process a job of particular type
    // 5 is the maximum number of concurrent jobs our worker will pick up.
    // Can be more if you want it to be. Can be less. Figure out your case and load.
    // queue.process('putindb', 5, (job, done) => {
    //     putindb(job, done);
    // });



    // const putindb = (job, done) => {
    //     // Delegated to the external function to manage promises efficiently
    //     // job.data contains the data passed for the job execution
    //     //   emailSender(job.data.name, job.data.email).then((success) => {
    //     //     done();
    //     //   })
    //     putthisindb(job.data.hash).then((success) => {
    //         done();
    //     })
    //         .catch((err) => {
    //             // Now this is where you go crazy with the error handling.
    //             // In this snippet, say the broker service gives me something in the 400 Error Range,
    //             // it implies something is wrong with the request itself. Retrying in this case will
    //             // be redundant hence, I reset the job retries to be 0
    //             // NOTE: You can skip this bit entirely. It's just bells and whistles to show a bit
    //             // of kue's capabilities.
    //             if (400 <= err.status <= 499) {
    //                 job.attempts(0, () => {
    //                     return done(new Error(JSON.stringify(err)));
    //                     // Passing the done() method this way registers a failed attempt.
    //                     // Limitation of Error module is that it only accepts strings
    //                     // even though I want to send an object (err) which I might want
    //                     // to process. Well, we will make do with what we have.
    //                 });
    //             }
    //             return done(new Error(JSON.stringify(err))); // OTherwise scenario, keep trying.
    //         });
    // };
    // // Actual function executed by the worker

    // const putthisindb = (hash) => {
    //     return new Promise((resolve, reject) => {
    //         //put settimeout..
    //         //
    //         const delay = t => new Promise(resolve => setTimeout(resolve, t));
    //         delay(3000).then(() => actualfunc());


    //     });
    // };

    // const actualfunc = () => {
    //     client.hmset(temp, {
    //         'companyname': 'Indigo',
    //         'flightnumber': '61234'
    //     });
    // }

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


    res.json({ hash: temp });


});

module.exports = router;
const redis = require('redis');
const client = redis.createClient();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
var kue = require('kue')
  , jobs = kue.createQueue();
//we have created the kue and called the body parser and all
//also a redis client that would be storing the data for each query
app.use(bodyParser.urlencoded({ extended: false }));
//this is to parse application/json
app.use(bodyParser.json());

//this endpoint is hit by the user with the to and from data
//what this does is calls an asynchronous worker that would put the value in the database
//after a time delay of 15 seconds..
app.post('/search_api', function (req, res) {
  console.log("/" + req.method);
  console.log(req.body);
  var from = req.body.from;//source
  var to = req.body.to;//destination
  var d = new Date();
  var temp = "" + from + to + d.toISOString();//creating hash using data and isodate

  //this function is to create a job and save it in the job queue
  //jobs is the queu and job is the newlyadded job
  function newJob() {
    var job = jobs.create('new job', {
      hash: temp
    });
    job
      .on('complete', function () {
        console.log('Job', job.id, 'with hash', job.data.hash, 'is    done');
      })
      .on('failed', function () {
        console.log('Job', job.id, 'with hash', job.data.hash, 'has  failed');
      });
    job.save();
  }
  //we define the job function and write functionality of the code
  jobs.process('new job', function (job, done) {
    //what if I sleep here
    putindb(job, done);
    done && done();
  });
  //this function 
  const putindb = (job, done) => {
    putthisindb(job.data.hash).then((success) => {
      done();
    })
      .catch((err) => {
        if (400 <= err.status <= 499) {
          job.attempts(0, () => {
            return done(new Error(JSON.stringify(err)));
          });
        }
        return done(new Error(JSON.stringify(err)));
      });
  };
  const putthisindb = (hash) => {
    return new Promise((resolve, reject) => {
      const delay = t => new Promise(resolve => setTimeout(resolve, t));
      delay(15000).then(() => actualJob());
    });
  };

  //this function uses redis client to set the hash value to a dummy value
  const actualJob = () => {

    client.hmset(temp, {
      'companyname': 'Indigo',
      'flightnumber': '61234'
    });
  }

  //calling the job
  newJob();
  res.json({ hash: temp });
});

//this is ping_api 
//if the value for the curresponding hash is there in the database.
//it sends it and then deletes from the database..
//if not then it would return the hash itself
app.post('/ping_api', function (req, res) {
  console.log(req.body);
  var hash = req.body.hash;
  client.hgetall(hash, function (err, reply) {
    if (err) { throw err; }
    if (reply == null) {
      console.log('not found');
      res.send({ hash: hash });
      return;
    }
    res.send(reply);
    client.del(hash, function (err, rep) {
      console.log(rep);
    });

  });
});
app.listen(5000, function () {
  console.log("Live at Port 5000");
});



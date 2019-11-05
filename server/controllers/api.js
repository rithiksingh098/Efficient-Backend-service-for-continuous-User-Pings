// and now what is to be done.. is 
// first make the search api do this thing that 
// it would take the body and then generate a hash and return the hash and simultaneously put that in the database.
// what the ping api would do is that it would check if its present in the db if not then it would send the hash value back
const redis=require('redis');
const client=redis.createClient();
var dbobj = {
    companyname: "Indigo",
    flightnumber: "61234"
}

client.on('connect',function(err,reply){
    console.log('connect to redis');
});
module.exports.search_api = (req, res) => {
    console.log("/" + req.method);
    console.log(req.body);
    var from = req.body.from;
    var to = req.body.to;
    if (from.length == 0 || to.length == 0) {
        res.status(400).send('Empty string not allowed');
        return;
    }
    if (from == null || to == null) {
        res.status(400).send('please enter something');
    }
    if (!isNaN(from) || !isNaN(to)) {
        res.status(400).send('Numbers are not allowed');
        return;
    }
    else {
        var d = new Date();
        var temp = "" + from + to + d.toISOString();
        //this temp is the hash basically
        //this set is erraneous this is not how we store the object..
        // client.set(temp,dbobj);
        //this thing should be done in while processing ..
        client.hmset(temp, {
            'companyname': 'Indigo',
            'flightnumber': '61234'
        });

        res.send({ hash: temp });
    }
}
module.exports.ping_api = (req, res) => {
    console.log(req.body);
    var hash = req.body.hash;
    client.hgetall(hash,function(err,reply){
        if(err) {throw err;}
        if(reply==null)
        {
            console.log('not found');
            res.send({hash:hash});
            return ;
        }
        // let replyy=JSON.parse(reply);
        res.send(reply);
    });

    // if (hash in dict) {
    //     console.log("this hash in dict ");
    //     console.log(dict);
    //     var temp = dict[hash];
    //     if (hash != dict[hash]) {
    //         delete dict[hash];
    //     }
    //     res.send({hash:temp});
    //     return;
    // }
    // else {
    //     console.log("hash not in dict ");
    //     console.log(dict);
    //     i=i+1;//this i confirms that everytime I am pinging  only this functio is working and not
    //     console.log(i);
    //     const delay = t => new Promise(resolve => setTimeout(resolve, t));
    //     delay(15000).then(() => dict[hash]=dbobj);
    //     dict[hash]=hash;
    //     console.log(dict);
    //     console.log('printing the filled dict');
    //     res.send({hash : dict[hash]});
    // }


}



    //what ping api would do is take the hash and then put a timer for 15 seconds 
    //this 15 seconds thing should be done my some ayncronous function 
    //but this controller is a function and this would repeatedly get executed..this is what asynchronous means
    //first it would check the thing in the dictionary and would return the hash value if it not there..
    //and make the dict with hash:hash and after 15 seconds this hash:hash would be changed to hash:and some database
    //this db object should be given this time
    //and simultaneously will run an asynchronous function 
    //if it is there it would 
    //making that dict global would do..
    //and making a 

    //hash:hash can be there then it wouldnot delete
    //hash:value can be there then it would delete
    //but what if hash was not there then put aynchronously and mean while put hash
    
// app.post("/search", function (req, res) {
//     console.log("post login");
//     console.log(req.body);
//     var from = req.body.from;
//     var to = req.body.to;
//     console.log(username);
//     res.send({ from: from,to: to });
//     // geturl1 = 'http://localhost:3000/course?name=' + username + '&password=' + password;
//     // studurl = 'http://localhost:3000/student?name=' + username + '&password=' + password;
//     // res.render("direct", {
//     //     courseurl: geturl1,
//     //     studenturl: studurl
//     // });
// });

// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()
// const path = require('path')
// var kue = require('kue')
//   , jobs = kue.createQueue();


// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json
// app.use(bodyParser.json())

// app.post('/search_api', function (req, res) {

//   function newJob(name) {
//     name = name || 'Default_Name';
//     var job = jobs.create('new job', {
//       name: name
//     });
//     job
//       .on('complete', function () {
//         console.log('Job', job.id, 'with name', job.data.name, 'is    done');
//       })
//       .on('failed', function () {
//         console.log('Job', job.id, 'with name', job.data.name, 'has  failed');
//       });
//     job.save();
//   }
//   jobs.process('new job', function (job, done) {

//     /* carry out all the job function here */
//     //what if I sleep here

//     done && done();
//   });
//   // setInterval(function () {
//   newJob('Send_Email');
//   // }, 3000);
//   res.json({ success: "yaya" });
// });



// //dummy code ends


// app.listen(5000, function () {
//   console.log("Live at Port 5000");
// });

// /* simple-job-queue.js */

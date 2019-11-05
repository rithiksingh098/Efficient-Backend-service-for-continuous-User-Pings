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
        res.send({ hash: temp });
    }

}

var dict = {};
var dbobj = {
    companyname: "Indigo",
    flightnumber: 61234
}
var i=0;
module.exports.ping_api = (req, res) => {
    console.log(req.body);
    var hash = req.body.hash;

    if (hash in dict) {
        console.log("this hash in dict ");
        console.log(dict);
        var temp = dict[hash];
        if (hash != dict[hash]) {
            delete dict[hash];
        }
        res.send({hash:temp});
        return;
    }
    else {
        console.log("hash not in dict ");
        console.log(dict);
        i=i+1;//this i confirms that everytime I am pinging  only this functio is working and not
        console.log(i);
        const delay = t => new Promise(resolve => setTimeout(resolve, t));
        delay(15000).then(() => dict[hash]=dbobj);
        dict[hash]=hash;
        console.log(dict);
        console.log('printing the filled dict');
        res.send({hash : dict[hash]});
    }


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
var express=require('express');
var fs=require("fs");
var body_parser=require('body-parser');
var app = exports.app = express();
var natural=require('natural');
var enableCORS = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};
app.get('/',function(req,res){
console.log('hi');
fs.readFile('./1.html', function (err, html) {
    if (err) {
        throw err; 
    }       
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end();      
    });});
function eliminateDuplicates(arr) {
    var i,
        len = arr.length,
        out = [],
        obj = {};

    for (i = 0; i < len; i++) {
        obj[arr[i]] = 0;
    }
    for (i in obj) {
        out.push(i);
    }
    return out;
}
app.use(body_parser());
app.use(enableCORS);
stemmer=natural.PorterStemmer;
stemmer.attach();
app.post('/post',function(req,res){
    var str=req.body.str;
  console.log(str);
   var a= str.tokenizeAndStem();
    console.log(a);
    var str= fs.readFileSync('file1.txt');
    var obj=JSON.parse(str);
    console.log(obj);
    var a1=new Array();
    for(i=0;i< a.length;i++)
    {
        console.log('hi');
        var k=obj[a[i].charCodeAt(0)-97].s;
        console.log(k.legnth);
        if(k.length>0) {
            for (j = 0; j < k.length; j++) {
                console.log('hi11');
                if(k[j].name==a[i])
                {
                    var m1=k[j].num;
                    console.log(m1);
                    for(m=0;m<k[j].num.length;m++)
                    {
                        a1.push(m1[m]);
                    }

                }

            }
        }
    }
  a1=eliminateDuplicates(a1);
    console.log(a1);
   var response=new Array();
    for(i=0;i< a1.length;i++)
    {
        var str=fs.readFileSync(a1[i].toString()+'.txt');
        response[i]=str.toString();
    }
   console.log(response);
    res.send(response);
});

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080  
, ip = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

var server = app.listen(port,
    function() {
        console.log('Listening on port %d',server.address().port);
    }
);

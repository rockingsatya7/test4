
var fs= require('fs');
var natural=require('natural');
//var tokens=require('stringtokenizer');
var i;
var j, l,flag;
var k=0;

var index=new Array(26);
var index1=new Array(10);
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

for(i=0;i<26;i++)
{
  index[i]=new Object();
  index[i].s=new Array();
}

for(i=0;i<10;i++)
{
    index1[i]=new Object();
    index1[i].s=new Array();
}
stemmer=natural.PorterStemmer;
stemmer.attach();
for(j=1;j<=4;j++) {
    var buf = new Buffer(15);
    buf = fs.readFileSync(j.toString() +'.txt');
    var str = buf.toString();
    var a=str.tokenizeAndStem();
    a=eliminateDuplicates(a);
    for (i=0; i < a.length; i++) {
        flag=0;
        a[i]=a[i].toLowerCase();
        if(a[i].charCodeAt(0)>=48&&a[i].charCodeAt(0)<=57)
            var k=index1[a[i].charCodeAt(0)-48].s;
        else
            var k=index[a[i].charCodeAt(0)-97].s;
        if(k) {
            for (var m = 0; m < k.length; m++) {
                if (k[m].name == a[i]) {
                    k[m].num.push(j);
                    flag = 1;
                    break;
                }

            }
        }
        if(flag==1)
        continue;
            var obj=new Object();
            obj.name=a[i];
            obj.num= new Array();
            obj.num.push(j);
            k.push(obj);

        }

    }

str=JSON.stringify(index);
fs.writeFileSync('file1.txt',str);

str=JSON.stringify(index1);
fs.writeFileSync('file2.txt',str);



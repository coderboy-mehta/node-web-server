const express=require('express');
const fs=require('fs');
const hbs =require('hbs');
var app=express();

app.set('view engine','hbs');

app.use((req,res,next)=>{
var now=new Date().toString();
var log=`${now}:  ${req.method} ${req.url}`;

console.log(log);
fs.appendFile('server.log',log+"\n",(err)=>{
  if(err){
  console.log('unable to append file');
        }
});
next();
});
app.use((req,res,next)=>{
  res.render('maintains.hbs');
});
app.use(express.static(__dirname+`/public`));

app.get('/',(req,res)=>{
  res.send({
    name:'anmol',
    like:'coding'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pTitle:'coderboy',
    currentYear:new Date().getFullYear()
  });
});


app.get('/bad',(req,res)=>{
  res.send({
    bad:'request  is bad',
    error:'try again'
  });
});

app.get('/home',(req,res)=>{
  res.render('home.hbs',{
    hTitle:'hello there',
    currentYear: new Date().getFullYear()
  });
});
app.listen(3000,()=>{
  console.log('server is setup on localhost :3000');
});

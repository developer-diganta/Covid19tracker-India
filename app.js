const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
  var request = require('request');
const app=express();
app.set("view engine","ejs");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  // var request = require('request');
  // var options = {
  //   'method': 'GET',
  //   'url': 'https://covid-19india-api.herokuapp.com/v2.0/state_data',
  //   'headers': {
  //   }
  // };
  // request(options, function (error, response) {
  //   if (error) throw new Error(error);
  //   console.log(response.body[1]);
  //   // res.send(response.body);
  //   // res.render("index",{found:response.body.state_data});
  // });
  // var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://api.covid19india.org/data.json',
    // 'headers': {
    // }
  };


  request(options, function (error, response) {
    if (error) throw new Error(error);
    const a=JSON.parse(response.body);
    // console.log(a[1].state_data);
    // console.log(a);
    // const op={
    //   cnf:Number,
    //   date:String
    // };
    var arr=[];
    var date=[];
    const b=a.cases_time_series;
    console.log(b);
    for(i=0;i<b.length;i++){
      // var ab=new op({
      //   cnf:b[i].dailyconfirmed;
      //   date:b[i].date;
      // })
      arr.push(b[i].dailyconfirmed);
      date.push(b[i].date);
    }
    console.log(a.tested[a.tested.length-2]);
    if(a.tested[a.tested.length-1].totalsamplestested==0)
      twt=a.tested[a.tested.length-2];
    else
      twt=a.tested[a.tested.length-1];
    console.log(twt);
    res.render("index",{found:a.statewise,data:arr,date:date,tweet:a.tested[a.tested.length-1],twt:twt,graph:b});
  });


});


// var options2 = {
// 'method': 'GET',
// 'url': 'http://covid19-india-adhikansh.herokuapp.com/state/Andhra Pradesh?=',
// 'headers': {
// }
// };
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   const b=JSON.parse(response.body);
//   console.log(response.body);
// });

app.post("/state",function(req,res){
  var options = {
    'method': 'GET',
    'url': 'https://api.covid19india.org/state_district_wise.json',
    // 'headers': {
    // }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    const a=JSON.parse(response.body);
    // console.log(a[1].state_data);
    // console.log(a);

    console.log(a[req.body.state].districtData);
    // for(var key in a[req.body.state].districtData){
    //   // console.log("K : "+key);
    //   console.log("Key : "+a[req.body.state].districtData[key].confirmed);
    // }
    // res.render("index",{found:a[req.body.state].districtData});
    res.render("state",{state:req.body.state,found:a[req.body.state].districtData});
  });


  // res.write(req.body.state);
  // console.log(req.body.state);
});

app.get("/s",function(req,res){
  var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://covid-19india-api.herokuapp.com/v2.0/icmr_lab_details',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
})
app.listen(process.env.PORT || 3000,function(){
  console.log("Running on 3000");
});

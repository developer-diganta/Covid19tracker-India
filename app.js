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

    res.render("index",{found:a.statewise});
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

app.get("/state",function(req,res){
  res.write(req.body.state);
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

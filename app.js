const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
var request = require('request');
const csv = require('csv-parser');
const fs = require('fs');

const app=express();
app.set("view engine","ejs");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  var options = {
    'method': 'GET',
    'url': 'https://api.covid19india.org/data.json',
  };
  var options2 = {
    'method': 'GET',
    'url': 'https://api.covid19india.org/v4/min/data.min.json',
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    const a=JSON.parse(response.body);
    var arr=[];
    var date=[];
    const tested=a.tested;
    if(a.tested[a.tested.length-1].firstdoseadministered==0){
      var firstdoseadministered=a.tested[a.tested.length-2].firstdoseadministered;
      var seconddoseadministered=a.tested[a.tested.length-2].seconddoseadministered;
      var time_vaccine=a.tested[a.tested.length-2].updatetimestamp;
    }
    else{
      var firstdoseadministered=a.tested[a.tested.length-1].firstdoseadministered;
      var seconddoseadministered=a.tested[a.tested.length-1].seconddoseadministered;
      var time_vaccine=a.tested[a.tested.length-1].updatetimestamp;
    }
    const b=a.cases_time_series;
    for(i=0;i<b.length;i++){
      arr.push(b[i].dailyconfirmed);
      date.push(b[i].date);
    }
    if(a.tested[a.tested.length-1].totalsamplestested==0)
      twt=a.tested[a.tested.length-2];
    else
      twt=a.tested[a.tested.length-1];
    request(options2, function (error, response) {
      if (error) throw new Error(error);
      const stateVaccineData=JSON.parse(response.body);
      console.log(stateVaccineData.WB.districts.Jalpaiguri.delta7.vaccinated);
      res.render("index",{found:a.statewise,data:arr,date:date,tweet:a.tested[a.tested.length-1],twt:twt,graph:b,firstVaccineDose:firstdoseadministered,secondVaccineDose:seconddoseadministered,vaccineTime:time_vaccine,vaccine:stateVaccineData});
    });

  });


});


app.get("/:state",function(req,res){
  const stateName=req.params.state;
  var options = {
    'method': 'GET',
    'url': 'https://api.covid19india.org/state_district_wise.json',
  };
  var options2={
    'method': 'GET',
    'url': '  https://api.covid19india.org/states_daily.json',
  }
  request(options, function (error, response) {
        if (error) throw new Error(error);
      request(options2, function (error1, response1) {
        if (error1) throw new Error(error1);


      const a=JSON.parse(response.body);

      console.log(a[stateName].districtData);
      var tc=0, tr=0,td=0,ta=0;
      var found=a[stateName];
      var code=found.statecode;
      const c=JSON.parse(response1.body);
      console.log(c);
      var cnf=[];
      var rec=[];
      var dec=[];
      var tot=[];
      var b=c.states_daily;

      code=code.toLowerCase();
      var jk;
for(jk in b){

}
console.log(jk);
console.log(tot);
console.log(code);
for(i=0;i<=jk;i++){
  tot.push(b[i][code]);
}
for(i=0;i<=jk;i+=3){
  cnf.push(tot[i]);
}
for(i=1;i<=jk;i+=3){
  rec.push(tot[i]);
}
for(i=2;i<=jk;i+=3){
  dec.push(tot[i]);
}
console.log(tot);
var fou=a[stateName].districtData;
        for(var key in fou){
          console.log(key);
        console.log(fou[key].confirmed);

        tc=tc+parseInt(fou[key].confirmed);
        tr=tr+parseInt(fou[key].recovered);
        td=td+parseInt(fou[key].deceased);
        ta=ta+parseInt(fou[key].active);
      }
      // console.log(b);
      res.render("state",{state:stateName,found:a[stateName].districtData, tc:tc,tr:tr,td:td,ta:ta,cnf:cnf,rec:rec,dec:dec});
      });

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

// To get data stored in MS Access DB and make it available as an API

import { readFileSync } from "fs";
import MDBReader from "mdb-reader";
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
const port = 5000;

// const filePath = "C:/Program Files (x86)/Masibus Products/SMART/data/Network/Network_001.mdb";
const filePath = "./data/Network_001.mdb";

// ############### 1. Get the latest values for individual reactors #############

// Reactor 1
app.get('/reactor1/latest', (req, res) => {

    const buffer = readFileSync(filePath);
    const reader = new MDBReader(buffer);

    const PH100 = reader.getTable('Tag000000001').getData();
    const PI100 = reader.getTable('Tag000000002').getData();
    const TI100_PV = reader.getTable('Tag000000003').getData();
    const TI100_SP = reader.getTable('Tag000000004').getData();

    // Latest sensor values
    const reactor1Res = {};
    reactor1Res.DTime = PH100.at(-1).DTime;
    reactor1Res.PH100 = PH100.at(-1).PV;
    reactor1Res.PI100 = PI100.at(-1).PV;
    reactor1Res.TI100_PV = TI100_PV.at(-1).PV;
    reactor1Res.TI100_SP = TI100_SP.at(-1).PV;

    // Build the response object, with list of sensors
    const Response = {
      schema : ['DTime', 'PH100', 'PI100', 'TI100_PV', 'TI100_SP'],
      values : reactor1Res
    }
    // console.log(Response);
    res.send(Response);
  }
)

// Reactor 2
app.get('/reactor2/latest', (req, res) => {

    const buffer = readFileSync(filePath);
    const reader = new MDBReader(buffer);

    const PH200 = reader.getTable('Tag000000005').getData();
    const PI200 = reader.getTable('Tag000000006').getData();
    const TI200_PV = reader.getTable('Tag000000007').getData();
    const TI200_SP = reader.getTable('Tag000000008').getData();

    const reactor2Res = {};
    reactor2Res.DTime = PH200.at(-1).DTime;
    reactor2Res.PH200 = PH200.at(-1).PV;
    reactor2Res.PI200 = PI200.at(-1).PV;
    reactor2Res.TI200_PV = TI200_PV.at(-1).PV;
    reactor2Res.TI200_SP = TI200_SP.at(-1).PV;


    // Build the response object, with list of sensors
    const Response = {
      schema : ['DTime', 'PH200', 'PI200', 'TI200_PV', 'TI200_SP'],
      values : reactor2Res
    }
    // console.log(Response);
    res.send(Response);
  }
)

// Reactor 3
app.get('/reactor3/latest', (req, res) => {

    const buffer = readFileSync(filePath);
    const reader = new MDBReader(buffer);
    
    const PH300 = reader.getTable('Tag000000010').getData();
    const PI300 = reader.getTable('Tag000000010').getData();
    const TI300_PV = reader.getTable('Tag000000011').getData();
    const TI300_SP = reader.getTable('Tag000000012').getData();

    const reactor3Res = {};
    reactor3Res.DTime = PH300.at(-1).DTime;
    reactor3Res.PH300 = PH300.at(-1).PV;
    reactor3Res.PI300 = PI300.at(-1).PV;
    reactor3Res.TI300_PV = TI300_PV.at(-1).PV;
    reactor3Res.TI300_SP = TI300_SP.at(-1).PV;


    // Build the response object, with list of sensors
    const Response = {
      schema : ['DTime', 'PH300', 'PI300', 'TI300_PV', 'TI300_SP'],
      values : reactor3Res
    }
    // console.log(Response);
    res.send(Response);
  }
)

// Reactor 4
app.get('/reactor4/latest', (req, res) => {

    const buffer = readFileSync(filePath);
    const reader = new MDBReader(buffer);

    const PH400 = reader.getTable('Tag000000013').getData();
    const PI400 = reader.getTable('Tag000000014').getData();
    const TI400_PV = reader.getTable('Tag000000015').getData();
    const TI400_SP = reader.getTable('Tag000000016').getData();

    const reactor4Res = {};
    reactor4Res.DTime = PH400.at(-1).DTime;
    reactor4Res.PH400 = PH400.at(-1).PV;
    reactor4Res.PI400 = PI400.at(-1).PV;
    reactor4Res.TI400_PV = TI400_PV.at(-1).PV;
    reactor4Res.TI400_SP = TI400_SP.at(-1).PV;


    // Build the response object, with list of sensors
    const Response = {
      schema : ['DTime', 'PH400', 'PI400', 'TI400_PV', 'TI400_SP'],
      values : reactor4Res
    }
    // console.log(Response);
    res.send(Response);
  }
)


// ############### 2. GET values in batch  ######################
// These values will be taken from latest to oldest.

// Reactor 1
app.get('/reactor1/batch', (req, res) => {

  let batchSize = req.query.batchsize;
  
  const buffer = readFileSync(filePath);
  const reader = new MDBReader(buffer);

  const PH100 = reader.getTable('Tag000000001').getData();
  const PI100 = reader.getTable('Tag000000002').getData();
  const TI100_PV = reader.getTable('Tag000000003').getData();
  const TI100_SP = reader.getTable('Tag000000004').getData();

  const reactor1Res = [];
  let dbSize = PH100.length;
  if(batchSize >dbSize|| batchSize===undefined || batchSize<=0){
    batchSize = dbSize
  }

  for(let i = 1; i<=batchSize; i++){
    let curr = {};

    curr.DTime = PH100.at(dbSize-i).DTime;
    curr.PH100 = PH100.at(dbSize-i).PV;
    curr.PI100 = PI100.at(dbSize-i).PV;
    curr.TI100_PV = TI100_PV.at(dbSize-i).PV;
    curr.TI100_SP = TI100_SP.at(dbSize-i).PV;

    reactor1Res.push(curr);
  }
  
  // Build the response object, with list of sensors
  const Response = {
    schema : ['DTime', 'PH100', 'PI100', 'TI100_PV', 'TI100_SP'],
    values : reactor1Res
  }
  // console.log(Response);
  res.send(Response);
})

// Reactor 2
app.get('/reactor2/batch', (req, res) => {

  let batchSize = req.query.batchsize;
  
  const buffer = readFileSync(filePath);
  const reader = new MDBReader(buffer);

  const PH200 = reader.getTable('Tag000000005').getData();
  const PI200 = reader.getTable('Tag000000006').getData();
  const TI200_PV = reader.getTable('Tag000000007').getData();
  const TI200_SP = reader.getTable('Tag000000008').getData();

  const reactor2Res = [];
  let dbSize = PH200.length;
  if(batchSize >dbSize|| batchSize===undefined || batchSize<=0){
    batchSize = dbSize
  }

  for(let i = 1; i<=batchSize; i++){
    let curr = {};

    curr.DTime = PH200.at(dbSize-i).DTime;
    curr.PH200 = PH200.at(dbSize-i).PV;
    curr.PI200 = PI200.at(dbSize-i).PV;
    curr.TI200_PV = TI200_PV.at(dbSize-i).PV;
    curr.TI200_SP = TI200_SP.at(dbSize-i).PV;

    reactor2Res.push(curr);
  }
  
  // Build the response object, with list of sensors
  const Response = {
    schema : ['DTime', 'PH200', 'PI200', 'TI200_PV', 'TI200_SP'],
    values : reactor2Res
  }
  // console.log(Response);
  res.send(Response);
})

// Reactor 3
app.get('/reactor3/batch', (req, res) => {

  let batchSize = req.query.batchsize;
  
  const buffer = readFileSync(filePath);
  const reader = new MDBReader(buffer);
  
  const PH300 = reader.getTable('Tag000000010').getData();
  const PI300 = reader.getTable('Tag000000010').getData();
  const TI300_PV = reader.getTable('Tag000000011').getData();
  const TI300_SP = reader.getTable('Tag000000012').getData();

  const reactor3Res = [];
  let dbSize = PH300.length;
  if(batchSize >dbSize|| batchSize===undefined || batchSize<=0){
    batchSize = dbSize
    
  }

  for(let i = 1; i<=batchSize; i++){
    let curr = {};

    curr.DTime = PH300.at(dbSize-i).DTime;
    curr.PH300 = PH300.at(dbSize-i).PV;
    curr.PI300 = PI300.at(dbSize-i).PV;
    curr.TI300_PV = TI300_PV.at(dbSize-i).PV;
    curr.TI300_SP = TI300_SP.at(dbSize-i).PV;

    reactor3Res.push(curr);
  }
  
  // Build the response object, with list of sensors
  const Response = {
    schema : ['DTime', 'PH300', 'PI300', 'TI300_PV', 'TI300_SP'],
    values : reactor3Res
  }
  // console.log(Response);
  res.send(Response);
})

// Reactor 4
app.get('/reactor4/batch', (req, res) => {

  let batchSize = req.query.batchsize;
  
  const buffer = readFileSync(filePath);
  const reader = new MDBReader(buffer);

  const PH400 = reader.getTable('Tag000000013').getData();
  const PI400 = reader.getTable('Tag000000014').getData();
  const TI400_PV = reader.getTable('Tag000000015').getData();
  const TI400_SP = reader.getTable('Tag000000016').getData();

  const reactor4Res = [];
  let dbSize = PH400.length;
  if(batchSize >dbSize|| batchSize===undefined || batchSize<=0){
    batchSize = dbSize
    
  }

  for(let i = 1; i<=batchSize; i++){
    let curr = {};

    curr.DTime = PH400.at(dbSize-i).DTime;
    curr.PH400 = PH400.at(dbSize-i).PV;
    curr.PI400 = PI400.at(dbSize-i).PV;
    curr.TI400_PV = TI400_PV.at(dbSize-i).PV;
    curr.TI400_SP = TI400_SP.at(dbSize-i).PV;

    reactor4Res.push(curr);
  }
  
  // Build the response object, with list of sensors
  const Response = {
    schema : ['DTime', 'PH400', 'PI400', 'TI400_PV', 'TI400_SP'],
    values : reactor4Res
  }
  // console.log(Response);
  res.send(Response);
})

// Default route: for displaying errors
app.get("*", (req, res) => {
  res.status(404);
  res.send("PAGE NOT FOUND. \nCommon errors: Wrong reactor number.");
});

// ########## Listen Indefinately ###############
app.listen(port, () =>{
    // console.log("Listening on port 5000.");
})

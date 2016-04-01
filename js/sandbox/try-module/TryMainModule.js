var TryModule = require("./TryModule");
var Module1 = require("./Module1");
var Module2 = require("./Module2");

//standard event emitter
var EventEmitter = require("events").EventEmitter;
var fs = require("fs");

function findPattern(files,regex){
  var emitter = new EventEmitter();
  files.forEach(function(file){
    fs.readFile(file,'utf-8',function(err,content){
      if(err){
        return emitter.emit("error",err);
      }
      emitter.emit("fileread",file);
      var match = null;
      if(match = content.match(regex)){
        match.forEach(function(elem){
          emitter.emit('found', file, elem);
        });
      }
    });
  });
  return emitter;
}
findPattern(["fileA.txt","fileB.json"],/hello \w+/g)
  .on("error",function(err){
    console.log("Error emitted : " + err.message);
  })
  .on("fileread",function(file){
    console.log(file + " war read");
  })
  .on("found",function(file,match){
    console.log("Matched : " + match + " in file " + file);
  });

//module pattern
Module1("Testing gan");
Module1.verbose("testing gan");

var dbLogger = Module2("DB");
var dbLogger2 = Module2("DB");
dbLogger.log("This is informational messsage");
dbLogger2.log("this is testing gan");

var accessLogger = new Module2("ACCESS");
accessLogger.verbose("this is a verbose message");


//full fledge class event emitter
var ExtendedEventEmitter = require("./ExtendedEventEmitter");
var findPatternObject = new ExtendedEventEmitter(/hello \w+/);
findPatternObject
  .addFile("fileA.txt")
  .addFile("fileB.json")
  .find()
  .on("error",function(err){
    console.log("Error emitted : " + err.message);
  })
  .on("fileread",function(file){
    console.log(file + " war read");
  })
  .on("found",function(file,match){
    console.log("Matched : " + match + " in file " + file);
  });

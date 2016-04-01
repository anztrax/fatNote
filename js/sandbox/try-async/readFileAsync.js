var fs = require("fs");
var cache = {};

function consistentReadSync(filename){
  if(cache[filename]){
    return cache[filename];
  }else{
    cache[filename] = fs.readFileSync(filename,"utf-8");
    return cache[filename];
  }
}

function readJSON(filename,callback){
  fs.readFile(filename,"utf-8",function(err,data){
    var parsed;
    if(err){
      return callback(err);
    }

    try{
      parsed = JSON.parse(data);
    }catch (err){
      return callback(err);
    }

    callback(null,parsed);
  });
}

function readJSONThrow(filename,callback){
  fs.readFile(filename,"utf-8",function(err,data){
    if(err){
      return callback(err);
    }

    callback(null,JSON.parse(data));
  });
}

function inconsistentRead(filename,callback){
  if(cache[filename]){
    process.nextTick(function() {
      callback(cache[filename]);
    });
  }else{
    fs.readFile(filename,"utf-8",function(err,data){
      if (err) {
        return console.error(err);
      }
      cache[filename] = data;
      callback(data);
    });
  }
};

function createFileReader(filename){
  var listeners = [];
  inconsistentRead(filename,function(value){
    listeners.forEach(function(listener){
      listener(value);
    });
  });

  return {
    onDataReady: function (listener) {
      listeners.push(listener);
    }
  }
}

//initiate
var reader1 = createFileReader("data.txt");
reader1.onDataReady(function(data){
  console.log("First call data : " + data);

  var reader2 = createFileReader("data.txt");
  reader2.onDataReady(function(data){
    console.log("Second call data : " + data);
  });
});

try {
  readJSON("nonJSON.txt", function (err) {
    console.log("err");
  });
}catch(err){
  console.log("This will not catch the JSON parsing exception");
}

process.on("uncaughtException",function(err){
  console.error("This will catch at last the JSON parsing exception" + err.message);
  process.exit(1);
});

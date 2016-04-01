function Logger(name){
  //this is used when didn't call New (factory)
  if(!(this instanceof Logger)){
    return new Logger(name);
  }
  this.name =name;
}

Logger.prototype.log = function(message){
  console.log("[" + this.name + "]" + message);
}

Logger.prototype.info = function(message){
  this.log("info" + message);
}
Logger.prototype.verbose = function(message){
  this.log("verbose" + message);
}

//export constructor
module.exports = Logger;

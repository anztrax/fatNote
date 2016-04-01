var module = (function(){
  var privateFoo = function(){
    console.log("private foo");
  }
  var privateVar = {};

  var exports = {
    publicFoo : function(){
      console.log("public foo");
    },
    publicBar : function(){
      console.log("public Bar");
    }
  }

  return exports;
})();
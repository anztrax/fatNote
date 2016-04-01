function addAsync(a,b,callback){
  setTimeout(function(){
    callback(a+b);
  },300);
}

//the power of asynchronous
console.log("before");
addAsync(10,20,function(result){
  console.log(result);
});
console.log("after");


function* jsRockIsAwesome(){
  yield "JS Rocks is awesome";
  yield "JS Rocks says javascript rocks";
  yield "because Javascript really rocks";
}

var jsRocks = jsRockIsAwesome();

console.log(jsRocks.next());
console.log(jsRocks.next());
console.log(jsRocks.next());

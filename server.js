var http = require("http");
var dispatcher = require('httpdispatcher');
const PORT = 8010;

function handleRequest(request,response){
  try {
    dispatcher.dispatch(request,response);
  }catch(err){
    console.log(err);
  }
}

var server = http.createServer(handleRequest);

server.listen(PORT,function(){
  console.log("server listening on http://localhost:%s",PORT);
});
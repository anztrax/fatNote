function* errorFulGenerator(){
  yield "yo";
  throw new Error("Source maps are awesome");
  return "";
}

var errorGen = errorFulGenerator();
errorGen.next();
errorGen.next();
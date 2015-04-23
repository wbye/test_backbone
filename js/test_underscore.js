//test underscore

//keys
//values
//pairs
//invert
//pick
//omit 省略

var test={
	"k1":"v1",
	"k2":"v2",
	"k3":"v3",
	"k4":"v4",
	"k5":"v5",
	"k6":"v6",
	"k7":"v7",
	"k8":"v8",
	"k8/":"v8"
};
var log=function(){
	console.log.apply(console,arguments);
};
log(_.keys(test));

log(_.values(test));
log(_.pairs(test));
//make sure no value same
log(_.invert(test));

log(_.pick(test,"k1","k2"));

log(_.pick(test,function(value,key,object){
	return _.isNumber(value);
}));
log(_.omit(test,"k1","k2"));

log(_.omit(test,function(value,key,object){
	return _.isNumber(value);
}));

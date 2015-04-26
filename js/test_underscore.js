//test underscore

//keys
//values
//pairs
//invert
//pick
//omit 省略

var test = {
	"k1": "v1",
	"k2": "v2",
	"k3": "v3",
	"k4": "v4",
	"k5": "v5",
	"k6": "v6",
	"k7": "v7",
	"k8": "v8",
	"k8/": "v8"
};
var log = function() {
	console.log.apply(console, arguments);
};
log(_.keys(test));

log(_.values(test));
log(_.pairs(test));
//make sure no value same
log(_.invert(test));

log(_.pick(test, "k1", "k2"));

log(_.pick(test, function(value, key, object) {
	return _.isNumber(value);
}));
log(_.omit(test, "k1", "k2"));

log(_.omit(test, function(value, key, object) {
	return _.isNumber(value);
}));
//element index list
//collections 集合 数组或者对象
//each  Alias别名：forEach
//map   Alias别名：collect
//reduce   reduce方法把list中元素归结为一个单独的数值
//reduceRight reducRight是从右侧开始组合的元素的reduce函数
//find  在list中逐项查找，返回第一个通过predicate迭代函数真值检测的元素值，如果没有值传递给测试迭代器将返回undefined。 如果找到匹配的元素，函数将立即返回，不会遍历整个list。
//filter 遍历list中的每个值，返回包含所有通过predicate真值检测的元素值。（愚人码头注：如果存在原生filter方法，则用原生的filter方法。）
//where  where_.where(list, properties) 遍历list中的每一个值，返回一个数组，这个数组包含properties所列出的属性的所有的 键 - 值对。
//findWhere findWhere_.findWhere(list, properties) 遍历整个list，返回匹配 properties参数所列出的所有 键 - 值 对的第一个值。
//reject  返回list中没有通过predicate真值检测的元素集合，与filter相反。
//every   every_.every(list, [predicate], [context]) Alias: all 如果list中的所有元素都通过predicate的真值检测就返回true。
//some _.some(list, [predicate], [context]) Alias: any 如果list中有任何一个元素通过 predicate 的真值检测就返回true。一旦找到了符合条件的元素, 就直接中断对list的遍历. 
//contains contains_.contains(list, value, [fromIndex]) Alias: includes 如果list包含指定的value则返回true（愚人码头注：使用===检测）。如果list 是数组，内部使用indexOf判断。使用fromIndex来给定开始检索的索引位置。
//invoke 调用 在list的每个元素上执行methodName方法。 任何传递给invoke的额外参数，invoke都会在调用methodName方法的时候传递给它。
//pluck 摘取  pluck也许是map最常使用的用例模型的简化版本，即萃取数组对象中某属性值，返回一个数组。
//max  返回list中的最大值。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。如果list为空，将返回-Infinity，所以你可能需要事先用isEmpty检查 list 。
//min  返回list中的最小值。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。如果list为空，将返回-Infinity，所以你可能需要事先用isEmpty检查 list 。
//sortBy 返回一个排序后的list拷贝副本。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。迭代器也可以是字符串的属性的名称进行排序的(比如 length)。
//groupBy _.groupBy(list, iteratee, [context]) 把一个集合分组为多个集合，通过 iterator 返回的结果进行分组. 如果 iterator 是一个字符串而不是函数, 那么将使用 iterator 作为各元素的属性名来对比进行分组.
//indexBy _.indexBy(list, iteratee, [context]) 
// 给定一个list，和 一个用来返回一个在列表中的每个元素键 的iterator 函数（或属性名）， 返回一个每一项索引的对象。和groupBy非常像，但是当你知道你的键是唯一的时候可以使用indexBy 。
//countBy 排序一个列表组成一个组，并且返回各组中的对象的数量的计数。
//shuffle  shuffle_.shuffle(list) 返回一个随机乱序的 list 副本, 使用 Fisher-Yates shuffle 来进行随机乱序.
//sample sample_.sample(list, [n]) 从 list中产生一个随机样本。传递一个数字表示从list中返回n个随机元素。否则将返回一个单一的随机项。
//toArray  把list(任何可以迭代的对象)转换成一个数组，在转换 arguments 对象时非常有用。
//size  返回list的长度。   _.size = function(obj) {
  //   if (obj == null) return 0;
  //   return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  // };
//partition partition_.partition(array, predicate) 拆分一个数组（array）为两个数组：  第一个数组其元素都满足predicate迭代函数， 而第二个的所有元素均不能满足predicate迭代函数。
//

var test = [{
	name: "name1",
	text: "text5"
}, {
	name: "name2",
	text: "text5"
}, {
	name: "name3",
	text: "text5"
}, {
	name: "name4",
	text: "text5"
}, {
	name: "name5",
	text: "text5"
}, {
	name: "name5",
	text: "text5-1"
}];
var test_o = {
	"k1": "v1",
	"k2": "v2",
	"k3": "v3",
	"k4": "v4",
	"k5": "v5"
};

var _this = {
	name: "name100",
	text: "text100"
};
// log();

_.each(test, function(element, index, list) {
	log(arguments);
	log(_this == this);
}, _this);

_.map(test, function(element, index, list) {
	log(arguments);
	log(_this == this);
}, _this);

log(_.map(test_o, function(element, index, list) {
	log(arguments);
	log(_this == this);
}, _this));

log(_.reduce(test, function(memo, element, index, list) {
	log(arguments);
	log(_this == this);
	return memo + 10;
}, 0, this));

log(_.reduceRight(test, function(memo, element, index, list) {
	log(arguments);
	log(_this == this);
	return memo + 10;
}, 0, this));

console.clear();

log(_.find(test, {
	name: "name1",
	text: "text5"
}));
//ONLY find one
log(_.find(test, function(item) {
	//element,index,list
	log(arguments);
	log(_this == this);
	if (item.name == "name1" || item.name == "name2") {
		return true;
	}
}, _this));

log(_.filter(test, function(item) {
	//element,index,list
	log(arguments);
	log(_this == this);
	if (item.name == "name1" || item.name == "name2") {
		return true;
	}

}, _this));

console.clear("all");
log(_.where(test, {
	name: 'name5'
}));
//find 查找一个
log(_.findWhere(test, {
	name: 'name5'
}));
log(_.reject(test, function(element, index, list) {
	if (element.name == "name1") {
		return true;
	}
}));

log(_.every(test, function(element, index, list) {
	if (element.name == "name1") {
		return true;
	}
}));
log(_.some(test, function(element, index, list) {
	if (element.name == "name1") {
		return true;
	}
}));


log(_.contains(test,{name:"name1",text:"text5"},0));
log(_.contains(test,{name:"name1",text:"text5"},0));

console.clear();
log(_.invoke([[5, 1, 7], [3, 2, 1]], 'sort'));
log(_.invoke([[5, 1, 7], [3, 2, 1]], Array.prototype.sort));

log(_.pluck(test,"text11"));
//array length 为 0 返回true
//{} 为 true
log(_.isEmpty(_.pluck(test,"text11")));

var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
log(_.max(stooges, function(stooge){ return stooge.age; }));
log(_.min(stooges, function(stooge){ return stooge.age; }));

log(_.sortBy(stooges,"age"));
log(_.sortBy(stooges,function(element){
	return element.age;
}));

// log(_.groupBy);
log(_.groupBy([1.3, 2.1, 2.4], function(num){ return Math.floor(num); }));
log(_.groupBy(['one', 'two', 'three'], 'length'));
log(_.indexBy(stooges,"age"));
function isOdd(value){
	return value%2==0;
}
log(_.partition([0, 1, 2, 3, 4, 5], isOdd));

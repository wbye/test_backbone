//Models（模型）是任何Javascript应用的核心，
// 包括数据交互及与其相关的大量逻辑： 转换、验证、计算属性和访问控制。

var Div_test = Backbone.Model.extend({
	changeBg: function() {
		var cssColor = prompt("Please enter a CSS color:");
		this.set({
			color: cssColor
		});
	},
	changeBorder: function() {
		var cssColor = prompt("Please enter a CSS color:");
		this.set({
			bdcolor: cssColor
		});
	}
});
window.div_test = new Div_test;
//changeBg 和changeBorder是 div_test中的原型方法，所以其中的this
//在调用时指向 div_test,而且div_test中是含有Backbone中event相关方法
// console.log(div_test);
div_test.on('change:color', function(model, color) {
	$("#test").css({
		backgroundColor: color
	});
});
div_test.on('change:bdcolor', function(model, color) {
	console.log(arguments);
	$("#test").css({
		borderColor: color
	});
});
// div_test.changeBg();
// div_test.changeBorder();


var Note = Backbone.Model.extend({
	initialize: function() {},
	author: function() {},
	coordinates: function() {},
	allowedToEdit: function() {
		console.log("allowedToEdit");
		// return true;
	},
	// 父类（super） 的简述：Javascript没有提供一种直接调用父类的方式 — 如果你要重载原型链中上层定义的同名函数，
	// 如 set, 或 save ， 并且你想调用父对象的实现，这时需要明确的调用它，类似这样：
	set: function(attributes, options) {
		Backbone.Model.prototype.set.apply(this, arguments);
		//do something else
		console.log("set something");
	}
});
// extend 可以正确的设置原型链，因此通过 extend 创建的子类 (subclasses) 也可以被深度扩展。
var Private_note = Note.extend({
	allowedToEdit: function() {
		console.log("allowedToEdit Private_note");
	}
});
var p_note = new Private_note;
p_note.allowedToEdit();
p_note.set("name", "ywb");


var Book = Backbone.Model.extend({
	idAttribute: "r_id",
	//原型中的是空函数
	initialize: function() {
		console.log("initialize fun happen");
	},
	parse: function() {
			console.log(arguments);
			return {
				title: "The Ordinary World parsed",
				name: "luyao parsed"
			}
		}
		// ,	constructor:function(){
		// 	console.log("constructor fun happen");
		// }
});
// 当创建model实例时，可以传入 属性 (attributes)初始值，这些值会被 set （设置）到 model。
// 如果定义了 initialize 函数，该函数会在model创建后执行。
//加入到book的 attributes属性中,并且创建完执行initialize函数
var book = new Book({
	title: "The Ordinary World",
	name: "luyao",
	id: '001',
	r_id: 'S001'
}, {
	parse: false
});
console.log(book);

// var Library = Backbone.Model.extend({
//   constructor: function() {
//     this.books = new Book();
//     Backbone.Model.apply(this, arguments);
//   },
//   parse: function(data, options) {
//     this.book.reset(data.books);
//     return data.library;
//   }
// });
// var lib=new Library;

//model 的各种方法
//
//get 获取model属性值

//set 设置属性值，如果不传入 {silent:true}，会触发 change:xxx事件
console.log(book.set("name", "The Ordinary World  !!", {
	silent: true
}));
console.log(book.get("name"));
// escapemodel.escape(attribute) 
// 与 get 类似，只是返回的是HTML转义后版本的model属性值。如果从model插入数据到HTML，使用 escape 取数据可以避免 XSS 攻击。
// 
console.log(book.set("test", "<script>alert(2);</script>"));
console.log(book.get("test"), book.escape("test"));
// unsetmodel.unset(attribute, [options]) 
// 从内部属性散列表中删除指定属性(attribute)。 如果未设置 silent 选项，会触发 "change" 事件。
// 

book.unset("test");
console.log(book.get("test"));

// clearmodel.clear([options]) 
// 从model中删除所有属性， 包括id属性。 如果未设置 silent 选项，会触发 "change" 事件。
// 删除所有的属性,包括id属性
// book.clear();

// idmodel.id 
// id是model的特殊属性，可以是任意字符串（整型 id 或 UUID）。
// 在属性中设置的 id 会被直接拷贝到model属性上。 
// 我们可以从集合（collections）中通过 id 获取model，另外 id 通常用于生成model的 URLs。
console.log(book.id);


// cid 

// model的特殊属性，cid 或客户 id 是当所有model创建时自动产生的唯一标识符。
//  客户 ids 在model尚未保存到服务器之前便存在，此时model可能仍不具有最终的 id， 但已经需要在用户界面可见。

//attributes 
// attributes 属性是包含模型状态的内部散列表 — 通常（但不一定）JSON对象的形式表示在服务器上模型数据 。它通常是数据库中一个行的简单的序列，但它也可以是客户端的计算状态。
// 建议采用 set 更新 attributes而不要直接修改。  如果您想检索和获取模型属性的副本， 用 _.clone(model.attributes) 取而代之。
// 由于这样的事实： Events（事件）接受空格分隔事件列表， 但是属性名称不应该包括空格。

//changed

// changed属性是一个包含所有属性的内部散列，自最后 set 已改变。 自最后一组已改变。 请不要直接更新 changed，因为它的状态是由set内部维护。 changed的副本可从changedAttributes获得。
//自创建后，最后一组改变的属性值


// defaultsmodel.defaults or model.defaults() 
// defaults 散列（或函数）用于为模型指定默认属性。 创建模型实例时，任何未指定的属性会被设置为其默认值。

// var Meal = Backbone.Model.extend({
//   defaults: {
//     "appetizer":  "caesar salad",
//     "entree":     "ravioli",
//     "dessert":    "cheesecake"
//   }
// });

// alert("Dessert will be " + (new Meal).get('dessert'));
// 需要提醒的是，在 Javascript 中，对象是按引用传值的，因此如果包含一个对象作为默认值，它会被所有实例共享。可以定义 defaults为一个函数取代。

var info = {
	"gender": "male"
};
var Man = Backbone.Model.extend({
	defaults: info
});
var man = new Man();
var man2 = new Man();
// console.log(man);


//toJSON 调用_.clone方法，返回js json变量
// console.log(man.toJSON());


//sync model.sync(method, model, [options]) 
// 使用 Backbone.sync 可以将一个模型的状态持续发送到服务器。 可以自定义行为覆盖。

book.sync("create",book, {
	url: "http://www.baidu.com/x",
	error: function() {
		console.log("sync fail");
		console.log(arguments);
	},
	complete:function() {
		console.log("sync complete");
		console.log(arguments);
	}
})
// .error(function(){
// 	alert("error");
// });
book.bind("request",function(){
	console.log("request  ...");
});
book.fetch({
	url:'xxx',
	error:function(){

	}
});

book.fetch({
	url:'xxx',
	error:function(){

	}
});

//backone Model属性直接代理了 keys, values ,pairs ,invert ,pick ,omit方法  （arguments,unshift）
//book.keys  book.values  
//
console.clear();
var Chapter=Backbone.Model.extend({
	validate:function(attrs,options){
		if(attrs.end<attrs.start){
			return "can't end before it starts";
		}
	},	
	//restful借口的路径
	urlRoot:'http://www.baidu.com/test/chapter'
});
var chapter_one=new Chapter({
	title:"novel chapter ",
	id:'chapter_one'
});

chapter_one.set({
	start:15,
	end:10
});
//加入事件队列
chapter_one.on("invalid",function(model,error){
	console.log(this==model);
	console.log(arguments);
});

if(!chapter_one.isValid()){
	console.log(chapter_one.get("title")+" "+chapter_one.validationError);
}
console.log(chapter_one.url(),chapter_one.urlRoot);
chapter_one.fetch({
	// url:"xxx",
	error:function  () {
	}
});
var User=Backbone.Model.extend({

	urlRoot:function(){
		var middle_part=this.get("middle_part");
		return 'http://www.baidu.com/test/chapter'+"/"+middle_part;
	}
});



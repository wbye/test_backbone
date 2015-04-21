//backbone events
//Backbone.Events
// Events 是一个可以融合到任何对象的模块, 给予 对象绑定和触发自定义事件的能力.
// Events 在绑定之前 不需要声明, 并且还可以传递参数. 比如:
// 


//将事件绑定在对象上，用jquery的话，都是绑定在DOM上
var object = {};
//类似jquery extend
_.extend(object, Backbone.Events);

//给对象绑定alert event,别名 bind，在 object 上绑定一个callback回调函数。 只要event触发，该回调函数就会调用。
//如果你的一个页面含有大量的不同时间，我们约定使用冒号来为事件添加 命名空间 俗成地使用冒号来命名："poll:start", 或 "change:selection"
object.on("alert", function(msg) {
	alert("triggered" + msg);
});
object.bind("change:title", function(msg) {
	alert("triggered bind " + msg);
});
//约定 xxx:xxx
object.bind("change:title change:author change:content", function(msg) {
	alert("change " + msg);
});

//可以传递this 上下文
object.bind("alert:this", function(msg) {
	console.log(this);
	console.log(msg);
}, this);

//trigger event
// object.trigger("alert", "an event");
// object.trigger("change:title", "title an event");
// object.trigger("change:title change:title  alert", "title an event");

// object.trigger("alert:this"," an event ");

// 可以定义一个事件调度程序，然后在你应用的不同地方调用，例如：
var dispatcher = _.clone(Backbone.Events); //浅克隆

console.log(dispatcher);

var book = {
	name: 'give me five',
	title: "give me five  book"
};
var books = {
	book: book
};

_.extend(book, dispatcher);
_.extend(books, dispatcher);
// book.name = "give me five";
// book.title = "give me five  book";
// books.book = book;
book.on("change:name", function(name) {
	this.name = name;
}, book);

//当回调函数被绑定到特殊"all"事件时，任何事件的发生都会触发该回调函数
// book.on("all", function(msg) {
// 	//这里的msg,为eventName
// 	console.log(msg);
// 	//直接将trigger  的参数拿来了
// 	console.log(arguments);
// 	books.trigger("change");
// });

// books.on("change", function() {
// 	console.log("books update");
// 	console.log(books, book);
// });
function logName(){
	console.log("name1  xxxxx");
}
//on 支持时间映射的语法
book.on({
	"change:title1": function() {
		console.log("title1")
	},
	"change:name1":logName
});

// book.trigger("change:name", "give me  a reason !");
// 果然内部和jquery的那个回调函数模块采用的东西类似,但是这个东西false也触发，真是醉了,内部处理使用的是这个函数，可以看到没有if判断
// function eventApi(obj, action, name, rest) {
//   if (!name) return true;

//   // Handle event maps.
//   if (typeof name === 'object') {
//     for (var key in name) {
//       obj[action].apply(obj, [key, name[key]].concat(rest));
//     }
//     return false;
//   }

//   // Handle space separated event names.
//   if (eventSplitter.test(name)) {
//     var names = name.split(eventSplitter);
//     for (var i = 0, length = names.length; i < length; i++) {
//       obj[action].apply(obj, [names[i]].concat(rest));
//     }
//     return false;
//   }

//   return true;
// }
// 可以这样触发多个
// book.trigger("change:title1 change:name1");
//也可以这样
//写法灵活
// book.trigger({
// 	"change:title1": undefined,
// 	"change:name1": true
// });
//off  == unbind，去除事件
//没有指定logName则所有的相关事件都去掉
// book.off("change:name1",logName);
//其他的还有
// Removes just the `onChange` callback.
// object.off("change", onChange);

// // Removes all "change" callbacks.
// object.off("change");

// // Removes the `onChange` callback for all events.
// object.off(null, onChange);

// // Removes all callbacks for `context` for all events.
// object.off(null, null, context);

// // Removes all callbacks on `object`.
// object.off();

// book.trigger("change:name1");
// book.trigger("change:name1").trigger("change:name1");
// //once
// object.once("run:once",function(){
// 	console.log("run once ");
// 	console.log(arguments);
// });
// object.trigger("run:once").trigger("run:once");

//listenTo

// 让 object 监听 另一个（other）对象上的一个特定事件。
// 不使用other.on(event, callback, object)，
// 而使用这种形式的优点是：listenTo允许 object来跟踪这个特定事件，并且以后可以一次性全部移除它们。
// callback总是在object上下文环境中被调用。
// object.listenTo(other, event, callback) 
var bookListener={};
_.extend(bookListener,dispatcher);
function lisCal(){
	console.log(arguments);
	console.log("this is +"+(this==bookListener));
}
function lisCal_other(){
	console.log(arguments);
	console.log("this is other+"+(this==bookListener));
}
//监听某个对象的XXX事件，内部实现用了 on绑定事件，但同时保留了一个用于记录监控回调的数组，以便后来删除用
bookListener.listenTo(book,"change:name1",lisCal);
bookListener.listenTo(book,"change:name1",lisCal_other);


//停止监听事件
//stopListeningobject.stopListening([other], [event], [callback]) 
//让 object 停止监听事件。
//如果调用不带参数的stopListening，可以移除 object 下所有已经registered(注册)的callback函数...，
//或者只删除指定对象上明确告知的监听事件，或者一个删除指定事件，或者只删除指定的回调函数。

// bookListener.stopListening(book,"change:name1",lisCal);

bookListener.stopListening(book,"change:name1");

book.trigger("change:name1");

// listenToOnceobject.listenToOnce(other, event, callback) 
// 用法跟 listenTo 很像，但是事件触发一次后callback将被移除。
// 
// 
// Backbone内置事件
// "add" (model, collection, options) — 当一个model（模型）被添加到一个collection（集合）时触发。
// "remove" (model, collection, options) — 当一个model（模型）从一个collection（集合）中被删除时触发。
// "reset" (collection, options) — 当该collection（集合）的全部内容已被替换时触发。
// "sort" (collection, options) — 当该collection（集合）已被重新排序时触发。
// "change" (model, options) — 当一个model（模型）的属性改变时触发。
// "change:[attribute]" (model, value, options) — 当一个model（模型）的某个特定属性被更新时触发。
// "destroy" (model, collection, options) —当一个model（模型）被destroyed（销毁）时触发。
// "request" (model_or_collection, xhr, options) — 当一个model（模型）或collection（集合）开始发送请求到服务器时触发。
// "sync" (model_or_collection, resp, options) — 当一个model（模型）或collection（集合）成功同步到服务器时触发。
// "error" (model_or_collection, resp, options) — 当一个model（模型）或collection（集合）的请求远程服务器失败时触发。
// "invalid" (model, error, options) — 当model（模型）在客户端 validation（验证）失败时触发。
// "route:[name]" (params) —  当一个特定route（路由）相匹配时通过路由器触发。
// "route" (route, params) — 当任何一个route（路由）相匹配时通过路由器触发。
// "route" (router, route, params) — 当任何一个route（路由）相匹配时通过history（历史记录）触发。
// "all" — 所有事件发生都能触发这个特别的事件，第一个参数是触发事件的名称。
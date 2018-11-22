var express = require("express");
var app = express();
app.use(express.static("public")); /*Khach hang co the thay*/
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUsers = [];

io.on("connection" , function(socket){
	console.log("Có người kết nối " + socket.id);
	socket.on("Client-send-Username", function(data){
		if(mangUsers.indexOf(data) >= 0){
			// đăng ký thất bại
			socket.emit("Server-send-dk-thatbai");
		}
		else {
			// đăng ký thành công
			mangUsers.push(data);
			socket.Username = data;
			socket.emit("Server-send-dk-thanhcong", data);
			io.sockets.emit("Server-send-danhsach-Users" , mangUsers );
		};
		
	});

	socket.on("logout",function(){
		mangUsers.splice(
			mangUsers.indexOf(socket.Username),1 
		);
		socket.broadcast.emit("Server-send-danhsach-Users",mangUsers);
	});
		socket.on("User-send-message", function(data){
			io.sockets.emit("Server-send-message", {un:socket.Username, nd:data});
		});

		socket.on("toi-dang-go-chu",function(){
			var gochu = socket.Username + " đang nhập...";
			io.sockets.emit("ai-do-dang-go-chu", gochu);
		});
		socket.on("toi-ngung-go-chu",function(){
			io.sockets.emit("ai-do-ngung-go-chu");
		});
});

// tạo trang web
app.get("/", function(req,res){
	res.render("trangchu");
});
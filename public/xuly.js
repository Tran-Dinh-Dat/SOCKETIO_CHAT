var socket = io("http://localhost:3000");
		
		socket.on("Server-send-dk-thatbai",function(){
			alert("Tài khoản đã tồn tại !!!");
		});

		socket.on("Server-send-dk-thanhcong" ,function(data){
			$("#currentUser").html("<span class='tendangnhap'>" +data+ "</span>");
			$("#loginForm-hide").hide(1000);
			$("#chatForm").show(1000);
		});

		socket.on("Server-send-danhsach-Users", function(data){
			$("#boxcontent").html("");
			data.forEach(function(i){
			$("#boxcontent").append("<div class='user'>"+ "<img src='online.png'>" + i + "</div>");
			});
		});

		socket.on("Server-send-message" , function(data){
			$("#listMessages").append("<div class='ms'>"+ "<span class='user' >"+data.un+" : </span>" +data.nd + "</div>")
		});

		socket.on("ai-do-dang-go-chu", function(data){
			$("#thongbao").html(data + "<img id='dangchat' src='dangchat.gif'>");
		});
		socket.on("ai-do-ngung-go-chu", function(){
			$("#thongbao").html("");
		});

		$(document).ready(function(){
			$("#loginForm").show();
			$("#chatForm").hide();

			$("#txtMessages").focusin(function(){
				socket.emit("toi-dang-go-chu");
			});
			$("#txtMessages").focusout(function(){
				socket.emit("toi-ngung-go-chu");
			});

			$("#btnRegister").click(function(){
				socket.emit("Client-send-Username" , $("#txtUsername").val());
			});

			$("#btnLogout").click(function(){
			socket.emit("logout");
			$("#chatForm").hide(2000);
			$("#loginForm-hide").show(1000);	
		});
			$("#btnSendMessages").click(function(){
				socket.emit("User-send-message", $("#txtMessages").val());
			});

		});

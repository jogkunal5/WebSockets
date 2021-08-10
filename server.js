const server = require('ws').Server;
const s = new server({port:8081});

s.on('connection', function(ws){
	ws.on('message',function(msg){
		console.log("Received from client:", msg);
		let data = "Hey.. I am server! I received your data :) now sending your data back ===>  "+ msg;
		ws.send(data);
		
		// Read file and send to client for download
		
		console.log("Request received from client:", msg);

		if (msg === "download") {
			fs.readFile('./files/csvfile.csv',function(err,data){
				if(err){
					console.log(err);
				}
				//console.log(data);
				ws.send(data,{binary:true});
			});
		}
		
	});	
	
	ws.on('close',function(){
		console.log("Lost a client");
	});
	
	console.log("one more client connected");
});


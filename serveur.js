var http = require('http');
var url = require('url');
var querystring = require('querystring'); 
var fs = require('fs')
var path = require('path')

console.log("Client request !");

var serveur = http.createServer(function(req, res)
{

function mimetype(ext){		//Charge les pages en fonction de leur extension
	if (ext==".txt") {res.writeHead(200, {"Content-type": "text/plain"});}
	if (ext==".html") {res.writeHead(200, {"Content-type": "text/html"});}
	if (ext==".css") {res.writeHead(200, {"Content-type": "text/css"});}
	if (ext==".png") {res.writeHead(200, {"Content-type": "img/png"});}
	if (ext==".jpg") {res.writeHead(200, {"Content-type": "img/jpg"});}
}	

var requete = url.parse(req.url);
var nomFichier = requete.pathname;
var ext = path.extname(nomFichier);

fs.readFile(__dirname+"/"+nomFichier, function(err, data)
	{	
		if (err)
		{
			res.end("Unknown error");
		}
		else
		{
			
			mimetype(ext);
			res.end(data, 'binary');	//Envoi du contenu du fichier
		}
	}
);
}
);

serveur.listen(8080);
console.log("Server listening, port 8080");
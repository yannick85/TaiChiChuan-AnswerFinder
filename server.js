var http = require('http');
var util   = require('util');
var url   = require('url');
var tcc = require("./controller/tcc");

var simpleLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "l",
					  "m", "n", "o", "p", "r", "s", "t", "u", "v"];
var doubleLetters = ["qz", "wx", "kq", "jy"];


http.createServer(function (req, res) {
	try {
        console.log('Incoming Request from: ' +
			 req.connection.remoteAddress +
			' for href: ' + url.parse(req.url).href
        );
        var url_parts = url.parse(req.url, true);
		var get = url_parts.query;
		if (get.q == undefined) {
			//show a form to submit a query
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.end('Your query :<input type="text" id="query"/><input type="submit" value="Submit" onclick="document.location.href+=\'?q=\'+document.getElementById(\'query\').value"/>');
		} else {
			var query = get.q;
			var firstLetter = query.substring(0,1);
			if (simpleLetters.indexOf(firstLetter) > -1) {
				query = query.substring(1);
			} else {
				firstLetter = query.substring(0,2);
				if (doubleLetters.indexOf(firstLetter) == -1) { //try the other order
					firstLetter = query.substring(1,2) + query.substring(0,1);
				}
				if (doubleLetters.indexOf(firstLetter) == -1) {//bad query
					throw 'A double letter was not understood'
				} else {
					query = query.substring(2);
				}
			}
			
			var queryLetters = query.split('');
			var jumpNext = false;
			var letters = {};
			
			//on va fabriquer un objet avec les lettres à chercher et leurs nombres d'occurences
			for (var i = 0; i < queryLetters.length; i++) {
				if (jumpNext) {
					jumpNext = false;
				} else {
					var c = queryLetters[i];
					var indexOf = simpleLetters.indexOf(c);
					if (indexOf > -1) {
						//this is a simple letter
						if (letters[c] == undefined) {
							letters[c] = 1;
						} else {
							letters[c]++;
						}
					} else {
						//this is a double letter
						var c2 = queryLetters[i+1];
						var doubleC = c+c2;
						indexOf = doubleLetters.indexOf(doubleC);
						if (indexOf == -1) { //try the other order
							doubleC = c2+c;
							indexOf = doubleLetters.indexOf(doubleC);
						}
						if (indexOf == -1) {//bad query
							throw 'A double letter was not understood'
						} else {
							jumpNext = true;
							if (letters[doubleC] == undefined) {
								letters[doubleC] = 1;
							} else {
								letters[doubleC]++;
							}
						}
					}
				}
			}
			
			tcc.getTccResults(firstLetter, letters, function(result){
				res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
				res.end(result);
			})
		}
        
      } catch (err) {
        util.puts(err);
        res.writeHead(500);
        res.end('Internal Server Error!<br />'+err);
      }   
}).listen(8585, '0.0.0.0');
console.log('Server running at http://0.0.0.0:8585/');

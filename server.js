const express = require('express'),
      path    = require('path');
const app = express();
//var server_host = process.env.YOUR_HOST || '0.0.0.0';
var PORT        =  process.env.PORT || 8000;

app.use(express.static(__dirname + '/dist/FrontMatch'));

app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname + '/dist/FrontMatch/index.html'));
  //  res.sendFile('index.html', {root: 'dist/FrontMatch/'});
});


app.listen(PORT);

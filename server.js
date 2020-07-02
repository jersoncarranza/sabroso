const express = require('express'),
      path    = require('path');
const app = express();
const ngExpressEngine = require ('@nguniversal/express-engine');
//var server_host = process.env.YOUR_HOST || '0.0.0.0';
var PORT        =  process.env.PORT || 8000;

app.use(express.static(__dirname + '/dist/FrontMatch'));
app.engine('html', ngExpressEngine({
    bootstrap: ServerAppModule // Give it a module to bootstrap
  }));

app.get('/*', function(req,res){
    //res.sendFile(path.join(__dirname + '/dist/FrontMatch/index.html'));
    let url = 'http://someurl.com';
    let doc = '<html><head><title>Seo en Angular 9</title></head><body><h1>Los pasos para indexar angular en GOOGLE (SEO)</h1> </body></html>';
    res.render('../dist/index', {
      req,
      res,
      url,
      document: doc
    });
});


app.listen(PORT);

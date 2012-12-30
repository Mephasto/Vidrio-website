//setup Dependencies
var connect = require('connect')
    , express = require('express')
    , io = require('socket.io')
    , mongoose = require('mongoose')
    , port = (process.env.PORT || 8081);

//Setup Express
var server = express.createServer();
server.configure(function(){
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(connect.bodyParser());
    server.use(express.cookieParser());
    server.use(express.session({ secret: "shhhhhhhhh!"}));
    server.use(connect.static(__dirname + '/static'));
    server.use(server.router);
});

//DB connection
mongoose.connect('mongodb://localhost/test');
var models = require('./models');

//setup the errors
server.error(function(err, req, res, next){
    if (err instanceof NotFound) {
        res.render('404.jade', { locals: { 
                  title : '404 - Not Found'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'XXXXXXX' 
                },status: 404 });
    } else {
        res.render('500.jade', { locals: { 
                  title : 'The Server Encountered an Error'
                 ,description: ''
                 ,author: ''
                 ,analyticssiteid: 'XXXXXXX'
                 ,error: err 
                },status: 500 });
    }
});
server.listen(port);

//Setup Socket.IO
var io = io.listen(server);
io.sockets.on('connection', function(socket){
  console.log('Client Connected');
  socket.on('message', function(data){
    socket.broadcast.emit('server_message',data);
    socket.emit('server_message',data);
  });
  socket.on('disconnect', function(){
    console.log('Client Disconnected.');
  });
});


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////

server.get('/shows/new', function(req,res){
  res.render('newShow.jade', {
    locals : { 
              title : 'VIDRIO - Nueva fecha! :)'
             ,description: 'VIDRIO'
             ,author: 'Mephasto'
             ,analyticssiteid: 'XXXXXXX' 
            }
  });
});

server.post('/shows/new', function(req,res){
  var show = new models.Show(req.body);
  show.save(function(err){
    console.dir(err)
  });

});

server.get('/shows', function(req,res){
  models.Show.find({}, function (err, docs) {
    res.send(docs);
  });
});

server.get('/', function(req,res){
  res.render('index.jade', {
    locals : { 
              title : 'VIDRIO Trip Instrumental'
             ,description: 'VIDRIO'
             ,author: 'Mephasto'
             ,analyticssiteid: 'XXXXXXX' 
            }
  });
});
server.get('/albums', function(req,res){
  res.render('albums.jade', {
    locals : { 
              title : 'VIDRIO - Albums'
             ,description: 'VIDRIO'
             ,author: 'Mephasto'
             ,analyticssiteid: 'XXXXXXX' 
            }
  });
});

/// REST APIS ///
// server.get('/fans/:id', fans.findById);
// server.post('/fans', fans.addFan);
// server.put('/fans/:id', fans.updateFan);
// server.delete('/fans/:id', fans.deleteFan);

//A Route for Creating a 500 Error (Useful to keep around)
server.get('/500', function(req, res){
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
server.get('/*', function(req, res){
    throw new NotFound;
});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://0.0.0.0:' + port );

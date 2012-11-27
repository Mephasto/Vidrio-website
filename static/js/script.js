/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

    var socket = io.connect();

    $('#sender').bind('click', function() {
        socket.emit('message', 'Message Sent on ' + new Date());
    });

    socket.on('server_message', function(data){
        $('#receiver').append('<li>' + data + '</li>');
    });

    var tid = setInterval(mycode, 10);
    function mycode() {
        $('h2').css('background-color', '#'+Math.floor(Math.random()*16777215).toString(16));
        $('h2').css('color', '#'+Math.floor(Math.random()*16777215).toString(16));
    }

});
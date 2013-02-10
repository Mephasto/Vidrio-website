/* Author: YOUR NAME HERE
*/

$(document).ready(function() {   

    // var socket = io.connect();

    // $('#sender').bind('click', function() {
    //     socket.emit('message', 'Message Sent on ' + new Date());
    // });

    // socket.on('server_message', function(data){
    //     $('#receiver').append('<li>' + data + '</li>');
    // });

    var headerAnim = setInterval(mycode, 1000);
    function mycode() {
        $('header h2').css('background-color', '#'+Math.floor(Math.random()*16777215).toString(16));
        $('header h2').css('color', '#'+Math.floor(Math.random()*16777215).toString(16));
        $('header h1').css('color', '#'+Math.floor(Math.random()*16777215).toString(16));
    }

    //var bgAnim = setInterval(mycodeB, 100);
    function mycodeB() {
        $('body').css('background-position', Math.floor(Math.random()*255) + 'px ' + Math.floor(Math.random()*255) + 'px' );
    }

    $('#datepicker').datepicker();
    $('#timepicker').timepicker();

});
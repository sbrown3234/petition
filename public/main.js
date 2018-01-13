(function(){
  var draw = false;
  var canvas = document.getElementById('canvas').getContext('2d');
  var nav = $('nav');
  var header = $('.header');
  var exit = $('#xbtn');
  var submit = $('#register-button');


  $('#canvas').on('mousedown', function(e){
    console.log('mousedown')
    draw = true;
    canvas.lineWidth = 1;
    canvas.beginPath();
  });

  $('#canvas').on('mousemove', function(e){
    if (draw === true) {
      console.log('mousemove')
      canvas.lineTo(e.pageX - $('#canvas').offset().left, e.pageY - $('#canvas').offset().top);
      canvas.stroke();
    }
  });

  $('#canvas').on('mouseup', function(e){
    draw = false;
    var sig = document.getElementById('canvas').toDataURL();
    $('input:hidden').val(sig);
    console.log('sending', sig)
  });

  header.on('click', () => {
      nav.css('left', '0%',)
      document.body.style.opacity = "0.7";
  });

  exit.on("click", () => {
    nav.css('left', '-20%')
    document.body.style.opacity = "1";
  });

})()

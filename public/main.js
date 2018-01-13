(function(){
  var draw = false;
  var slide = false;
  var canvas = document.getElementById('canvas').getContext('2d');
  var menu = $('nav');
  var button = $('menu');
  var exit = $('#xbtn');
  var main = $('main');
  var submit = $('#register-button');


  $('#canvas').on('mousedown', function(e){
    console.log('mouse is mf down')
    draw = true;
    canvas.lineWidth = 1;
    canvas.beginPath();
  });

  $('#canvas').on('mousemove', function(e){
    if (draw === true) {
      console.log('on the move bitch')
      canvas.lineTo(e.pageX - $('#canvas').offset().left, e.pageY - $('#canvas').offset().top);
      canvas.stroke();
    }
  });

  $('#canvas').on('mouseup', function(e){
    draw = false;
    var sig = document.getElementById('canvas').toDataURL();
    $('input:hidden').val(sig);
    console.log('sendinggggg', sig)
  });

  button.on('click', () => {
    slide = true;
    menu.style.left = "77.8%";
    document.body.style.opacity = "0.7";
  });

  exit.on("click", () => {
    menu.style.left = "100%";
    document.body.style.opacity = "1";
  });

  main.on('click', (e) => {
    if (slide == true) {
      menu.style.left = "110%";
      document.body.style.opacity = "1";
      e.stopPropagation();
    } else {
      return;
    }
  });

})()

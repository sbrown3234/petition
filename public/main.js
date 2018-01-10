(function(){
  var draw = false;
  var canvas = document.getElementById('canv').getContext('2d');
  var menu = $('nav');
  var button = $('menu');
  var exit = $('#xbtn');
  var main = $('main');

  $('#canv').on('mousedown', function(e){
    console.log('mouse is mf down')
    draw = true;
    canvas.lineWidth = 1;
    canvas.beginPath();
  });

  $('#canv').on('mousemove', function(e){
    if (draw === true) {
      console.log('on the move bitch')
      canvas.lineTo(e.pageX - $('#canv').offset().left, e.pageY - $('#canv').offset().top);
      canvas.stroke();
    }
  });

  $('#canv').on('mouseup', function(e){
    console.log('sendinggggg')
    draw = false;
    var sig = document.getElementById('canv').toDataURL();
    $('input:hidden').val(sig);
    console.log(sig);
  });

button.on('click', () => {
  console.log('hey');
     menu.style.left = "77.8%";
     document.body.style.opacity = "0.7";
 });

exit.on("click", () => {
   menu.style.left = "100%";
   document.body.style.opacity = "1";
 });

 main.on('click', (e) => {
    menu.style.left = "110%";
    document.body.style.opacity = "1";
    e.stopPropagation();
  });

})()

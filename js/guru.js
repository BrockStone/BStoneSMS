// Play Button
$(".playbtn").on('click', function(){
	$(".playbtn").attr('class', 'pause');
	console.log("im playing now")
});	
// Pause Buttom
$("p.pause").on('click', function(){
	$("p.pause").attr('class', 'play');
	console.log("im paused now")
});	
// Button Pressed 
var btnpressed = '';

// Flash Ready Function ( cClick Events )
var flashReady = function() 
{
	var first = true;
	$(".playbtn").on('click', function(){
		console.log('im working')
		btnpressed = 'play';


		if(first){
			flash.connect('rtmp://localhost/SMSServer');
			first = false;
		}
		else{
			flash.playPause();
		}


	});
	$(".pause").on('click', function(){
		btnpressed = 'pause';
		flash.playPause();
	});
	$(".cam").on('click', function(){
		flash.connect('rtmp://localhost/SMSServer');
		btnpressed = 'camera';
	});

}

var connected = function(success)
{
	if(success)
	{
		if (btnpressed == 'play') {
			flash.startPlaying('hobbit_vp6')
		}
		if (btnpressed == 'pause'){
			flash.playPause('hobbit_vp6')
		}
		if (btnpressed == 'camera') {
			var flashcam = flash.getCameras();
			
			$("#cammenu").append(console.log(flashcam));
		};
	}	



 flash.startRecording


}

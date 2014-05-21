// Play Button
$("#controls").on('click','.play', function(){
	$(".play").attr('class', 'pause');
	console.log("im playing now")
});	

// Pause Buttom
$("#controls").on('click','.pause', function(){
	$(".pause").attr('class', 'play');
	console.log("im paused now")
});

//Global vars
var d = Date.now(); // Date int for unique video name 
var m = 0; // Mic to be used for record (index)
var c = 0; // Cam to be used for record (index)
var btnpressed = ''; // Button pressed;
var getDuration = function(duration){getDur = duration;}; //Get duration
var getDur;
var seekTime = function(time){ var st = (time / getDur)* 100; $('.test').val(st);};

// Flash Ready Function ( Click Events )
var flashReady = function() 
{
	// Play Button
	var first = true;
	$(".play").on('click', function(){
		btnpressed = 'play';

		if(first){
			flash.connect('rtmp://localhost/SMSServer');
			first = false;
		}
		else{
			flash.playPause();
		}
	});

	// Pause Button
	$(".pause").on('click', function(){
		flash.playPause();
		console.log("this is triggered")
	});

	// Camera Button
	var flashcam = flash.getCameras();
	for (var i = 0; i < flashcam.length; i++) {
		$('.camavail').append(flashcam[i]);
	};
	
	// Microphone Button
	var m = flash.getMicrophones();
	for (var i = 0; i < m.length; i++) {
		$('.micavail').append('<li class="micchosen" value="'+i+'">'+m[i]+'</li>');
	};
	
	//Record Button
	var startrec = true;
	$('.record').on('click', function(){
		if (startrec) {
			flash.connect('rtmp://localhost/SMSServer');
			btnpressed = 'rec';
		}else{
			flash.stopRecording();
		}
		startrec = !startrec;
	});
	
	// Volume Button
	$(".vol").on('mouseup', function(){
		var v = $(this).val();
		console.log(v);
		flash.setVolume(v);
		// btnpressed = 'volume';
	});

	$(".micavail").on('click','.micchosen', function(){
		
		m = $(this).val();
		console.log(m);
	});
	$('.test').on('mouseup', function(){
		var b = $(this).val(); // Value on slider
		var d = b * getDur;
		flash.setTime(d/100); // set to time clicked
	});
	
}

// Successfully Connected to the server 
var connected = function(success)
{
	if(success)
	{	
		if (btnpressed == 'play') {
			flash.startPlaying('hobbit_vp6')

		}
		if (btnpressed == 'rec') {
			console.log(m);
			flash.startRecording('video_' + d,c,m); //(name, cam, mic)	
		}
	}	
}

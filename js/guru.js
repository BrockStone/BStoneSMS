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

 $('#showmenu').click(function() {
                $('#menu').slideToggle("fast");

        });
        $('#showcam').click(function() {
                $('#cammenu').slideToggle("fast");

        });
        $('#showvol').click(function() {
                $('#volmenu').slideToggle("fast");

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

	// Seek time
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

//Simple Login

// Global Variables for sign in
var provider, username, password, image;

// Login 	
$('.login').click(function(){
	event.preventDefault();
	provider = $(this).attr('id');
	console.log(provider);

	// Username and Pass Sign up
	if(provider == 'signup'){
		username = $('#username').val();
		password = $('#password').val();
		auth.createUser(username, password, function(error, user) {
				if (!error) {
					alert('Welcome '+user.username);
					$('#password').val('');
				}else{
					alert(error);
				}
			});
		}
		else if(provider == 'facebook'){
			auth.login(provider);
		}
});

	
// DB Reference (https://shinning-fire-8021.firebaseio.com/)
var myDb = new Firebase('https://shining-fire-8021.firebaseio.com/');
var auth = new FirebaseSimpleLogin(myDb, function(error, user){
	if (error) {
		alert(error);
	}
	else if (user) {
		console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
		if(user.provider == 'signup'){
			username = user.username;
		}
		else if(user.provider == 'facebook'){
			username = user.displayName;
			if(user.provider == 'facebook'){
				image = 'http://graph.facebook.com/'+user.id+'/picture';
			}
		}
	}
});

	$('#addComment').on('click', function(){
		event.preventDefault();
		var comment = $('#commentInput').val();
		myDb.push({username: username, comment: comment, image: image});
		$('#commentInput').val('');
	});

	myDb.on('child_added', function(snapshot) {
		var com = snapshot.val();
		displayChatMessage(com.image, com.username, com.comment);
	});

	function displayChatMessage(image, username, comment) {
		$('#commentsDiv').prepend('<img class="user-comment-img" src="'+image+'" alt="'+username+'" height="50" width="50"> <h4strong>'+username+'</h4><br/><p>'+comment+'</p>');
	};


 



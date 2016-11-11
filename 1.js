
var user;
console.log("user --------" + user);

hideAllMessages();
app.initialize();
	  // This is an old version, for a more recent version look at
	  // https://jsfiddle.net/DRSDavidSoft/zb4ft1qq/2/

// *********************** MOBILENO ********************************
function maxLengthCheck(object)
{
	console.log(object.maxLength);
	if (object.value.length > object.maxLength)
		object.value = object.value.slice(0, object.maxLength)
}

$(".ui-icon-home").on("click", function(){
	$.mobile.changePage( "#home", { transition: "slideup"} );

	console.log("btn clicked");
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@ LOGIN @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

$('#loginBtn').click(function(){
	var username = $('#username').val();
// window.plugins.toast.showShortTop('Hello there!', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
	var password = $('#password').val();
	console.log("hello"+username);
	console.log("helloo"+password);
	var request = $.ajax({
		url: "http://192.168.1.120:8000/appauth/",
		method: "POST",
		data: { username :username, password : password},
		dataType: "json",	
	})

	request.done(function(msg, headers) {

		console.log("------->"+msg.validation);
		if (msg.status==false){
			$('#loginAlert').text(msg.validation);
			$('#loginAlert').show();

		}else{
			user = msg.userId
			console.log("new--user"+ user);
			window.localStorage.setItem("user", user);

			console.log("user-scalable"+msg.userId);
			$('#userId1').val(window.localStorage.getItem("user"));
			$('#userId2').val(window.localStorage.getItem("user"));
			$('#username').val('');
			$('#password').val('');

			$.mobile.changePage( "#home", { transition: "slideup"} );
		}
	});

	request.fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );


	});
});

// ######################### LOGOUT ####################################

$('#logout').click(function(event){

	var request = $.ajax({
		url: "http://192.168.1.120:8000/app/logout/",
		method: "GET",
		dataType: "json"
	});

	request.done(function(msg) {

		console.log("------->"+msg);
		if (msg.status==true){
			$.mobile.changePage( "#login", { transition: "slideup"} );

		}
	});
	request.fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
});

// $$$$$$$$$$$$$$$$$$$$$$$ SUBEVENT $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

var request1 = $.ajax({
	url: "http://192.168.1.120:8000/sendSubevent/",
	method: "GET",
	dataType: "json"
});

request1.done(function(msg) {

	console.log("event list->"+msg.subeventList);
	console.log("jgmfhngbd"+msg);
	var $el = $("#select-native-1");
	var sendEvent=$el.val();
	console.log("value"+$el);
	console.log("value"+sendEvent);
		$el.empty(); // remove old options
		for ( var i = 0, l = msg.subeventList.length; i < l; i++ ) {
			temp=(msg.subeventList[i].id);

			console.log('eventId is'+msg.subeventList[i].id);
			var teamsize1= $el.append($("<option></option>")
				.attr("value", msg.subeventList[i].id).text(msg.subeventList[i].eventName)
				.attr("data-teamsize", msg.subeventList[i].teamSize));
		}
		var counter=0;
		$('select').change(function () {

			var str = $(this).find(':selected').data('teamsize');
			console.log("-------->team"+str);
			$("#nameField").html('');
			for( var i = 0; i<str; i++){
				console.log("value of i is given " + i , str);

				var tagType='<input  class="form-control form-control1 fname prev new1" placeholder="First Name" id="fname'+(i+2)+'" type="text" data-id="'+(i+2)+'" name="firstName'+(i)+'" />'+
				'<input class="form-control form-control1 mname prev new1" placeholder="Middle Name" id="mname'+(i+2)+'" type="text" data-id="'+(i+2)+'" name="MiddleName'+(i)+'" />'+

				'<input class="form-control form-control1 lname prev new1" placeholder="Last Name" id="lname'+(i+2)+'" type="text" data-id="'+(i+2)+'" name="lastName'+(i)+'"/>';
					// console.log('value'+i);


					if(i<str - 1){
						var index=$("#nameField").append(tagType);
						$('custom_input[type="text"]').change(function() {
							$(':custom_input').addClass("form-control1");
						});

					}
					console.log("value of counter " + counter);
					counter++;
				}

			})
		.change();
		$('select').change(function(){
			teamSize = $(this).find(':selected').data('teamsize')
			console.log("size"+teamSize);
		});

	});
request1.fail(function( jqXHR, textStatus ) {
	alert( "Request failed: " + textStatus );
});
// &&&&&&&&&&&&&&&&&&&&&&&& REGISTER &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
function register(){
	console.log($( "form" ).serialize());
	console.log("value of temp is "+temp);
	var request2=$.ajax({
		method: "POST",
		url: "http://192.168.1.120:8000/applicant/registrationByVolunteer/",
		data: $( "form" ).serialize(),
	})
	request2.done(function( msg ) {
		
	  		// alert( "Data Saved: " + msg );
	  		// console.log( "Data Saved: " + msg );
	  		$('#std').val('');
	  		$('#iname').val('');
	  		$('#city').val('');
	  		$('#email').val('');
	  		$('#mobnumber').val('');
	  		$('#mobnum1').val('');
	  		$('.fname').each(function(){
	  			var id=$(this).data('id');
	  			console.log('show text id'+id);
	  			$('#fname'+id).val('');
	  		})
	  		$('.mname').each(function(){
	  			var id=$(this).data('id');
	  			console.log('show text id'+id);
	  			$('#mname'+id).val('');
	  		})
	  		$('.lname').each(function(){
	  			var id=$(this).data('id');
	  			console.log('show text id'+id);
	  			$('#lname'+id).val('');
	  		})

	  		console.log(msg.validation);
	  		if (msg.status==false){
	  			$('#registerAlert').text(msg.validation);
	  			$('#registerAlert').show();

	  		}else{

	  			console.log(msg.validation)
	  			$.mobile.changePage( "#home", { transition: "slideup"} );
	  			alert(msg.validation);
	  		}
	  	});

	request2.fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});0
}


var fewSeconds = 10;
$('#show').click(function(){
    // Ajax request
    var btn = $(this);
    btn.prop('disabled', true);
    setTimeout(function(){
    	btn.prop('disabled', false);
    }, fewSeconds*2000);
});

// **********************confirmation*********************************

$('#eventDetail').click(function(msg, headers){
	var rId = $('#eventId2').val();
	console.log(rId);

	var user1 = window.localStorage.getItem("user");
	console.log("new user details"+user1);
	console.log("user-scalable"+msg.userId);
	$('#userId2').val(msg.userId);
	console.log("dfg"+msg.userId);
	$('#userId1').val(msg.userId);
	$("#eventId2").val('');
	
	var request3 = $.ajax({
		url: "http://192.168.1.120:8000/applicant/collectfees/",
		method: "POST",
		data: { registrationId :rId,registerUserId:user1},
		dataType: "json",	
	})

	request3.done(function(msg,headers) {
		console.log("dfgyuhi"+msg.validation);
		if (msg.status==true){
			// $('#app').text(msg.validation);
			// $('#app').show();
			alert(msg.validation);
			$.mobile.changePage( "#procesed", { transition: "slideup"} );

		}else{

			console.log(msg.validation);
 			// $.mobile.changePage( "#procesed", { transition: "slideup"} );
	  		// alert(msg.validation);
	  	}
	  });
	request3.fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
});



// **************************Process****************************
var text;
$('#eventDetail').click(function(event){
	var user1 = window.localStorage.getItem("user");
	var url = "http://192.168.1.120:8000/applicant/sendTotalFees/",
	data = {'registerUserId' : user1};

	$.post(url, data, function(data){
		console.log('new json request response ---->');
		console.log(data);
		var applicantRecordEntry = data.feesList;
		var applicantTotalPaid = data.totalPaid;
		console.log("applicantRecordEntry"+applicantRecordEntry);
		console.log("applicantTotalPaid "+applicantTotalPaid );
		// $('#proceedData').text(applicantTotalPaid);
		var applicantRecord;
		$('#tableRecord').html('');
		for(var i = 0; i < applicantRecordEntry.length; i++){
			console.log(i + "record" + applicantRecordEntry[i])
			applicantRecord = '<tr><td>'+applicantRecordEntry[i].firstName+'</td><td>'+applicantRecordEntry[i].lastName+'</td><td>'+applicantRecordEntry[i].SubEvent+'</td><td>'+applicantRecordEntry[i].registrationId+'</td><tr>';

			$('#tableRecord').append(applicantRecord);
			 // applicantRecordEntry={};
			}

		}, 'json');

});


$(window).load(function() {
    var vWidth = $(window).width();
    var vHeight = $(window).height();
    $('#studeEntery > section').css('width', vWidth).css('height', vHeight);
});

$(window).resize(function() {
    var vWidth = $(window).width();
    var vHeight = $(window).height();
    $('#studeEntery > section').css('width', vWidth).css('height', vHeight);
});
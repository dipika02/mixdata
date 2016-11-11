var myMessages = ['info','warning','error','success'];
function hideAllMessages(){
	console.log('hide all message');
	var messagesHeights = new Array(); // this array will store height for each
	for (i=0; i<myMessages.length; i++){
	messagesHeights[i] = $('.' + myMessages[i]).outerHeight(); // fill array
	$('.' + myMessages[i]).css('top', -messagesHeights[i]); //move element outside viewport
	}
}
function showMessage(type){
	console.log(type);
	$('.'+ type +'-trigger').click(function(){
		hideAllMessages();
		$('.'+type).animate({top:"50"}, 500);
	});
}

$('.message').click(function(){
	$(this).animate({top: -$(this).outerHeight()}, 500);
});

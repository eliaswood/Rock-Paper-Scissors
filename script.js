$(document).ready(function() {
	var playerScore= parseInt(localStorage.getItem("pScore")) || 0;
	var computerScore= parseInt(localStorage.getItem('wScore')) || 0;
	var notification= null
	var notificationTimer= null
	scoreBoard();

	function result(wizard, player){
		var result = (3 + player - wizard) % 3;
		if (result === 1) {
	 	playerScore= playerScore + 1;
	 	notification=setTimeout(function(){countDownNotification5()}, 1750);
	} else if (result === 2) {	
		computerScore= computerScore + 1;
		notification=setTimeout(function(){countDownNotification6()}, 1750);
	} else {
	 notification=setTimeout(function(){countDownNotification7()}, 1750);
	scoreBoard();
	}}
	function countDown(){
		var rockTime= setTimeout(function(){countDownNotification1()}, 250);
		var paperTime= setTimeout(function(){countDownNotification2()}, 750);
		var scissorsTime= setTimeout(function(){countDownNotification3()}, 1250);
		var shootTime= setTimeout(function(){countDownNotification4()}, 1750);
		$("#notificationTimer").html(notificationTimer);	
		}
	function countDownNotification1(){
			notificationTimer=("Rock")
			$("#notificationTimer").html(notificationTimer);
	}
	function countDownNotification2(){
			notificationTimer=("Paper")
			$("#notificationTimer").html(notificationTimer);
	}
	function countDownNotification3(){
			notificationTimer=("Scissors")
			$("#notificationTimer").html(notificationTimer);
	}
	function countDownNotification4(){
			notification=("Shoot!")
			$("#notificationTimer").html(notificationTimer);
	}
	function countDownNotification5(){
			notificationTimer=("You Win!")
			$("#notification").html(notification);
	}
	function countDownNotification6(){
			notificationTimer=("You Lose!")
			$("#notification").html(notification);
	}
	function countDownNotification7(){
			notificationTimer=("You Tied!")
			$("#notification").html(notification);
	}

	function play(x) {
		var y = wizard();
		console.log("Player=" + x);
	 	console.log("Wizard=" + y);
		result(y, x);
	};

	$("#Rock").click(function() {
		play(1);
		countDown();

	});

	$("#Paper").click(function() {
		play(2);
		countDown();
	});

	$("#Scissors").click(function() {
		play(3) ;
		countDown();
	});

	function wizard(){
		var randomNumber=Math.random()*3+1;
	 	return Math.floor(randomNumber);
	}

	function scoreBoard(){
		console.log("Score: You " + playerScore + "-" + computerScore + " Computer");
		$("#Player").html(playerScore);
	 	$("#Computer").html(computerScore);
		$("#notification").html(notification);
		localStorage.setItem("wScore", computerScore) ;
		localStorage.setItem("pScore", playerScore) ;
};
	$("#Reset").click(function(){
			computerScore= 0
			localStorage.setItem("wScore", computerScore);
			playerScore= 0
			localStorage.setItem("pScore", playerScore);
			notification= null;
			scoreBoard();
			notificationTimer=null;
		})
});

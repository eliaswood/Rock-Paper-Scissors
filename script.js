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
	 	countDown1();
	 } else if (result === 2) {	
		computerScore= computerScore + 1;
		countDown2();
	} else {
	 	countDown3();
		}
		countDownScore();
	}
	function countDown(){
		var rockTime= setTimeout(function(){countDownNotification1()}, 250);
		var paperTime= setTimeout(function(){countDownNotification2()}, 750);
		var scissorsTime= setTimeout(function(){countDownNotification3()}, 1250);
		var shootTime= setTimeout(function(){countDownNotification4()}, 1750);
		$("#notificationTimer").html(notificationTimer);	
	}
	function countDown1(){
		var notification1=setTimeout(function(){countDownNotification5()}, 1750);
		$("#notification").html(notification);
	}
	function countDown2(){
		var notification2=setTimeout(function(){countDownNotification6()}, 1750);
		$("#notification").html(notification);
	}
	function countDown3(){
		var notification3=setTimeout(function(){countDownNotification7()}, 1750);
		$("#notification").html(notification);
	}
	function countDownScore(){
		var sBT=setTimeout(function(){result()}, 1750);
		$("#Player").html(playerScore);
	 	$("#Computer").html(computerScore);
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
			notificationTimer=("Shoot!")
			$("#notificationTimer").html(notificationTimer);
	}
	function countDownNotification5(){
			notification=("You Win!")
			$("#notification").html(notification);
	}
	function countDownNotification6(){
			notification=("You Lose!")
			$("#notification").html(notification);
	}
	function countDownNotification7(){
			notification=("You Tied!")
			$("#notification").html(notification);
	}
	function scoreBoardTime(){
			("Score: You " + playerScore + "-" + computerScore + " Computer");
			$("#Player").html(playerScore);
	 		$("#Computer").html(computerScore);

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
		countDownScore();

	});

	$("#Paper").click(function() {
		play(2);
		countDown();
		countDownScore();
	});

	$("#Scissors").click(function() {
		play(3) ;
		countDown();
		countDownScore();
	});

	function wizard(){
		var randomNumber=Math.random()*3+1;
	 	return Math.floor(randomNumber);
	}

	function scoreBoard(){
		$("#Player").html(playerScore);
	 	$("#Computer").html(computerScore);
		$("#notification").html(notification);
		$("#notificationTimer").html(notificationTimer);
		localStorage.setItem("wScore", computerScore) ;
		localStorage.setItem("pScore", playerScore) ;
};
	$("#Reset").click(function(){
			computerScore= 0
			localStorage.setItem("wScore", computerScore);
			playerScore= 0
			localStorage.setItem("pScore", playerScore);
			notification= null;
			notificationTimer=null;
			scoreBoard();
		})
});

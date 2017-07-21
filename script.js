$(document).ready(function() {
	var playerScore=0
	var computerScore=0
	var notification= null

	function result(wizard, player){
		var result = (3 + player - wizard) % 3;
		if (result === 1) {
	 notification=("You win");
	 playerScore= playerScore + 1;
	} else if (result === 2) {
		notification=("You Lose");
	 computerScore= computerScore + 1;

	} else {
	 notification=("You Tied");
	}
	scoreBoard();
	}

	function play(x) {
		var y = wizard();

	 console.log("Player=" + x);
	 console.log("Wizard=" + y);

		result(y, x);
	};

	$("#Rock").click(function() {
		play(1)
	});

	$("#Paper").click(function() {
		play(2)
	});

	$("#Scissors").click(function() {
		play(3)
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
	}
});

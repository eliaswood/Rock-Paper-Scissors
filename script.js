$(document).ready(function() {
	/* Here we declare the variables we are going to use.
	Since we are just writing it as 'var x;', the
	variables will be initialized to undefined. This might
	see like a weird thing to do, but it has to do with
	function scope.

	Basically, by declaring them here, we are saying that
	any of the other functions are allowed to use these
	variables. */
	var playerScore;
	var computerScore;
	var notification;
	var timerMessage;
	function getComputerMove(){
		/* This function returns 1, 2, or 3 randomly */
		return Math.floor(
			(Math.random() * 5) + 1
		);
	}

	function calculateResult(playerMove, computerMove) {
		/* Given a playerMove (an interger 1 - 3) and a
		computerMove (also an interger 1 - 3), this function
		returns the result of one game of Rock, Paper, Scissors.

		0 means a tie.
		1 means the player won.
		2 means the computer won. */
		return (5 + computerMove - playerMove) % 5;
	}

	function updateScoreboardHTML() {
		/* Makes sure the scoreboard html is up
		to date with the values stored in the playerScore
		and computerScore variables. */
		$("#Player").html(playerScore);
		$("#Computer").html(computerScore);
	}

	function persistScore() {
		/* Makes sure the values stored in localStorage
		are up to date with the values stored in the
		playerScore and computerScore variables. */
		localStorage.setItem('wScore', computerScore);
		localStorage.setItem('pScore', playerScore);
	}

	function getPersistedScore(name) {
		/* Given a name (either 'pScore' or 'wScore'),
		retrieves and parses the value stored in localStorage.
		We have to use parseInt because localStorage can
		only stored strings. So everything that is 'set' into
		localStorage is turned into a string. Now when we 'get'
		it out, we need to turn it into a number. */
		return parseInt(localStorage.getItem(name)) || 0;
	}

	function updateScore(newPlayerScore, newComputerScore) {
		/* Given a new playerScore and computerScore, updates
		the associated variabels, updates the scoreboard HTML,
		and persists the values in localStorage.

		Any time you want to alter the playerScore, you should
		call this. Don't call 'playerScore = x' directly. */
		playerScore = newPlayerScore;
		computerScore = newComputerScore;
		updateScoreboardHTML();
		persistScore();
	}

	function updateNotification(newNotification) {
		/* Set new value for notification and update the HTML */
		notification = newNotification;
		$("#notification").html(notification);
	}

	function updateTimerMessage(newTimerMessage) {
		/* Set new value for timerMessage and update the HTML */
		timerMessage = newTimerMessage;
		$("#notificationTimer").html(timerMessage);
	}
	function disable(){
    $("#Reset").attr("disabled",true);
    $("#Rock").attr("disabled",true);
    $("#Paper").attr("disabled",true);
    $("#Scissors").attr("disabled",true);
    $("#Lizard").attr("disabled",true);
    $("#Spock").attr("disabled",true);
	}
	function enable(){
    $("#Reset").attr("disabled",false);
    $("#Rock").attr("disabled",false);
    $("#Paper").attr("disabled",false);
    $("#Scissors").attr("disabled",false);
    $("#Lizard").attr("disabled",false);
    $("#Spock").attr("disabled",false);
	}
  /* Here we are initializing the variables. We are pulling
  the scores out of localStorage and setting everything else
  to null */
	updateScore(
		getPersistedScore('pScore'),
		getPersistedScore('wScore')
	);

	updateNotification(null);
	updateTimerMessage(null);

	function countDown(cb){
		/* This function handles the animation before the result
		of the game is shown. It only takes one argument, cb.
		cb stands for callback. A callback is a function that you
		want to run after another function completes.

		All you need to know about this countDown function is that
		it makes the timerMessage say 'Rock...', waits 500 ms, then
		'Paper...', 'Scissors...', 'Shoot!'.

		After all that is down, it invokes cb. */

		// Immediately set timerMessage to 'Rock...'
		updateTimerMessage('Rock...');

		// Wait 500 ms
		setTimeout(function() {

			// then set timerMessage to 'Paper...'
			updateTimerMessage('Paper...');

			// Wait 500 ms
			setTimeout(function() {

				// then set timerMessage to 'Scissors...'
				updateTimerMessage('Scissors...');

				// Wait 500 ms
				setTimeout(function() {

					// then set timerMessage to 'Shoot!'
					updateTimerMessage('Lizard...');
					// then, immediately invoke cb.
					setTimeout(function() {
						updateTimerMessage('Spock...')
						setTimeout(function(){
							updateTimerMessage('Shoot!...')
							cb();
						}, 500);
					}, 500);
				}, 500);
			}, 500);
		}, 500);

		disable ("disable", true);
		// TODO: there's a better way to write this than 4 nested setTimeout's
	}

	function play(playerMove) {
		/* This function will be invoked each time the
		game is to be played. It takes one argument, playerMove
		(an integer 1 - 3). */

		// Immediately, set notification to null
		updateNotification(null);
		// Calculate the result.
		updateChoices(null, null);
		var computerMove= getComputerMove();
		var result = calculateResult(
			playerMove,
			computerMove
		);

		/* Begin count down animation. Notice everything in
		the function() { ... part is a callback. I.e., it
		will not be run until the count down animation is over. */
		countDown(function() {
			// This will happen after the count down animation is over.

			// if the player won the game...
			if (result === 2 || result === 4){
				// ...update score so that player score is increased by one
				updateScore(playerScore + 1, computerScore);
				// ...set notification to 'You Win!'
				updateNotification('You Win!');
			} else if (result === 1 || result === 3){
				// if the computer won the game...
				// ...update score so that computer score is increased by one
				updateScore(playerScore, computerScore + 1);
				// ...set notification to 'You Lose!'
				updateNotification('You Lose!');
			} else {
				// if it was a tie...
				// ...only set notification to 'You Tied!', do not update score
				updateNotification('You Tied!');
			}
			enable("disabled", false);
			updateChoices(playerMove, computerMove);

		});
		
	};
	function updateChoices(playerMove, computerMove){
		if (playerMove !== null && computerMove !== null) {
			var playerChoiceName= map [playerMove].image;
			var computerChoiceName= map [computerMove].image;
			
			$('#computerChoice').html('<img src="' + computerChoiceName + '" />');
			$('#playerChoice').html('<img src="' + playerChoiceName + '" />');
		} else {
			$('#computerChoice').html(null);
			$('#playerChoice').html(null);
		}		
	}
	var map = {
		'1': {name:'rock', image: 'images/rock.png'},
		'2': {name:'Paper', image: 'images/paper.png'},
		'3': {name:'Scissors', image: 'images/scizzors.png'},
		'5': {name:'Lizard', image: 'images/lizard.jpg'},
		'4': {name:'Spock', image: 'images/how-to-draw-spock.gif'},
	}


	$("#Rock").click(function() {
		// When rock button is clicked, call play with playerScore = 1
		play(1);
	
	});

	$("#Paper").click(function() {
		// When rock button is clicked, call play with playerScore = 2
		play(2);
		
	});

	$("#Scissors").click(function() {
		// When rock button is clicked, call play with playerScore = 3
		play(3)
	
	});

	$("#Lizard").click(function() {
		// When rock button is clicked, call play with playerScore = 3
		play(5)
	
	});

	$("#Spock").click(function() {
		// When rock button is clicked, call play with playerScore = 3
		play(4)
	
	});


	$("#Reset").click(function() {
		// When reset button is clicked...
		// ...update score to 0 - 0
		console.log("I was clicked");
		updateScore(0, 0);
		// ...update notification to null
		updateNotification(null);
		// ...update notification to null
		updateTimerMessage(null);
		updateChoices(null,null);
	});
});

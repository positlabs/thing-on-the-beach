var Timer = function(el){

	var paused = false;
	var then = Date.now();
	var elapsed = 0;
	var tick = function(){
		if(paused) return;
		requestAnimationFrame(tick);

		elapsed += Date.now()-then;
		then = Date.now();
		var totalSeconds = Math.floor(elapsed / 1000);
		var decimal = elapsed/1000 - totalSeconds;
		decimal = Math.round(decimal * 100);
		var seconds = totalSeconds % 60;
		el.innerHTML = seconds + '.' + decimal;
	};

	this.start = function(){
		paused = false;
		tick();
	};

	this.stop = function(){ paused = true; };

};

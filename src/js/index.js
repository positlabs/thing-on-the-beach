(function(){

var stageWidth = 1280;
var stageHeight = 720;

var renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var bgTexture = PIXI.Texture.fromImage('assets/imgs/beach.jpg');
var bg = new PIXI.Sprite(bgTexture);
stage.addChild(bg);

var tentacles = [];
window.tentacles = tentacles;
tentacles.push(new Tentacle());
tentacles.push(new Tentacle());
tentacles.push(new Tentacle());
tentacles.push(new Tentacle());

var leftX = -300;
var rightX = stageWidth + 300;

tentacles[0].sprite.x = rightX;
tentacles[0].sprite.y = stageHeight * 0.6;

tentacles[1].sprite.x = rightX;
tentacles[1].sprite.y = stageHeight * 0.8;

tentacles[2].sprite.scale.x *= -1;
tentacles[2].sprite.x = leftX;
tentacles[2].sprite.y = stageHeight * 0.6;

tentacles[3].sprite.scale.x *= -1;
tentacles[3].sprite.x = leftX;
tentacles[3].sprite.y = stageHeight * 0.8;

tentacles.forEach(function(tentacle){
	stage.addChild(tentacle.sprite);
});

console.log(tentacles[0]);

var time = 0;
var update = function(){
	time += 0.1;
	tentacles.forEach(function(tentacle){
		tentacle.update(time);
	});
	renderer.render(stage);
	requestAnimationFrame(update);
};
update();


})();

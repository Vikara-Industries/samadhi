const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


//UI
const uiMarginY = 100;
const uiMarginX = 200;
const uiLength = 400;
const uiColor = "#BBBBBB";
const textColor = "#3d0066"
const promptLength = 50;
const toleranceMargin =60;

let score = 0;

let promptTLD, promptTRD, promptBLD, promptBRD = false;
let promptTopLeft = "e";
let promptTopRight = "i";
let promptBottomLeft = "v";
let promptBottomRight = "n";

const shapes = [];
let song=[];

let speed = 20;
let fpb = 40;
let timeToUi = (uiLength)/speed;

//AUDIO
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const gainNode = audioCtx.createGain();
gainNode.gain.setValueAtTime(1,0);
gainNode.connect(audioCtx.destination);
const scale = {"G":196.00,"A":220.00,"Bb":233.08,"C":261.63,"D":293.66,"Eb":311.13,"F":349.23,"P":0};

let beatTrack = [{"tone":scale["P"],"duration":50},
{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},{"tone":scale["A"],"duration":50},
{"tone":scale["P"],"duration":400},
{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["A"],"duration":25},];
let bassTrack = [{"tone":scale["P"],"duration":100},
{"tone":scale["G"],"duration":200},{"tone":scale["Bb"],"duration":100},{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},
{"tone":scale["G"],"duration":200},{"tone":scale["Bb"],"duration":100},{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},
{"tone":scale["C"],"duration":200},{"tone":scale["A"],"duration":100},{"tone":scale["Bb"],"duration":50},{"tone":scale["A"],"duration":50},
{"tone":scale["G"],"duration":200},{"tone":scale["Bb"],"duration":100},{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},
{"tone":scale["G"],"duration":200},{"tone":scale["Bb"],"duration":100},{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},
{"tone":scale["C"],"duration":200},{"tone":scale["Bb"],"duration":100},{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},
{"tone":scale["G"],"duration":200},
{"tone":scale["G"],"duration":200},{"tone":scale["Bb"],"duration":100},{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},
{"tone":scale["C"],"duration":200},{"tone":scale["A"],"duration":100},{"tone":scale["Bb"],"duration":50},{"tone":scale["A"],"duration":50},
{"tone":scale["G"],"duration":200},{"tone":scale["Bb"],"duration":100},{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},
{"tone":scale["G"],"duration":200},{"tone":scale["Bb"],"duration":100},{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},
{"tone":scale["C"],"duration":200},{"tone":scale["Bb"],"duration":100},{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},
{"tone":scale["G"],"duration":200},

{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["G"],"duration":75},{"tone":scale["Bb"],"duration":50},{"tone":scale["G"],"duration":25},{"tone":scale["C"],"duration":25},{"tone":scale["G"],"duration":25},{"tone":scale["P"],"duration":25},

{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["G"],"duration":75},{"tone":scale["Bb"],"duration":50},{"tone":scale["G"],"duration":25},{"tone":scale["C"],"duration":25},{"tone":scale["G"],"duration":25},{"tone":scale["P"],"duration":25},

{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["G"],"duration":75},{"tone":scale["Bb"],"duration":50},{"tone":scale["G"],"duration":25},{"tone":scale["C"],"duration":25},{"tone":scale["G"],"duration":25},{"tone":scale["P"],"duration":25},
];

let mellTrack = [{"tone":scale["P"],"duration":500},
{"tone":scale["G"],"duration":200},{"tone":scale["Bb"],"duration":100},{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},
{"tone":scale["G"],"duration":200},{"tone":scale["Bb"],"duration":100},{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},
{"tone":scale["G"],"duration":200},{"tone":scale["A"],"duration":50},{"tone":scale["C"],"duration":50},{"tone":scale["Bb"],"duration":50},{"tone":scale["A"],"duration":50},
{"tone":scale["G"],"duration":200},{"tone":scale["A"],"duration":50},{"tone":scale["C"],"duration":50},{"tone":scale["Bb"],"duration":50},{"tone":scale["A"],"duration":50},
{"tone":scale["G"],"duration":200},{"tone":scale["A"],"duration":50},{"tone":scale["C"],"duration":50},{"tone":scale["Bb"],"duration":50},{"tone":scale["A"],"duration":50},
{"tone":scale["Bb"],"duration":50},
{"tone":scale["G"],"duration":100},{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},
{"tone":scale["G"],"duration":100},

{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},{"tone":scale["D"],"duration":100},
{"tone":scale["Bb"],"duration":50},{"tone":scale["C"],"duration":50},{"tone":scale["A"],"duration":100},
{"tone":scale["G"],"duration":100},

{"tone":scale["A"],"duration":50},{"tone":scale["Bb"],"duration":50},{"tone":scale["C"],"duration":100},
{"tone":scale["Bb"],"duration":50},{"tone":scale["C"],"duration":50},{"tone":scale["D"],"duration":100},
{"tone":scale["C"],"duration":50},{"tone":scale["D"],"duration":50},{"tone":scale["F"],"duration":100},
{"tone":scale["D"],"duration":50},{"tone":scale["F"],"duration":50},{"tone":scale["G"],"duration":100},
{"tone":scale["D"],"duration":50},{"tone":scale["F"],"duration":50},{"tone":scale["G"],"duration":100},
{"tone":scale["D"],"duration":50},{"tone":scale["F"],"duration":50},{"tone":scale["G"],"duration":100},

{"tone":scale["P"],"duration":350},

{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["G"],"duration":75},{"tone":scale["Bb"],"duration":50},{"tone":scale["G"],"duration":25},{"tone":scale["C"],"duration":25},{"tone":scale["G"],"duration":25},{"tone":scale["P"],"duration":25},

{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["G"],"duration":75},{"tone":scale["Bb"],"duration":50},{"tone":scale["G"],"duration":25},{"tone":scale["C"],"duration":25},{"tone":scale["G"],"duration":25},{"tone":scale["P"],"duration":25},

{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["C"],"duration":75},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["A"],"duration":25},{"tone":scale["Bb"],"duration":25},{"tone":scale["C"],"duration":25},
{"tone":scale["G"],"duration":75},{"tone":scale["Bb"],"duration":50},{"tone":scale["G"],"duration":25},{"tone":scale["C"],"duration":25},{"tone":scale["G"],"duration":25},{"tone":scale["P"],"duration":25},
];


let readTrack = function(track,currentNote){
	let note = track[currentNote];
	return [ note["tone"], note["duration"]];
}
const getBeat = function(){
	const kickOscilator = audioCtx.createOscillator();
	kickOscilator.type = "triangle";
	kickOscilator.frequency.setValueAtTime(150,0);
	kickOscilator.frequency.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
	
	
	const gainKick = audioCtx.createGain();
	gainKick.gain.setValueAtTime(0.5,0);
	gainKick.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
	
	
	kickOscilator.connect(gainKick);
	gainKick.connect(gainNode);
	kickOscilator.start();
	kickOscilator.stop(audioCtx.currentTime+0.5);	
}

const getMell = function(tone, duration,octave = 0){
	
	
	const kickOscilator = audioCtx.createOscillator();
	kickOscilator.type = "sine";
	kickOscilator.frequency.setValueAtTime(tone* (2**octave),0);
	
	
	
	const gainKick = audioCtx.createGain();
	gainKick.gain.setValueAtTime(0.3,0);
	gainKick.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration/50);
		
	kickOscilator.connect(gainKick);
	gainKick.connect(gainNode);
	kickOscilator.start();
	kickOscilator.stop(audioCtx.currentTime+(duration/50));
	
}

const getBass = function(tone, duration,octave = 0){
	
	
	const kickOscilator = audioCtx.createOscillator();
	kickOscilator.type = "triangle";
	kickOscilator.frequency.setValueAtTime(tone* (2**octave),0);
	
	
	
	const gainKick = audioCtx.createGain();
	gainKick.gain.setValueAtTime(0.5,0);
	gainKick.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration/50);
		
	kickOscilator.connect(gainKick);
	gainKick.connect(gainNode);
	kickOscilator.start();
	kickOscilator.stop(audioCtx.currentTime+(duration/50));
	
}

//
const bgImg = new Image();
bgImg.src="Sprites/BG.svg"

const sprTL = new Image();
sprTL.src = 'Sprites/sprTL.svg'
const sprTR = new Image();
sprTR.src = 'Sprites/sprTR.svg'
const sprBL = new Image();
sprBL.src = 'Sprites/sprBL.svg'
const sprBR = new Image();
sprBR.src = 'Sprites/sprBR.svg'

const sprTRL = new Image();
sprTRL.src = 'Sprites/sprTRL.svg'
const sprBRL = new Image();
sprBRL.src = 'Sprites/sprBRL.svg'
const sprTBL = new Image();
sprTBL.src = 'Sprites/sprTBL.svg'
const sprTBR = new Image();
sprTBR.src = 'Sprites/sprTBR.svg'

const sprTLBR = new Image();
sprTLBR.src = 'Sprites/sprTLBR.svg'
const sprTRBL = new Image();
sprTRBL.src = 'Sprites/sprTRBL.svg'




//Shape consts
function Shape(){
		this.spr;
		this.length = 0;
		this.contacts=[];
		this.fuckup= false;
		
		this.resolve = function(){
			for(i in this.contacts){
				let prop = Object.getOwnPropertyNames(this.contacts[i]);
				if(!this.contacts[i][prop]){
					this.fuckup = true;
				}
			}
			if(this.fuckup){score--;}
			else{score++;};
		}
		this.check= function(key){
			for(i in this.contacts){
				
				if(this.contacts[i].hasOwnProperty(key)){
					
					this.contacts[i][key] = true;
					
					return;
				}
			}
			this.fuckup=true;
		}
		
		this.drawSelf= function(){
			ctx.drawImage(this.spr,this.x,this.y,this.length,this.length);
			this.length+=speed;
			this.x = (canvas.width/2)-this.length/2;
			this.y =  canvas.height/2 -this.length/2;
		};
	}
	
function TL(){
	Shape.call(this);
	this.spr = sprTL;
	this.contacts=[{}];
	this.contacts[0][promptTopLeft]=false;
	}
function TR(){
	Shape.call(this);
	this.spr = sprTR;
	this.contacts=[{}];
	this.contacts[0][promptTopRight] = false;
	}
function BL(){
Shape.call(this);
this.spr = sprBL;
this.contacts=[{}];
this.contacts[0][promptBottomLeft] = false;
}
function BR(){
	Shape.call(this);
	this.spr = sprBR;
	this.contacts=[{}];
	this.contacts[0][promptBottomRight] = false;
	}
	
function TBL(){
	Shape.call(this);
	this.spr = sprTBL;
	this.contacts=[{},{}];
	this.contacts[0][promptTopLeft]=false;
	this.contacts[1][promptBottomLeft] = false;
	}
function TRL(){
	Shape.call(this);
	this.spr = sprTRL;
	this.contacts=[{},{}];
	this.contacts[0][promptTopLeft] = false;
	this.contacts[1][promptTopRight] = false;
	}
function TBR(){
	Shape.call(this);
	this.spr = sprTBR;
	this.contacts=[{},{}];
	this.contacts[0][promptTopRight] = false;
	this.contacts[1][promptBottomRight] = false;
	}
function BRL(){
	Shape.call(this);
	this.spr = sprBRL;
	this.contacts=[{},{}];
	this.contacts[1][promptBottomRight] = false;
	this.contacts[0][promptBottomLeft] = false;
	}

function TLBR(){
	Shape.call(this);
	this.spr = sprTLBR;
	this.contacts=[{},{}];
	this.contacts[0][promptBottomRight] = false;
	this.contacts[1][promptTopLeft] = false;
	}
function TRBL(){
	Shape.call(this);
	this.spr = sprTRBL;
	this.contacts=[{},{}];
	this.contacts[0][promptTopRight] = false;
	this.contacts[1][promptBottomLeft] = false;
	}


const drawUi = function (){
	ctx.beginPath();
	ctx.strokeStyle = uiColor;
	ctx.strokeRect(uiMarginX,uiMarginY,uiLength,uiLength);
	ctx.fillStyle = uiColor;
	ctx.fillRect(uiMarginX-promptLength/2,uiMarginY-promptLength/2,promptLength,promptLength);
	ctx.fillRect(uiMarginX+uiLength-promptLength/2,uiMarginY-promptLength/2,promptLength,promptLength);
	ctx.fillRect(uiMarginX-promptLength+promptLength/2,uiMarginY+uiLength-promptLength/2,promptLength,promptLength);
	ctx.fillRect(uiMarginX+uiLength-promptLength/2,uiMarginY+uiLength-promptLength/2,promptLength,promptLength);
	ctx.closePath();
	
	ctx.beginPath();
	ctx.fillStyle = textColor;
	ctx.font = "30px Arial";
	ctx.fillText(promptTopLeft,uiMarginX-promptLength/2+15,uiMarginY-promptLength/2 +35);
	ctx.fillText(promptTopRight,uiMarginX+uiLength-promptLength/2+10,uiMarginY-promptLength/2+35);
	ctx.fillText(promptBottomLeft,uiMarginX-promptLength+promptLength/2+15,uiMarginY+uiLength-promptLength/2+35);
	ctx.fillText(promptBottomRight,uiMarginX+uiLength-promptLength/2+15,uiMarginY+uiLength-promptLength/2+35);
	
	ctx.fillText(score,10,60);
	
	ctx.closePath();


}

function Bg(){
	this.drawSelf= function(){
			this.width = 800;
			this.height = 600;
			this.speed = 1;
			this.x = 0;
			this.y = 0;
			
			this.drawSelf = function(){
				ctx.drawImage(bgImg,this.x,this.y,this.width,this.height)
				this.width+=this.speed*2;
				this.height+=this.speed*2;
				this.x-=this.speed;
				this.y-=this.speed;
			}
	}
}

bgs=[new Bg()];

function shapeInTolerance(){
	for(shape in shapesDrawing){
		if(shapesDrawing[shape].x<(uiMarginX+toleranceMargin/2)&&shapesDrawing[shape].x>(uiMarginX-toleranceMargin/2)){
				return shapesDrawing[shape];
			}else{return undefined ;}
	}
}

function generateSong(songNotes){
	let song = [];
	for(let a = 1; a<songNotes.length; a++){
		freq = songNotes[a]["tone"];
		
		switch(freq){
			case 293.66:
				song.push(new BRL);
				break;
			case 261.63:
				song.push(new BL);
				break;
			case 233.08:
				song.push(new BR);
				break;
			case 220.00:
				song.push(new TL);
				break;
			case 196.00:
				song.push(new TR);
				break;
			case 349.23:
				song.push(new TRL);
				break;
			case 0:
				song.push(0);
			
			
		}
	}
	return song;
}

shapes.push(...generateSong(mellTrack));


let shapesDrawing = [];
let currentShape;
let prevShape= undefined;

let currentFrame = 0;

let currentBeat = 0;
let nextBeatFrame = 0;

let currentBass = 0;
let nextBassFrame = 0;

let currentMell = 0;
let nextMellFrame = 0;



const draw = function(){
		if(currentFrame==nextBeatFrame && beatTrack.length > currentBeat){
			let stuff = readTrack(beatTrack, currentBeat);
			nextBeatFrame = currentFrame + stuff[1];
			getBeat();
			currentBeat++;
		}
		
		if(currentFrame==nextBassFrame && bassTrack.length > currentBass){
			let stuff = readTrack(bassTrack, currentBass);
			nextBassFrame = currentFrame + stuff[1];
			getBass(...stuff,-2);
			
			currentBass++;
			
		}
	
		if(currentFrame==nextMellFrame && mellTrack.length > currentMell){
			let stuff = readTrack(mellTrack, currentMell);
			nextMellFrame = currentFrame + stuff[1];
			getMell(...stuff,0);
			
			currentMell++;
			
		}
		
	currentShape = shapeInTolerance();
	
	if(prevShape!=currentShape){
		if(typeof currentShape == "undefined"){
			prevShape.resolve();
		}
		
	}
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	
		
		
	if(shapesDrawing.length > 7){shapesDrawing.splice(4,shapesDrawing.length);console.log("removing")}
		
	
	
	if(shapes.length!=0 && currentFrame==nextMellFrame-timeToUi){		
		shapesDrawing.unshift(shapes.shift());
		}
		
	
	//if(currentFrame%1000==0){bgs[0].speed *=(bgs[0].speed+1)}
	//bgs[0].drawSelf();
	
	for(shape in shapesDrawing){
		if(shapesDrawing[shape]!= 0 && shapesDrawing.length != 0){
		shapesDrawing[shape].drawSelf();
		}
	}
	drawUi();
	prevShape = currentShape;
	
	currentFrame++;
}

document.addEventListener("keydown",KeyDownHandler,false);
//document.addEventListener("keyup",KeyUpHandler,false);

function KeyDownHandler(e){
	if(currentShape!=null){
		currentShape.check(e.key);
		}
}


document.getElementById("start").addEventListener("click",function(){setInterval(draw,10);});
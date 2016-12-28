// create player
var elements = '\
  <audio id="bit"><source src="bit.mp3" type="audio/mpeg"></audio> \
  <audio id="bit-2"><source src="bit.mp3" type="audio/mpeg"></audio> \
  <button id="play" class="bt-metronome" type="button" name="button" onclick="playBit()">play</button> \
  <button id="stop" class="bt-metronome" type="button" name="button" onclick="stopBit()" style="display:none;">stop</button> \
  <input id="metronome-value" type="range" min="40" max="220" value="60" oninput="showValue(this.value)" /> \
  <span id="timer"><input type="number" id="set-timer" value=""> bpm</span> \
'
document.getElementById('metronomejs').innerHTML = elements;

var triggerAudio = false;
var callTime;
var timeBit = document.getElementById('metronome-value');
var timeBitVal = timeBit.value;
var count = 0;
var count2 = 0;
var player = document.getElementById('bit');
var player2 = document.getElementById('bit-2');
var playButton = document.getElementById('play')
var stopButton = document.getElementById('stop')

var calc = parseInt(60000 / timeBitVal);

function showValue(newValue){
  document.getElementById('set-timer').value = newValue;
}
showValue(timeBitVal)

document.getElementById('set-timer').onchange = function(){
  var self = this;
  var selfVal = self.value;

  if (selfVal < 40 ) {
    self.value = 40;
  } else if (selfVal > 220) {
    self.value = 220;
  }

  timeBit.value = selfVal;
  // document.getElementById('metronome-value').value = newValue;
  changeNewValue(selfVal)

  // stopBit();
}

timeBit.onchange = function() {
  var self = this;
  var selfVal = self.value;

  changeNewValue(selfVal)
}

function changeNewValue(newValue){
  timeBitVal = document.getElementById('metronome-value').value;

  calc = parseInt(60000 / newValue);

  stopBit();

  // callTime = setInterval(function(){
  //   bitTime()
  // }, calc)
}

function playBit(){
  triggerAudio = true;
  callTime = setInterval(function(){
    bitTime()
  }, calc)

  playButton.style.display = 'none';
  stopButton.style.display = 'inline-block';

}

function stopBit(){
  triggerAudio = false;
  count = 0;
  count2 = 0;

  player.pause();
  player.currentTime = 0;
  player2.pause();
  player2.currentTime = 0;

  clearInterval(callTime)

  playButton.style.display = 'inline-block';
  stopButton.style.display = 'none';

}

function bitTime(){
  count += 1;

  if (count == 5) {
    count = 1;
  }

  if (count == 4) {
    player2.play()
    player.pause();
    player.currentTime = 0;
  } else {
    player.play();
    player2.pause();
    player2.currentTime = 0;
  }

  triggerAudio = true;
}

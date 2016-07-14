// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This ambient module example console.logs
ambient light and sound levels and whenever a
specified light or sound level trigger is met.
*********************************************/

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['A']);

ambient.on('ready', function () {
 // Get points of light and sound data.
 var leds = tessel.led;
  setInterval( function () {
    // ambient.getLightLevel( function(err, lightdata) {
      // if (err) throw err;
      ambient.getSoundLevel( function(err, sounddata) {
        var timeCounter, i;
        if (err) throw err;
        console.log("Sound Level:", sounddata.toFixed(8));
        if (sounddata.toFixed(8) > 0.1) {
          timeCounter = 0;
          for (i = 0; i < leds.length; i++) {
             console.log('First loop i is ', i);
             timeCounter += 100;
             flashLed(i, timeCounter);
          }
          for (i = leds.length - 1; i>=0; i--) {
             console.log('Second loop i is ', i);
             timeCounter += 100;
             flashLed(i, timeCounter);
          }
        }
      });
    // });
  }, 100); // The readings will happen every .5 seconds
});

function flashLed(ledId, timeToStart) {
  timeToStart = timeToStart || 0;
  setTimeout(function () {
    tessel.led[ledId].on()
    setTimeout(function(){
      tessel.led[ledId].off(); //off
    }, 130);
  }, timeToStart)
}

ambient.on('error', function (err) {
  console.log(err);
});

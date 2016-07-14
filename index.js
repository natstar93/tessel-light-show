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
  setInterval( function () {
    // ambient.getLightLevel( function(err, lightdata) {
      // if (err) throw err;
      ambient.getSoundLevel( function(err, sounddata) {
        if (err) throw err;
        console.log("Sound Level:", sounddata.toFixed(8));
        if (sounddata.toFixed(8) > 0.1) {
           flashLed(0, 0);
           flashLed(1, 100);
           flashLed(2, 200);
           flashLed(3, 300);
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

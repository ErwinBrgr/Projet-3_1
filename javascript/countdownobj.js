/*
var counter = 1200000;
var intervalId = null;

function finish() {
  clearInterval(intervalId);
  document.getElementById("bip").innerHTML = "TERMINE!";
};
function bip() {
    counter--;

    if(counter == 0) finish();
    else {

        document.getElementById("bip").innerHTML = counter + "seconds"  //minutes + "m" + seconds +" secondes restantes";
    }

};

function start(){
  intervalId = setInterval(convertir, 1000);
};

function convertir (){
    var minutes = Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((counter % (1000 * 60)) / 1000);
    return minutes + ":" + seconds;

};


*/

document.getElementById('timer').innerHTML =
  20 + ":" + 00;
//startTimer();

function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<0){alert('timer completed')}

  document.getElementById('timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}



/*
       var minutes = Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((counter % (1000 * 60)) / 1000);*/




let light = 'red';
let start = 1;
let runner = 0;
let repeater = null;
let timeReducer = 10000;
let minusTime = 0;
let sing = new Audio( 'audio.mp3' );
let kill = new Audio( 'end.mp3' );
let winSong = new Audio( 'win.mp3' );

// Countdown

let timeLeft = 35;
let elem = document.getElementById( 'timer_div' );
let timerId ;
// = setInterval( countdown, 1000 );

function countdown() {
  if ( timeLeft === -1 ) {
    clearTimeout( timerId );
    clearInterval( repeater );
    $( '#player456' ).stop();
    loseDisplay();
    return;
  } else {
    elem.innerHTML = timeLeft + ' seconds remaining';
    timeLeft--;
  }
}

// timer for changing light

function startRepeater() {
  clearInterval( repeater );
  repeater = setInterval( changeLight, ( ( Math.random() * 1000 ) + 700 ) );
}

function checkRed() {
  clearInterval( repeater );
  repeater = setInterval( checkLight, 500 );
}

function checkLight() {
  if ( light === 'red' && runner === 1 ) {
    clearInterval( repeater );
    $( '#player456' ).stop();
    loseDisplay();
    return;
  } else {
    startRepeater();
  }
}


// Display Losing card
function loseDisplay() {
  $( '#container' ).hide();
  let lost = `<div id="fail-box">
</div>`;
    //Method chaining, the 'lost' variable is created first, which is hidden
    //it is then appended to the body and faded in.
  $( lost ).hide().appendTo( 'body' ).fadeIn( 2000 );
  kill.play();
}

// Display  winning card
function winDisplay() {
  clearInterval( repeater );
  $( '#container' ).hide();
  let win = `<div id="win-box">
       
    </div>`;
  $( win ).hide().appendTo( 'body' ).fadeIn( 2000 );
  winSong.play();
  clearInterval( timerId );
}


function changeLight() {
  if ( light === 'red' ) {
    light = 'green';
    $( '#lightCenter' ).removeClass( 'red' );
    $( '#lightCenter' ).addClass( 'green' );
    $( '#killerRobot' ).removeClass( 'Looking' );
    $( '#killerRobot' ).addClass( 'notLooking' );
    sing.play();
  } else {
    light = 'red';
    $( '#lightCenter' ).removeClass( 'green' );
    $( '#lightCenter' ).addClass( 'red' );
    $( '#killerRobot' ).removeClass( 'notLooking' );
    $( '#killerRobot' ).addClass( 'Looking' );
    sing.pause();
    checkRed();
  }
}



const waitingEle = $( '#waiting' );
let timer = 5;
$( '#Game-Icons' ).hide();



const timeOut = setInterval( () => {
  waitingEle.text( timer );
  waitingEle.css( {
    'text-indent': '40px',
    'font-size':'32px'
 
  } );
  timer--;
  if ( timer===0 )waitingEle.text( 'Go!' );
  if ( timer === -1 ) {

    clearInterval( timeOut );
    setTimeout( () => {
      $( '.waiting-container' ).hide();
    }, 0 );
    $( '#Game-Icons' ).show();


    timerId = setInterval( countdown, 1000 );

  }

}, 1000 );




function moveAndStop() {

  // when move button is clicked
  $( '#moveButton' ).click( function () {
    if ( start === 1 ) {
      $( '#lightCenter' ).removeClass( 'red' );
      $( '#lightCenter' ).addClass( 'green' );
      light = 'green';
      start = 0;
      sing.play();
    }
    $( '#player456' ).animate( {
      left: 1000
    }, timeReducer, 'linear', winDisplay );
    runner = 1;
    startRepeater();
    checkLight;
  } );


  //when stop button is clicked
  $( '#stopButton' ).click( function () {
    $( '#player456' ).stop();
    //gets the position of the user
    minusTime = Math.floor( $( '#player456' ).position().left );

    timeReducer = ( ( 1100 - minusTime ) / 1100 ) * 10000;
    runner = 0;
  } );

}

moveAndStop();

var audio = document.getElementById('audio');

var allMusic, totalMusicCount = 0,
  currentlyPlayingMusic = -1;

var pauseFlag = 0,
  playFlag = 0;

// Event Listeners.........................

audio.addEventListener('ended', nextMusic);

// Controls.........................

function nextMusic() {
  if (parseInt(currentlyPlayingMusic) + 1 == totalMusicCount) {
    //No song available
    alert("Add more song please!");
    return;
  }
  changeMusicAt(parseInt(currentlyPlayingMusic) + 1);
}

function prevMusic() {
  if (parseInt(currentlyPlayingMusic) == 0) {
    //Can't go previous
    alert("Can't go previous!");
    return;
  }
  changeMusicAt(parseInt(currentlyPlayingMusic) - 1);
}

function pauseMusic() {
  if (isPlaying(audio)) {
    if (playFlag == 1 && pauseFlag == 0)
      toggleClassUsingClass('play', 'clicked');
    playFlag = 0;
    pauseFlag = 1;
    toggleClassUsingClass('pause', 'clicked');
    audio.pause();
  }
}

function playMusic() {
  if (!isPlaying(audio)) {
    if (playFlag == 0 && pauseFlag == 1)
      toggleClassUsingClass('pause', 'clicked');
    playFlag = 1;
    pauseFlag = 0;
    toggleClassUsingClass('play', 'clicked');
    audio.play();
  }
}

// Controls end!..................

function hoverEffect() {
  //toggleClassUsingID("toggleEffect", "up");
}

function afterHoverEffect() {
  //toggleClassUsingID("toggleEffect", "up");
}

function toggleClassUsingClass(Class1, Class2) {
  var element = document.getElementsByClassName(Class1);
  element[0].classList.toggle(Class2);
}

function toggleClassUsingID(ID, Class) {
  var element = document.getElementById(ID);
  element.classList.toggle(Class);
}

function isPlaying(audelem) {
  return !audelem.paused;
}


/* Upload music................... */

let dropArea = document.getElementById('drop-area');;
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
};
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
})

;
['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
  dropArea.classList.add('highlight')
}

function unhighlight(e) {
  dropArea.classList.remove('highlight')
}
dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
  let dt = e.dataTransfer;
  let files = dt.files;

  handleFiles(files);
}

function handleFiles(files) {
  files = [...files];
  files.forEach(addToList);
}


function addToList(file) {
  var file_name = file.name.substring(0, file.name.length - 4);

  var list = document.createElement('li');
  var p = document.createElement('p');
  var musicURL = document.createElement('p');
  p.setAttribute('class', 'musicList-p');
  p.setAttribute('id', totalMusicCount);
  totalMusicCount++;
  p.innerHTML = file_name;
  p.setAttribute('onclick', 'changeMusic(this.parentElement)');
  list.appendChild(p);
  list.setAttribute('class', 'musicList-li');
  //console.log(list);
  document.getElementById('playlist').appendChild(list);
  //store url of music
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    musicURL.innerHTML = reader.result;
    musicURL.setAttribute('class', 'musicURLData');
    list.appendChild(musicURL);
  }
}


/* Upload music end................... */

// Changing music..........................

function changeMusic(data) {

  var x = document.getElementById('audio');
  changeSongName(data.childNodes[0].innerHTML);
  x.src = data.childNodes[1].innerHTML;
  x.load();
  x.play();
  if (currentlyPlayingMusic != -1)
    selectedMusicChange(parseInt(currentlyPlayingMusic)); // unselect present
  currentlyPlayingMusic = data.childNodes[0].getAttribute('id');
  selectedMusicChange(parseInt(currentlyPlayingMusic)); // select present

  console.log("Currently playing: " + currentlyPlayingMusic);
}

function changeMusicAt(index) {
  index = parseInt(index);
  var temp = document.getElementById('playlist').getElementsByTagName("li");
  var data = temp[index];
  var x = document.getElementById('audio');

  changeSongName(data.childNodes[0].innerHTML);
  x.src = data.childNodes[1].innerHTML;
  x.load();
  x.play();
  if (currentlyPlayingMusic != -1)
    selectedMusicChange(parseInt(currentlyPlayingMusic)); // unselect present
  currentlyPlayingMusic = data.childNodes[0].getAttribute('id');
  selectedMusicChange(parseInt(currentlyPlayingMusic)); // select present

  console.log("Currently playing: " + currentlyPlayingMusic);
}

// Changing music end!!...............

// UI

function selectedMusicChange(index) {
  index = parseInt(index);
  var element = document.getElementById(index);
  element.classList.toggle('musicListSelected-p');
}

function changeSongName(name){
  if(name.length>=25){
    name = name.substring(0, 21);
    name=name+"...";
  }
  document.getElementById('song-name-id').innerHTML = name;
}

/*
//like & shuffle button
$('.heart').click(function(){
  $(this).toggleClass('clicked');
});

$('.shuffle').click(function(){
  $(this).toggleClass('clicked');
});

//show info box on hover
$('#player').hover(function(){ 
  $('.info').toggleClass('up');
});

//music player settings

let audio = new Audio('http://music.dawnfoxes.com/_fxs_/_upls_/_sngs_/UK/clean_bandit-symphony-ft-zara_larsson.mp3');

$('.pause').hide(); //hide pause button until clicked

//play button
$('.play').click(function(){
  audio.play();
  $('.play').hide();
  $('.pause').show();
});

//pause button
$('.pause').click(function(){
  audio.pause();
  $('.play').show();
  $('.pause').hide();
});
*/
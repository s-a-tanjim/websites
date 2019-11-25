var audio = document.getElementById('audio');
document.getElementById('pause-button-id').style.display = 'none';

var allMusic, totalMusicCount = 0,
  currentlyPlayingMusic = -1;

// Event Listeners.........................

audio.addEventListener('ended', nextMusic);

audio.addEventListener('pause', e => {
  document.getElementById('pause-button-id').style.display = 'none';
  document.getElementById('play-button-id').style.display = 'block';
});

audio.addEventListener('play', e => {
  document.getElementById('pause-button-id').style.display = 'block';
  document.getElementById('play-button-id').style.display = 'none';
});


// Controls.........................

function nextMusic() {
  if (parseInt(currentlyPlayingMusic) + 1 == totalMusicCount) {
    //No song available
    pauseMusic();
    alert("Add more song please!");
    return;
  }
  changeMusicAt(parseInt(currentlyPlayingMusic) + 1);
}

function prevMusic() {
  if (parseInt(currentlyPlayingMusic) == 0 || parseInt(currentlyPlayingMusic) == -1) {
    //Can't go previous
    alert("Can't go previous!");
    return;
  }
  changeMusicAt(parseInt(currentlyPlayingMusic) - 1);
}

function pauseMusic() {
  if (isPlaying(audio)) {
    audio.pause();
  }
}

function playMusic() {

  if (audio.currentSrc.length == 0) {
    alert('Please upload Music!');
    return;
  }

  if (!isPlaying(audio)) {
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
    if (currentlyPlayingMusic == -1)
    changeMusicAt(0);
    console.log('called with count: '+currentlyPlayingMusic);
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

function changeSongName(name) {
  if (name.length >= 25) {
    name = name.substring(0, 21);
    name = name + "...";
  }
  document.getElementById('song-name-id').innerHTML = name;
}

function displayNoneAll(){
  var x;
  x= document.getElementsByClassName('playMusicArea');
  x[0].style.display='none';
  x=document.getElementsByClassName('uploadMusicArea');
  x[0].style.display='none';
  x=document.getElementsByClassName('playlistArea');
  x[0].style.display='none';
  x=document.getElementsByClassName('settingsArea');
  x[0].style.display='none';
}

function showPlayMusic(){
  displayNoneAll();
  var x= document.getElementsByClassName('playMusicArea');
  x[0].style.display='block';
}

function showUploadMusic(){
  displayNoneAll();
  var x= document.getElementsByClassName('uploadMusicArea');
  x[0].style.display='block';
}

function showPlayList(){
  displayNoneAll();
  var x= document.getElementsByClassName('playlistArea');
  x[0].style.display='block';
}

function showSettings(){
  displayNoneAll();
  var x= document.getElementsByClassName('settingsArea');
  x[0].style.display='block';
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
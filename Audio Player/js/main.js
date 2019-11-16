var audio = document.getElementById('audio');

var pauseFlag = 0,
  playFlag = 0;

function nextMusic() {
  console.log('next');
}

function prevMusic() {
  console.log('prev');
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

function hoverEffect() {
  toggleClassUsingID("toggleEffect", "up");
}

function afterHoverEffect() {
  toggleClassUsingID("toggleEffect", "up");
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


/* Upload music */

let dropArea = document.getElementById('drop-area');
    ;
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
      let dt = e.dataTransfer
      let files = dt.files

      handleFiles(files)
    }

    function handleFiles(files) {
      files = [...files]
      files.forEach(previewFile)
    }


    function previewFile(file) {
      var file_name = file.name.substring(0, file.name.length - 4);
      
      document.getElementById('song-name-id').innerHTML = file_name;
     
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        //let audioFile = document.createElement('audio');
        //audioFile.src = reader.result;
        //audioFile.controls=true;
        //console.log(audioFile);
        //document.getElementById('playlistWithPlayer').appendChild(audioFile);
        
        //List create

        var list=document.createElement('li');
        var a=document.createElement('a');
        a.setAttribute('href',reader.result);
        a.setAttribute('class','musicList-a');
        a.innerHTML=file_name;
        a.setAttribute('onclick','changeMusic(this)');
        list.appendChild(a);
        list.setAttribute('class','musicList-li');
        console.log(list);
        document.getElementById('playlist').appendChild(list);
      }
    }

    function changeMusic(data){
      var x=document.getElementById('audio');
      console.log('change');
      console.log(data.innerHTML);
      document.getElementById('song-name-id').innerHTML = data.innerHTML;
      x.src=data.getAttribute('href');
      x.load();
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
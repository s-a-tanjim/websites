//Register a service Worker
if('serviceWorker' in navigator){  //If SW is supported in browser
  navigator.serviceWorker.register('/serviceWorker.js').then(
    function(){
      console.log('sw registered!');
    }
  ).catch(function(err){
    console.log(err);
  });
}
/*
//install app banner
var deferredPrompt;
window.addEventListener('beforeinstallprompt',function(event){
  console.log('Before install prompt fired');
  event.preventDefault();
  deferredPrompt=event;
  return false;

});

function startServiceWorler(){ //To make install app
  console.log('clicked!');
  if(deferredPrompt){
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult){
      console.log(choiceResult.outcome);
      if(choiceResult.outcome==='dismissed'){
        console.log('User cancelled installation');
      }else{
        console.log('User added to home screen');
      }
    });
    deferredPrompt=null;
  }
}
*/

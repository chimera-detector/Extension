'use strict';

function clickbait_action(e) {
  console.log(e);
  chrome.tabs.executeScript(null,
      {code:"var elems = document.getElementsByName('cname'); if(elems) {for(var i = 0;i < elems.length;i++) {elems[i].style.display='none';}}"});

  window.close();
}

function stance_action(e) {
  chrome.tabs.executeScript(null,
      {code:"var elems = document.getElementsByName('sname'); if(elems) {for(var i = 0;i < elems.length;i++) {elems[i].style.display='none';}}"});

  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var inputs = document.querySelectorAll('input');

  inputs[0].addEventListener('input', clickbait_action);
  inputs[1].addEventListener('input', stance_action);
});

// const downloadButton = document.getElementsByClassName('activation-button')[0];
// const quitButton = document.getElementsByClassName('deactivation-button')[0];
// const toggleEngine = document.getElementsByClassName('switch')[0];
// const errorMessage = document.getElementsByClassName('error-message')[0];

// languageSelect.addEventListener('change', function (event) {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {data: event.target.value}, function(response) {});
//   });
// });
//
// startButton.addEventListener('click', function () {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {data: "start"}, function(response) {});
//   });
// });
//
// stopButton.addEventListener('click', function () {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {data: "stop"}, function(response) {});
//   });
// });
//
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.error){
//     errorMessage.textContent = request.error
//   }
// });

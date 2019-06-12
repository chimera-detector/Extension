'use strict';

function clickbait_action(e) {
  // To set input switch value into storage
  chrome.storage.local.set({'switch': e.target.checked});

  if (e.target.checked) {
    chrome.tabs.executeScript(null,
        {code:"var elems = document.getElementsByName('cname'); if(elems) {for(var i = 0;i < elems.length;i++) {elems[i].style.display='inline-block';}}"});
  } else {
    chrome.tabs.executeScript(null,
        {code:"var elems = document.getElementsByName('cname'); if(elems) {for(var i = 0;i < elems.length;i++) {elems[i].style.display='none';}}"});
  }

  // window.close();
}

function stance_action(e) {
  if (e.target.checked) {
    chrome.tabs.executeScript(null,
        {code:"var elems = document.getElementsByName('sname'); if(elems) {for(var i = 0;i < elems.length;i++) {elems[i].style.display='inline-block';}}"});
  } else {
    chrome.tabs.executeScript(null,
        {code:"var elems = document.getElementsByName('sname'); if(elems) {for(var i = 0;i < elems.length;i++) {elems[i].style.display='none';}}"});
  }

  window.close();
}

document.addEventListener('DOMContentLoaded', function () {
  var inputs = document.querySelectorAll('input');

  inputs[0].addEventListener('click', clickbait_action);
  inputs[1].addEventListener('click', stance_action);

  // To get input switch value from storage
  chrome.storage.local.get('switch', function(data) {
    console.log(inputs[0].checked);
    inputs[0].checked = data.switch;
    console.log(inputs[0].checked);
    console.log("===============");
    // logs out "Object {testKey: "Test Value"}"
  })
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

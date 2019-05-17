var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-73159092-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script')
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

// below function focusing on external of article (multiple articles at one document)
const cnn_clickbait = function (node) {

  const articles = [...node.getElementsByClassName('cd__headline-text')];

  articles.forEach(function (el) {
    var headline = el.innerHTML;
    var request = new XMLHttpRequest();
    request.onreadystatechage = function () {
      if (request.onreadystatechange === 4) {
        if (request.status === 200) {
          var data = JSON.parse(request.responseText);
          var clickbait = data.clickbaitiness;
          if (clickbait < 60) {
            let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#2ecc71;color:#fff;border-radius:5px'>👍 Not Clickbait</ul>";
            el.insertAdjacentHTML('afterend', html);
          } else if (clickbait > 90) {
            let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#F27935;color:#fff;border-radius:5px'>💁 This is Clickbait</ul>";
            el.insertAdjacentHTML('afterend', html);
          } else {
            let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#e67e22;color:#fff;border-radius:5px'>👻 " + clickbait + "% clickbait</ul>";
            el.insertAdjacentHTML('afterend', html);
          }
        }
      }
    };

    request.open("GET", "https://127.0.0.1:3000/detect?headline=" + headline, true);
    request.send();
  });

};

const observer = new MutationObserver(function (mutations)) {
  mutations.forEach(function (mutation) {
    mutation.addedNodes.forEach(function (node) {
      if (node.nodeType === 1) {
        cnn_clickbait(node);
      }
    });
  });
});

const config = {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true
};

observer.observe(document.body, config);

cnn_clickbait(document.body);

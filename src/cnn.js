var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-73159092-1']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();

const cnn_inspection = function (node) {

    const ext_headlines = [...node.getElementsByClassName('cd__headline-text')];
    const inner_headlines = [...node.getElementsByClassName('pg-headline')];

    if (inner_headlines.length === 1) {

      // recognize where the user located outside or inside of article.
      const inner_headlines = [...node.getElementsByClassName('pg-headline')];
      let url = window.location.href; // store current location

      inner_headlines.forEach(function (el) {
          var stance_req = new XMLHttpRequest();
          stance_req.onreadystatechange = function () {
              if (stance_req.readyState === 4 && stance_req.status === 200) {
                  if (stance_req.responseText !== "") {
                      var data = JSON.parse(stance_req.responseText);
                      var stance = data.stance;
                      if (stance === "agree") {
                          let html = "<span style='position:absolute;top:60px;right:20px;padding:5px;font-size:12px;line-height:1.8;background-color:#2ecc71;color:#fff;border-radius:5px'>📗 Agree</span>";
                          el.insertAdjacentHTML('afterend', html);
                      } else if (stance === "disagree") {
                          let html = "<span style='position:absolute;top:60px;right:20px;padding:5px;font-size:12px;line-height:1.8;background-color:#F27935;color:#fff;border-radius:5px'>📘 Disagree</span>";
                          el.insertAdjacentHTML('afterend', html);
                      } else if (stance === "discuss") {
                          let html = "<span style='position:absolute;top:60px;right:20px;padding:5px;font-size:12px;line-height:1.8;background-color:#F27935;color:#fff;border-radius:5px'>📙 Discuss</span>";
                          el.insertAdjacentHTML('afterend', html);
                      } else {
                          let html = "<span style='position:absolute;top:60px;right:20px;padding:5px;font-size:12px;line-height:1.8;background-color:#F27935;color:#fff;border-radius:5px'>📕 Unrelated</span>";
                          el.insertAdjacentHTML('afterend', html);
                      }
                  } else {
                    console.log("Response has empty string");
                  }

              }
          };

          // console.log(headline);
          stance_req.open("GET", "https://127.0.0.1:3000/predict?URL=" + url, true);
          stance_req.send(null);
      });

    } else {

      ext_headlines.forEach(function (el) {

          var headline = el.innerText;
          var clickbait_req = new XMLHttpRequest();
          clickbait_req.onreadystatechange = function () {
              if (clickbait_req.readyState === 4 && clickbait_req.status === 200) {
                  if (clickbait_req.responseText !== "") {
                      var data = JSON.parse(clickbait_req.responseText);
                      var clickbait = data.clickbaitiness;
                      if (clickbait < 60) {
                          let html = "<span style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#2ecc71;color:#fff;border-radius:5px'>👍 " + clickbait + "% clickbait</span>";
                          el.insertAdjacentHTML('afterend', html);
                      } else if (clickbait > 90) {
                          let html = "<span style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#F27935;color:#fff;border-radius:5px'>💁 " + clickbait + "% clickbait</span>";
                          el.insertAdjacentHTML('afterend', html);
                      } else {
                          let html = "<span style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#F27935;color:#fff;border-radius:5px'>👻 " + clickbait + "% clickbait</span>";
                          el.insertAdjacentHTML('afterend', html);
                      }
                  } else {
                    console.log("Response has empty string");
                  }

              }
          };

          // console.log(headline);
          clickbait_req.open("GET", "https://127.0.0.1:3000/detect?headline=" + headline, true);
          clickbait_req.send(null);
      });

    }

};

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) { // ELEMENT_NODE
                cnn_inspection(node);
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

cnn_inspection(document.body);

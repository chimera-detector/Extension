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

    if (ext_headlines.length > 0) {
        ext_headlines.forEach(function (el) {
            var headline = el.innerText;
            var clickbait_req = new XMLHttpRequest();
            clickbait_req.onreadystatechange = function () {
                if (clickbait_req.readyState === 4 && clickbait_req.status === 200) {
                    if (clickbait_req.responseText !== "") {
                        var data = JSON.parse(clickbait_req.responseText);
                        var clickbait = data.clickbaitiness;
                        if (clickbait < 60) {
                            // let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#2ecc71;color:#fff;border-radius:5px'>👍 Not Clickbait</ul>";
                            // el.insertAdjacentHTML('afterend', html);
                            console.log("Below 60%");
                        } else if (clickbait > 90) {
                            // let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#F27935;color:#fff;border-radius:5px'>💁 This is Clickbait</ul>";
                            // el.insertAdjacentHTML('afterend', html);
                            console.log("Above 90%");
                        } else {
                            // let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#e67e22;color:#fff;border-radius:5px'>👻 " + clickbait + "% clickbait</ul>";
                            // el.insertAdjacentHTML('afterend', html);
                            console.log("ehh...Dealing");
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
    } else {
        // recognize where the user located outside or inside of article.
        const inner_headlines = [...node.getElementsByClassName('pg-headline')];

        inner_headlines.forEach(function (el) {
            var url = window.location.href; // store current location
            var stance_req = new XMLHttpRequest();
            stance_req.onreadystatechange = function () {
                if (stance_req.readyState === 4 && stance_req.status === 200) {
                    if (stance_req.responseText !== "") {
                        var data = JSON.parse(stance_req.responseText);
                        var stance = data.stance;
                        if (stance === "agree") {
                            // let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#2ecc71;color:#fff;border-radius:5px'>👍 Not Clickbait</ul>";
                            // el.insertAdjacentHTML('afterend', html);
                            console.log("agree");
                        } else if (stance === "disagree") {
                            // let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#F27935;color:#fff;border-radius:5px'>💁 This is Clickbait</ul>";
                              // el.insertAdjacentHTML('afterend', html);
                            console.log("disagree");
                        } else if (stance === "discuss") {
                            // let html = "<ul style='position:absolute;top:30px;right:10px;padding:5px;font-size:12px;line-height:1.8;background-color:#e67e22;color:#fff;border-radius:5px'>👻 " + clickbait + "% clickbait</ul>";
                            // el.insertAdjacentHTML('afterend', html);
                            console.log("discuss");
                        } else {
                            console.log("unrelated");
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

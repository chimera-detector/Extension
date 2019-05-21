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

const cnn_clickbait = function (node) {

    const headlines = [...node.getElementsByClassName('cd__headline-text')];

    headlines.forEach(function (el) {
        var headline = el.innerText;
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                if (request.responseText !== "") {
                    var data = JSON.parse(request.responseText);
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
        request.open("GET", "https://127.0.0.1:3000/detect?headline=" + headline, true);
        request.send(null);
    });

};

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
            if (node.nodeType === 1) { // ELEMENT_NODE
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

# CHIMERA Stance Detector (Extension)

![CHIMERA_ICON](https://image.flaticon.com/icons/png/128/571/571122.png)

## Overview

### CHIMERA Stance Detector  have following objectives

- Easy to recognize the **Fake News and Clickbaits**  in real world.
- Support strong prediction engine to recognize whether the article is Fake News or not.
- Let people know that we have to protect ourselves from the fake information from the internet such as Fake News.
- (In the business wise) Let company know how their website that has many of featured article headlines is clean or not by the hazard of Fake News or Clickbaits.

### CHIMERA Stance Detector Components

CHIMERA Stance Detector exists as major 2 different part, which means the one is server that  can process the request from the user interface directly using embedded ***Artificial Neural Network*** the other one is the user interface as i mentioned right before that supposed to launched as ***Browser Extension*** program such as chrome extension. The user interface will help people to recognize Fake News or Clickbaits more easily than the detection engine itself.
And we have subComponents below those two major component. A explanation of those will be attached soon.

### Specifications & Installation

As I mentioned previous section, CHIMERA Stance Detector has been built upon the existing artificial neural network model. So, we should run the server prior to process the request from the Browser Extension.

[here] is the instruction that can run the server locally.

In order to make request from the Browser Extension we have upload our extension package into the browser.

In this chapter we try to upload our extension package into chrome webstore.

1. Go to `chrome://extensions/` by typing it onto the URL bar
2. Switch your role from the typical user to developer
3. then, you can see the button is being enabled. called `load unpacked`
4. Click that button and navigate the extension project folder within it.
5. Ok, Done.

## How to use?

* The Browser Extension has limitations in user wise, basically they automatically crawl all the articles from the [cnn webiste] which means outside and inside both. (extension can recognize differences between those 2) and they call the HTTPS request to the server in order to get the response.
* If the user located **inside of the article**, they do request ***prediction of stance beyond the headline***
* Otherwise, the user located **outside of the article**, they do request ***detection of clickbaitiness of the headline***

### Referenced Project & Related Works

we referenced many related & previous works for this problem to build customer service using those suggested techniques. we proudly suggest what we referenced for this project

- [Cisco - SWEN IN THE SOLAT] : https://blog.talosintelligence.com/2017/06/talos-fake-news-challenge.html
- [Athene Systems] : https://arxiv.org/pdf/1806.05180.pdf
- [University of London Machine Reading Group] : https://arxiv.org/pdf/1707.03264.pdf

[cnn website]: https://edition.cnn.com

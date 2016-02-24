/*
 * Ad loader, stage 1
 */

(function() {

var iframe_id = "rbvideo_" + ord,
    width = 640,
    height = 360,
    fraction = 0.5,
    tpl = '<iframe id="' + iframe_id + '" frameborder="0" width="' + width + '" height="' + height + '"></iframe>',
    loaded = false,
    state = "";

document.write(tpl);

var frame = document.querySelectorAll("#" + iframe_id)[0];

/*
 * Messages from iframe processed here
 */

window[iframe_id] = function(ev) {
    console.log("From child: " + ev);
    if (ev === "loaded") {
        loaded = true;
    } else if (ev === "end") {
        frame.parentNode.removeChild(frame); 
        loaded = false;
    } else {
        state = ev;
    }
};

function send_iframe_cmd(cmd) {
    if (!loaded) {
        console.log("IFrame not yet loaded: " + cmd);
        return;
    }
    frame.contentWindow.parent_cmd(cmd);
}

/*
 * TODO: Appropriate domain for our jqueries
 */

var tpl2 = '<!DOCTYPE html>' +
    '<html>' +
    '<head>' +
    '<style> .simple { margin:0; padding:0, overflow:hidden; } </style>' +
    '<scr' + 'ipt src="//content.jwplatform.com/libraries/XeGdlzmk.js"></scr'+'ipt>'+
    '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,600italic,400italic" rel="stylesheet" type="text/css">'+
    '<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">' +
    '<link href="//desk-customers.s3.amazonaws.com/jwplayer/css/main.css" rel="stylesheet">' +
    '</head>' +
    '<body class="simple">' +
    '<scr' + 'ipt type="text/javascript">' +
    'var parent_cb = window.parent["' + iframe_id + '"];' +
    'document.addEventListener("DOMContentLoaded", function() { parent_cb("loaded"); });' +
    '</scr' + 'ipt>' +
    '<div id="video-container" style="position:absolute;top:0px;left:0px;z-index:1;background-color:black" onmouseover="unmute()" onmouseout="mute()">' +
    '</div>' +
    '<scr' + 'ipt type="text/javascript" src="//code.jquery.com/jquery-1.12.1.min.js"></scr' + 'ipt>' +
    '<scr' + 'ipt type="text/javascript" src="//monoj-khatua.github.io/video_ad2.js"></scr' + 'ipt>' +
    '</body>' +
    '</html>';

frame.contentWindow.document.open("text/html", "replace");
frame.contentWindow.document.write(tpl2);
frame.contentWindow.document.close();

function checkScroll() {
    var x = frame.offsetLeft, y = frame.offsetTop, w = frame.offsetWidth, h = frame.offsetHeight, r = x + w, //right
    b = y + h, //bottom
    visibleX, visibleY, visible;
    visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
    visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

    visible = visibleX * visibleY / (w * h);

    if (visible > fraction) {
        if (state !== "play") {
            send_iframe_cmd("play");
        }
    } else {
        if (state !== "pause") {
            send_iframe_cmd("pause");
        }
    }
}

document.addEventListener("resize", checkScroll, false);
document.addEventListener('scroll', checkScroll, false);

})();

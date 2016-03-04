/*
 * Ad loader, stage 1
 */

(function() {

var iframe_id = "rbvideo_" + ord,
    width = 640,
    height = 360,
    fraction = 0.5,
    tpl = '<div id="canary_' + iframe_id + '"></div><div style="margin: 0; padding: 0; overflow: hidden; display:none" id="div_' + iframe_id + '"><iframe id="' + iframe_id + '" frameborder="0" width="' + width + '" height="' + height + '"></iframe></div>',
    state = "init",
    $ = undefined;

document.write(tpl);
script_add("//code.jquery.com/jquery-1.12.1.min.js", function(err) {
    if (err) {
        console.log("Ad loader: could not load jquery");
        return;
    }

    $ = window["jQuery"].noConflict(true);
    main();
});

function main() {

    var frame = document.querySelectorAll("#" + iframe_id)[0];

    /*
     * Messages from iframe processed here
     */

    window[iframe_id] = function(ev) {
        console.log("From child: " + ev);
        if (ev === "loaded") {
            state = "loaded";
        } else if (ev === "end") {
            $("#div_" + iframe_id).slideUp(1000, function() {
                $("#div_" + iframe_id).remove();
                state = "init";
            });
        } else if (ev === "error") {
            $("#div_" + iframe_id).remove();
            state = "init";
        }else if(ev === "started"){
            $("#div_" + iframe_id).slideDown(1000, function(){
                state = "started";
                checkScroll();
            });
        }else {
            state = ev;
        }
    };

    function send_iframe_cmd(cmd) {
        if (state === "init" || state === "loaded") {
            console.log("IFrame not yet ready: " + cmd);
            return;
        }
        frame.contentWindow.parent_cmd(cmd);
    }


    /* main visibility API function 
     check if current tab is active or not*/
    var tab_visibility = (function(){
        var stateKey, 
            eventKey, 
            keys = {
                    hidden: "visibilitychange",
                    webkitHidden: "webkitvisibilitychange",
                    mozHidden: "mozvisibilitychange",
                    msHidden: "msvisibilitychange"
        };
        for (stateKey in keys) {
            if (stateKey in document) {
                eventKey = keys[stateKey];
                break;
            }
        }
        return function(c) {
            if (c) document.addEventListener(eventKey, c);
            return !document[stateKey];
        }
    })();
    
    /* check if current tab is active or not*/
    tab_visibility(function(){
        if(tab_visibility()){  
              setTimeout(function(){ 
                send_iframe_cmd("play");
            },300);
        } else {
            send_iframe_cmd("pause");
        }
    });
    
    
    /* check if browser window has focus*/        
    var notIE = (document.documentMode === undefined),
        isChromium = window.chrome;
          
    if (notIE && !isChromium) {
    
        // checks for Firefox and other  NON IE Chrome versions
        $(window).on("focusin", function () { 
            
            setTimeout(function(){      
                send_iframe_cmd("play");
            },300);
        }).on("focusout", function () {
            send_iframe_cmd("pause");
        });
    
    } else {
        // checks for IE and Chromium versions
        if (window.addEventListener) {
            window.addEventListener("focus", function (event) {
                setTimeout(function(){                 
                     send_iframe_cmd("play");
                },300);
            }, false);
    
            window.addEventListener("blur", function (event) {
                send_iframe_cmd("pause");
            }, false);
        } else {
            window.attachEvent("focus", function (event) {
                setTimeout(function(){                 
                     send_iframe_cmd("play");
                },300);
            });
    
            window.attachEvent("blur", function (event) {
                send_iframe_cmd("pause");
            });
        }
    }

    function checkScroll() {
        var off = $("#canary_" + iframe_id).offset(),
            x = off.left, y = off.top, w = width, h = height, r = x + w,
            b = y + h, //bottom
            visibleX, visibleY, visible;

        visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
        visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));

        visible = visibleX * visibleY / (w * h);

        if (visible > fraction) {
            if (state === "loaded") {
                /*$("#div_" + iframe_id).slideDown(1000, function() {
                    state = "ready";
                    send_iframe_cmd("play");
                });*/
                state = "ready";
                send_iframe_cmd("start");

            } else if (state !== "ready" && state !== "play") {
                send_iframe_cmd("play");
            }
        } else if (state === "play") {
            send_iframe_cmd("pause");
        }
    }

    var tpl2 = '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<style> .simple { margin:0; padding:0, overflow:hidden; } </style>' +
        '<scr' + 'ipt src="//content.jwplatform.com/libraries/XeGdlzmk.js"></scr'+'ipt>'+
        '<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,600italic,400italic" rel="stylesheet" type="text/css">'+
        '<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">' +
        '<link href="//desk-customers.s3.amazonaws.com/jwplayer/css/main.css" rel="stylesheet">' +
        '<link href="//monoj-khatua.github.io/custom_skin.css" rel="stylesheet">' +
        '</head>' +
        '<body class="simple">' +
        '<scr' + 'ipt type="text/javascript">' +
        'var parent_cb = window.parent["' + iframe_id + '"];' +
        'document.addEventListener("DOMContentLoaded", function() { parent_cb("loaded"); });' +
        '</scr' + 'ipt>' +
        '<div id="video-container" style="position:absolute;top:0px;left:0px;z-index:1;background-color:black">' +
        '</div>' +
        '<scr' + 'ipt type="text/javascript" src="//code.jquery.com/jquery-1.12.1.min.js"></scr' + 'ipt>' +
        '<scr' + 'ipt type="text/javascript" src="//monoj-khatua.github.io/video_ad2.js?ord='+ord +'"></scr' + 'ipt>' +
        '</body>' +
        '</html>';

    frame.contentWindow.document.open("text/html", "replace");
    frame.contentWindow.document.write(tpl2);
    frame.contentWindow.document.close();

    document.addEventListener("resize", checkScroll, false);
    document.addEventListener('scroll', checkScroll, false);
}

/* Based on JQuery's loader */
function script_add(url, cb) {
    var script,
        head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;

    script = document.createElement("script");
    script.src = url;
    script.onload = script.onreadystatechange = script.onerror = function(e,
        isAbort) {
        isAbort = isAbort || e.type === 'error';
        if (isAbort || !script.readyState ||
            /loaded|complete/.test(script.readyState)) {

            script.onload = script.onreadystatechange = null;
            if (isAbort && head && script.parentNode) {
                head.removeChild(script);
            }
            script = undefined;
            var ret = isAbort ? "Error loading script: " + url : null;
            return cb(ret, null);
        }
    };
    head.insertBefore(script, head.firstChild);
}

})();

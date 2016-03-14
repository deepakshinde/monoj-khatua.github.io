/*
 * 2nd stage. This is where we put in code talking to jwplayer/videojs to
 * implement commands coming from the parent
 */

var state = "";
var rb_vastTag = [];

function parent_cmd(cmd) {
    console.log("From parent: ", cmd);
    if (state === "end") {
        parent_cb("end");
    } else if (cmd === "play") {
        state = "play";
        playerInstance.play(true);
        //simulateEnd();
        parent_cb(cmd);
    } else if (cmd === "pause") {
        state = "pause";
        playerInstance.play(false);
        parent_cb(cmd);
    } else if (cmd === "start") {
        playerInstance.play(true);
    } else {
        console.log("Unknown command from parent");
    }
}

function simulateEnd() {
    setTimeout(function() {
        $("video").slideUp(1000, function() {
            state = "end";
            parent_cb("end");
        });
    }, 30000);
}

//var fallbacks =["http://demo.tremorvideo.com/proddev/vast/vast1RegularLinear.xml"]
//Liverail
//var fallbacks =["http://dspbuilder.rubiconproject.com/vast?cid=56d039ea70726f2631000005&userid=123213&t=imp&oid=55a5e2a370726f07db010000&aid=56d439be70726f0e77000001&bid_id=43434&impid=213123&auctionid=1231231&exchange=rubicon&price=0.023&dc=us-west&ct=0"]
//var fallbacks = ["http://dspbuilder.rubiconproject.com/track?cid=56d039ea70726f2631000005&userid=${USERID}&t=imp&oid=55a5e2a370726f07db010000&aid=55e6f99e70726f705000000b&&rurl=http%3A%2F%2Fs3.amazonaws.com%2Fopenplatform-apps%2F55e6f99e70726f705000000b-%2456d039ea70726f2631000005.xml","//www.adotube.com/php/services/player/OMLService.php?avpid=oRYYzvQ&platform_version=vast20&ad_type=linear&groupbypass=1&HTTP_REFERER=http://www.longtailvideo.com&video_identifier=longtailvideo.com,test"];

rb_vastTag = window.parent._rbVastTag;
console.log(rb_vastTag[0]);
var playerInstance = jwplayer("video-container");
playerInstance.setup({
    //file: "//content.jwplatform.com/videos/bkaovAYt-640.mp4",
    file: "//monoj-khatua.github.io/blank_video.mp4",
    //image: "/customer/portal/attachments/268131",
    width: '100%',
    height: '100%',
    stretching: 'exactfit',
    //controls: false,
    //controlbar: 'none',
    icons: false,
    mute: true,
    //primary: 'flash',
    aspectratio: '16:9',
    skin: {
        name: "custom_skin"
    },
    logo: {
        file: "rubiconproject_circles.png",
        hide: false,
        position: "top-right",
        link: "http://rubiconproject.com"
    },
    advertising: {
    client: "vast",
    tag: rb_vastTag
    }});

playerInstance.setMute(true);


function mute(){
    playerInstance.setMute(true);
}

function unmute(){
    playerInstance.setMute(false);
}

var index = 0;
playerInstance.on("AdError" ,function(event) {
    console.log("AdError");
    console.log(event.message);
    /*var html = log.innerHTML;
    if(index < fallbacks.length) {
        html += event.tag+" was empty, loading fallback tag "+(index+1)+".<br>";
        console.log(html);
        index++;
    } else {
        html += event.tag+" has failed, with no more fallbacks available.<br>";
        console.log(html);
        parent_cb("end");
         }*/
    parent_cb("end");
    });

playerInstance.onAdImpression(function(event) {
    var html ="Success! Ad tag number "+ (index+1) +" is now playing!</br>";
    parent_cb("started");
    playerInstance.play(false);
    console.log(html);
    });
/*
playerInstance.on("adBlock",function(){
    console.log("AdBlocked");
    parent_cb("error");
});
*/
playerInstance.on("complete",function(){
    console.log("Video Compete");
    parent_cb("end");
});

playerInstance.on("setupError",function(){
    console.log("Video setup error");
    parent_cb("error");
});

playerInstance.on("ready",function(){
    console.log("Video ready");
    parent_cb("ready");
});


playerInstance.on("adComplete", function(event){
        console.log("Ad Completed");
        //playerInstance.remove();
        parent_cb('end');
    });

$("body").mouseover(function(){
    unmute();
    console.log("unmute");
});

$("body").mouseout(function(){
    mute();
    console.log("mute");
});


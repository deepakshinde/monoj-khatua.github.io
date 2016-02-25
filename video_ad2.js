/*
 * 2nd stage. This is where we put in code talking to jwplayer/videojs to
 * implement commands coming from the parent
 */

var state = "";

function simulateEnd() {
    setTimeout(function() {
        $("video").slideUp(1000, function() {
            state = "end";
            parent_cb("end");
        });
    }, 30000);
}

var fallbacks = ["http://ad3.liverail.com/?LR_PUBLISHER_ID=1331&LR_CAMPAIGN_ID=229&LR_SCHEMA=vast2","//www.adotube.com/php/services/player/OMLService.php?avpid=oRYYzvQ&platform_version=vast20&ad_type=linear&groupbypass=1&HTTP_REFERER=http://www.longtailvideo.com&video_identifier=longtailvideo.com,test"];

var playerInstance = jwplayer("video-container");

playerInstance.setup({
    file: "//content.jwplatform.com/videos/bkaovAYt-640.mp4",
    image: "/customer/portal/attachments/268131",
    width: '100%',
    height: '100%',
    stretching: 'exactfit',
    //controls: false,
    controlbar: 'none',
    icons: false,
    mute: true,
    aspectratio: '16:9',
    advertising: {
    client: "vast",
    tag: fallbacks
    }});
playerInstance.setMute(true);
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
    } else {
        console.log("Unknown command from parent");
    }
}

function myFunction(){
    playerInstance.play(false);
}

function myFunctionplay(){
    playerInstance.play(true); 
}

function mute(){
    playerInstance.setMute(true);
}

function unmute(){
    playerInstance.setMute(false);
} 

var index = 0;
playerInstance.onAdError(function(event) {
    var html = log.innerHTML;
    if(index < fallbacks.length) {
        html += event.tag+" was empty, loading fallback tag "+(index+1)+".<br>";
        console.log(html);
        index++;
    } else {
        html += event.tag+" has failed, with no more fallbacks available.<br>";
        console.log(html);
         }
    });

playerInstance.onAdImpression(function(event) {
    var html = log.innerHTML;
    html +="Success! Ad tag number "+ (index+1) +" is now playing!</br>";
    console.log(html);
    //log.innerHTML = html;
    });

playerInstance.onAdComplete(function(event){
        console.log("Ad Completed");
        parent_cb('end');
        playerInstance.remove();
    });

$("body").mouseover(function(){
    unmute();
    console.log("unmute");
});


$("body").mouseout(function(){
    mute();
    console.log("mute");
});

(function(){
var rbAdtag = parent.rb_adtag;
console.log("rbAdtag1 = " + parent.rb_adtag);

function setInnerHtml(){
    document.getElementById("ad_container").innerHTML += rbAdtag;
}


document.addEventListener("DOMContentLoaded", function() {
    console.log("Iframe loaded");
    setInnerHtml();
});


$(document).ready(function(){
    console.log("Document Ready");

    $("#ad_choice").click(function(){
        console.log("Click Add choice");
        //checkCookie();
        $("#pref_panel").show();
        createIframe();
    });

    $("#close_btn").click(function(){
        console.log("Click close");
        $("#tmpl1").remove();
        $("#pref_panel").hide();
    });

});


function createIframe(){
    var iframe = document.createElement('iframe');
    // We may need to pass few url  parameters to the src url.
    iframe.src = '//test-rb/tmpl1.html';
    iframe.scrolling ='no';
    iframe.id = "tmpl1";
    document.getElementById("pref_panel").appendChild(iframe);
}
})();


/************
 * Cookie related functions
 */

//var login_url= "http://google.com"; // TODO: set the url of preference center
var login_url= "http://52.39.39.125/users/sign_in"; 


var rbAdtag = parent.rb_adtag;
console.log("rbAdtag1 = " + parent.rb_adtag);
//alert(rbAdtag);

function setInnerHtml()
{
    document.getElementById("ad_container").innerHTML += rbAdtag;
}

function isBrowserCookieEnabled() {
    return (navigator.cookieEnabled)?true:false;
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function checkCookie() {
    // Check for browser cookie support
    if (!isBrowserCookieEnabled()){
        console.log("Browser cookie is disbled");
        return;
    }
    var user = getCookie("userid");
    if (user != "") {
        //TODO: If an existing useri
        console.log("Cookie already present, id: "+ user);

    } else {
        // New user
        //username = prompt("Please enter your name:", "");
        //user = createUser(username);
        user = createUser("");
        if (user != "" && user != null) {
            setCookie("userid", user, 365);
        }
    }
}


function createUser(username){
    //TODO: for now creating a random userid later will do it from server 
    // request the api server to create an id for the user.
    // Get the userid in response.
   function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
      .substring(1);
  }
  return 'rb-' +s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function opennewtab(url )
{
    var win=window.open(url, '_blank');
}

function signinClick(){
    console.log("In Signin click");
    opennewtab(login_url);
}

/*****************
 * AdTag related functions
 */
/*
function createAdTag(originalTag) {

}
*/

document.addEventListener("DOMContentLoaded", function() {
    console.log("Iframe loaded");
});//TODO:check cookie here and prompt accordingly.

$(document).ready(function(){
    console.log("Document Ready");
    
    $("#ad_choice").click(function(){
        console.log("Click Add choice");
        checkCookie();
        $("#pref_panel").show();
    });
    
    $("#close_btn").click(function(){
        console.log("Click close");
        $("#pref_panel").hide();
    });
    
    $("#signin_btn").click(function(){
        signinClick();
    });
});

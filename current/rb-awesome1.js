
/************
 * Cookie related functions
 */

var login_url= "http://52.39.39.125/users/sign_in?id=",
//var login_url= "http://dpkubuntu:4000/users/sign_in?id=",
    id ="";
    uid="";

//var track_tpl = 'http://dpkubuntu:4000/track?ad_id=${AD_ID}&user_id=${USER_ID}&cookie_id=${COOKIE_ID}&t=like&status=${STATUS}&extra=12';
var track_tpl = 'http://52.39.39.125/track?ad_id=${AD_ID}&user_id=${USER_ID}&cookie_id=${COOKIE_ID}&t=like&status=${STATUS}&extra=12';

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
    var date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ date.toUTCString();
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
    if (user !== "") {
        //TODO: If an existing user
        console.log("Cookie already present, id: "+ user);

    } else {
        // New user
        user = createUser("");
        if (user !== "" && user !== null) {
            setCookie("userid", user, 365);
        }
    }
    id = user;
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
    opennewtab(login_url + id);
}


function generateLoginUrl(){
    //loginurl?id=#cookieid
}

function getUserDetails() {
    var url ="http://52.39.39.125/get-preference?id="+id;
    $.get(url, function(data){
        var name = data.user;
        var likes = data.like;
        var dislikes = data.dislike;
        var like_str = " Likes : ";
        var dislike_str = " Dislikes : ";
        if(data.user !==""){
            console.log("User "+ name +" loaded");
        }
        $.each(likes, function(index, value){
            console.log(value);
            like_str += value;
            like_str += ", ";
        });
        
        $.each(dislikes, function(index, value){
            console.log(value);
            dislike_str += value;
            dislike_str += ", ";
        });

        alert("User "+ name +" loaded with preferences "+ like_str + " "+ dislike_str);
    })
    .fail(function() {
       console.log( "User not yet signed in" );
     });
}

/*****************
 * AdTag related functions
 */
/*
function createAdTag(originalTag) {

}
*/

//checkCookie();
//getUserDetails();

/*
 * likeStatus 1 user liked the add.
 *            0 user did not like the add.
 */

function radioSubmit(likeStatus){
    var url = track_tpl;
    url = url.replace("${COOKIE_ID}", id);
    url = url.replace("${USER_ID}", uid);
    url = url.replace("${STATUS}", likeStatus);
    var ad_id = Math.floor(Math.random()*1000);
    url = url.replace("${AD_ID}", ad_id.toString());
    //$.get(url);
    jQuery.get(url);
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("Iframe loaded");
});//TODO:check cookie here and prompt accordingly.


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
    iframe.id = "tmpl1"
    document.getElementById("pref_panel").appendChild(iframe);
}


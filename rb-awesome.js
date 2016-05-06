
(function() {
    var iframe_id =  "if_" +ord;
    width = 835, height=250;
    var tpl =  '<iframe id="' + iframe_id + '" frameborder="0" width="' + width + '" height="' + height + '"></iframe>';
    document.write(tpl);
    //console.log()
    main();

    function main() {
        var frame = document.querySelectorAll("#" + iframe_id)[0];
        var template = '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<style> .simple { margin:0; padding:0, overflow:hidden; } </style>' +
            '<link href="//monoj-khatua.github.io/rb-awesome.css" rel="stylesheet">' +
            '</head>' +
            '<body class="simple">' +
            '<scr' + 'ipt type="text/javascript">' +
            'console.log("Inside iframe");' +
            '</scr' + 'ipt>' +
            '<scr' + 'ipt type="text/javascript" src="//code.jquery.com/jquery-1.12.1.min.js"></scr' + 'ipt>' +
            '<scr' + 'ipt type="text/javascript" src="//monoj-khatua.github.io/rb-awesome1.js?ord='+ord +'"></scr' + 'ipt>' +
    
            '<div id="ad_container" style="position:absolute;top:0px;left:0px;z-index:1;background-color:black;width:795;height:290;">' +
            '</div>' +
            '<div id="ad_choice">' +
            '<img src="//monoj-khatua.github.io/rubiconproject_circles.png" style="width:60px;height:15px"></img>' +
            '</div>' +
            '<div id="pref_panel">' +
                '<div id="pref_header">'+
                    '<span id="close_btn">&#10006;</span>'+
                    '<span class="title">Ad Preference</span>'+
                '</div>'+
                '<div id="pref_body">'+
                    'Is this ad relevent?'+
                    '<span id="rd_btn" style="float:right">'+
                    '<input type="radio" name="pref" onclick="javascript: radioSubmit(1)" value="yes">yes</input>'+
                    '<input type="radio" name="pref" onclick="javascript: radioSubmit(0)" value="no">no</input>'+
                    '</span><br>'+
                ' </div>'+ //pref_body
                '<div id="pref_footer">'+
                    '<button id="signin_btn">Sign In</button>'+
                    '<span>Do you want to manage your Ad Preference?</span>'+
                '</div>'+
            ' </div>'+//pref_panel
            //'</div>' +
            '<scr' + 'ipt type="text/javascript" src="//code.jquery.com/jquery-1.12.1.min.js"></scr' + 'ipt>' +
            '<scr' + 'ipt type="text/javascript">setInnerHtml(); </scr' + 'ipt>' +
            '</body>' +
            '</html>';
        frame.contentWindow.document.open("text/html", "replace");
    frame.contentWindow.document.write(template);
    frame.contentWindow.document.close();
}
})();

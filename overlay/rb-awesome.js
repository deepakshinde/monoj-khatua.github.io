
(function() {
    var iframe_id =  "if_" +ord,
    width = 835, height=250;
    var tpl =  '<iframe id="' + iframe_id + '" frameborder="0" scrolling="no" width="' + width + '" height="' + height + '"></iframe>';
    document.write(tpl);
    //console.log()
    main();

    function main() {
        var frame = document.querySelectorAll("#" + iframe_id)[0];
        var template = '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '<style> .simple { margin:0; padding:0, overflow:hidden; } </style>' +
            '<link href="//monojk-rbweb/rb-awesome.css" rel="stylesheet">' +
            '</head>' +
            '<body class="simple">' +
            '<scr' + 'ipt type="text/javascript">' +
            //'console.log("Inside iframe");' +
            '</scr' + 'ipt>' +
            '<scr' + 'ipt type="text/javascript" src="//code.jquery.com/jquery-1.12.1.min.js"></scr' + 'ipt>' +
            '<scr' + 'ipt type="text/javascript" src="//monojk-rbweb/rb-awesome2.js?ord='+ord +'"></scr' + 'ipt>' +
            '<iframe src="//test-rb/setCookies.html" style="display:none;height:1px;width:1px"></iframe>'+
    
            '<div id="ad_container" style="position:absolute;top:0px;left:0px;z-index:1;background-color:black;width:795;height:290;">' +
            '</div>' +
            '<div id="ad_choice">' +
            '<img src="rubiconproject_circles.png" style="width:60px;height:15px"></img>' +
            '</div>' +
            '<div id="pref_panel">' +
            '<div id="close_btn">&#10006;</div>'+
           //     '<iframe id="tmpl1" src="tmpl1.html" scrolling="no" ></iframe>' +
            ' </div>'+//pref_panel
            //'</div>' +
            '<scr' + 'ipt type="text/javascript" src="//code.jquery.com/jquery-1.12.1.min.js"></scr' + 'ipt>' +
            '</body>' +
            '</html>';
        frame.contentWindow.document.open("text/html", "replace");
        frame.contentWindow.document.write(template);
        frame.contentWindow.document.close();
}
})();

var $original;
var oModal = "";
if (typeof jQuery !== 'undefined') {
    $original = jQuery.noConflict(true);
    $ = $original;
    jQuery = $original;
    if (typeof $.fn.modal === 'function') {
        oModal = $.fn.modal.noConflict(true);
        $.fn.modal = oModal;
        jQuery.fn.modal = oModal;
    }
}
var applozicSideBox = new ApplozicSidebox();
applozicSideBox.load();
function ApplozicSidebox() {
    var googleApiKey = (typeof applozic._globals !== 'undefined' && applozic._globals.googleApiKey)?(applozic._globals.googleApiKey):"AIzaSyDKfWHzu9X7Z2hByeW4RRFJrD9SizOzZt4";
    var mck_script_loader1 = [ {
            "name": "widget", "url": MCK_STATICPATH + "/js/applozic.widget.min.js"
    }, {
            "name": "plugins", "url": MCK_STATICPATH + "/js/applozic.plugins.min.js"
    }, {
            "name": "socket", "url": MCK_STATICPATH + "/js/applozic.socket.min.js"
    },
    // { "name": "maps", "url": "https://maps.google.com/maps/api/js?key="+googleApiKey+"&libraries=places"},
    {
            "name": "emojis", "url": MCK_STATICPATH + "/js/applozic.emojis.min.js"
    }, {
            "name": "mck-common", "url": MCK_STATICPATH + "/js/app/applozic.common.js"
    },{
           "name": "aes", "url": MCK_STATICPATH + "/js/applozic.aes.js"
    } ];
    var mck_script_loader2 = [ {
            "name": "locationpicker", "url": MCK_STATICPATH + "/js/locationpicker.jquery.min.js"
    } ];
   var mck_videocall = [ {
            "name": "video_howler", "url": "https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.2/howler.min.js"

    },{
        "name": "video_videocall", "url": MCK_STATICPATH + "js/app/call/videocall.js"

    }, {
          "name": "video_twilio", "url": MCK_STATICPATH + "/js/app/call/twilio-video.js"
    }, {
           "name": "video_ringtone", "url": MCK_STATICPATH + "/js/app/call/mck-ringtone-service.js"

    } ];
    this.load = function() {
        try {
            mckinitPlugin();
            // var head = document.getElementsByTagName('head')[0];
            // var script = document.createElement('script');
            // script.type = 'text/javascript';
            // script.src = MCK_STATICPATH + "/js/jquery.min.js";
            // if (script.readyState) { // IE
            //     script.onreadystatechange = function() {
            //         if (script.readyState === "loaded" || script.readyState === "complete") {
            //             script.onreadystatechange = null;
            //             mckinitPlugin();
            //         }
            //     };
            // } else { // Others
            //     script.onload = function() {
            //         mckinitPlugin();
            //     };
            // }
            // head.appendChild(script);
        } catch (e) {
            console.log("Plugin loading error. Refresh page.");
            if (typeof MCK_ONINIT === 'function') {
                MCK_ONINIT("error");
            }
            return false;
        }
    };
    function mckinitPlugin() {
        if (!$original && typeof jQuery !== 'undefined') {
            $original = jQuery.noConflict(true);
            $ = $original;
            jQuery = $original;
            if (typeof $.fn.modal === 'function') {
                oModal = $.fn.modal.noConflict(true);
                $.fn.modal = oModal;
                jQuery.fn.modal = oModal;
            }
        }
        try {
            mckInitPluginScript();
        } catch (e) {
            console.log("Plugin loading error. Refresh page.");
            if (typeof MCK_ONINIT === 'function') {
                MCK_ONINIT("error");
            }
            return false;
        }
    }
    function mckLoadScript(url, callback) {
        try {
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            if (callback) {
                if (script.readyState) { // IE
                    script.onreadystatechange = function() {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                    };
                } else { // Others
                    script.onload = function() {
                        callback();
                    };
                }
            }
            body.appendChild(script);
        } catch (e) {
            console.log("Plugin loading error. Refresh page.");
            if (typeof MCK_ONINIT === 'function') {
                MCK_ONINIT("error");
            }
            return false;
        }
    }
    function mckInitPluginScript() {
        try {
            $.each(mck_script_loader1, function(i, data) {
                if (data.name === "mck-common") {
                    try {
                       var options = applozic._globals;
                        if (typeof options !== 'undefined' && options.locShare === true) {
                            mckLoadScript(data.url, mckLoadScript2);
                        } else {
                            mckLoadScript(data.url, mckLoadAppScript);
                        }
                    } catch (e) {
                        mckLoadScript(data.url, mckLoadAppScript);
                    }
                } else if (data.name === "maps") {
                    try {
                        var options = applozic._globals;
                        if (typeof options !== 'undefined') {
                            if (options.googleMapScriptLoaded) {
                                return true;
                            }
                            if (options.googleApiKey) {
                                var url = data.url + "&key=" + options.googleApiKey;
                                mckLoadScript(url);
                            }
                        } else {
                            mckLoadScript(data.url);
                        }
                    } catch (e) {
                        mckLoadScript(data.url);
                    }
                } else {
                    mckLoadScript(data.url);
                }
            });
             if (typeof applozic._globals !== 'undefined'&& applozic._globals.video === true) {
                          $.each(mck_videocall, function(i, data) {
                          mckLoadScript(data.url);
                 });
               }
        } catch (e) {
            console.log("Plugin loading error. Refresh page.");
            if (typeof MCK_ONINIT === 'function') {
                MCK_ONINIT("error");
            }
            return false;
        }
    }
    function mckLoadScript2() {
        try {
            $.each(mck_script_loader2, function(i, data) {
                if (data.name === "locationpicker") {
                    mckLoadScript(data.url, mckLoadAppScript);
                }
            });
        } catch (e) {
            console.log("Plugin loading error. Refresh page.");
            if (typeof MCK_ONINIT === 'function') {
                MCK_ONINIT("error");
            }
            return false;
        }
    }
    function mckLoadAppScript() {
        try {
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = MCK_STATICPATH + "/js/app/sidebox/applozic.sidebox.1.0-min.js";
            if (script.readyState) { // IE
                script.onreadystatechange = function() {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        mckInitSidebox();
                    }
                };
            } else { // Others
                script.onload = function() {
                    mckInitSidebox();
                };
            }
            body.appendChild(script);
        } catch (e) {
            console.log("Plugin loading error. Refresh page.");
            if (typeof MCK_ONINIT === 'function') {
                MCK_ONINIT("error");
            }
            return false;
        }
    }
    function mckInitSidebox() {
        try {
            var options = applozic._globals;
            if (typeof options !== 'undefined') {
                options.ojq = $original;
                options.obsm = oModal;
                $applozic.fn.applozic(options);
            }
        } catch (e) {
            console.log("Plugin loading error. Refresh page.");
            if (typeof MCK_ONINIT === 'function') {
                MCK_ONINIT("error");
            }
            return false;
        }
    }
}

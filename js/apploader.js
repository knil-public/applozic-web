
window.applozic = window.applozic || {};
var MCK_CONTEXTPATH = "/packages/knil_applozic-web";
var MCK_STATICPATH = "/packages/knil_applozic-web";
var MCK_ONINIT = "";
// $.getScript(MCK_STATICPATH + '/sidebox/js/app/mck-app.js');
var options = applozic._globals;
if (typeof options !== 'undefined') {
    MCK_ONINIT = options.onInit;
}
window.addEventListener('error', function (e) {
    if (typeof (e.target.src) !== 'undefined' &&  e.target.src.indexOf('sidebox') !== -1 && typeof MCK_ONINIT === 'function') {
        console.log("Plugin loading error. Refresh page.");
        MCK_ONINIT("error");
    }
}, true);
var imported = document.createElement('script');
imported.src = MCK_STATICPATH + '/js/app/sidebox/app.js';
document.body.appendChild(imported);

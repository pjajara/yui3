/* This file is auto-generated by src/loader/meta_join.py */
var add = Y.Features.add;
// 0
add('load', '0', {
    "trigger": "scrollview-base", 
    "ua": "ie"
});
// autocomplete-list-keys-sniff.js
add('load', '1', {
    "test": function (Y) {
    // Only add keyboard support to autocomplete-list if this doesn't appear to
    // be an iOS or Android-based mobile device.
    //
    // There's currently no feasible way to actually detect whether a device has
    // a hardware keyboard, so this sniff will have to do. It can easily be
    // overridden by manually loading the autocomplete-list-keys module.
    //
    // Worth noting: even though iOS supports bluetooth keyboards, Mobile Safari
    // doesn't fire the keyboard events used by AutoCompleteList, so there's
    // no point loading the -keys module even when a bluetooth keyboard may be
    // available.
    return !(Y.UA.ios || Y.UA.android);
}, 
    "trigger": "autocomplete-list"
});
// history-hash-ie-test.js
add('load', '2', {
    "test": function (Y) {
    var docMode = Y.config.doc.documentMode;

    return Y.UA.ie && (!('onhashchange' in Y.config.win) ||
            !docMode || docMode < 8);
}, 
    "trigger": "history-hash"
});
// dd-gestures-test.js
add('load', '3', {
    "test": function(Y) {
    return (Y.config.win && ('ontouchstart' in Y.config.win && !Y.UA.chrome));
}, 
    "trigger": "dd-drag"
});
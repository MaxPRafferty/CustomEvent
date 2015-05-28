(function() {
    "use strict";
    var CustomEvent = function CustomEvent (event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    };

    var polyfill = function polyfill() {
        var local;

        if (typeof global !== 'undefined') {
            local = global;
        } else if (typeof self !== 'undefined') {
            local = self;
        } else {
            try {
                local = Function('return this')();
            } catch (e) {
                throw new Error('polyfill failed because global object is unavailable in this environment');
            }
        }

        var C = local.CustomEvent;

        if (C || !local['Event'] || !local['Event'].prototype) return;

        CustomEvent.prototype = local['Event'].prototype;
        local['CustomEvent'] = CustomEvent;
    }

    var CustomEventExport = {
        'CustomEvent': CustomEvent,
        'polyfill': polyfill
    };

    /* global define:true module:true window: true */
    if (typeof define === 'function' && define['amd']) {
        define(function() { return CustomEventExport; });
    } else if (typeof module !== 'undefined' && module['exports']) {
        module['exports'] = CustomEventExport;
    } else if (typeof this !== 'undefined') {
        this['CustomEvent'] = CustomEventExport;
    }

    polyfill();
}).call(this);

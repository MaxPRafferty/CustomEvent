(function() {
    "use strict";
    var CustomEvent = function CustomEvent (type, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent("CustomEvent");
        if(evt.initCustomEvent) {
            evt.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
        } else {
            evt.initEvent(type, params.bubbles, params.cancelable);
            evt.detail = params.detail;
        }
        return evt;
    };

    var polyfill = function polyfill() {
        var local = [];

        //spray and pray polyfilling. Doing this because some environments
        //have different locations for Event and their global.
        if (typeof window !== 'undefined') local.push(window);
        if (typeof global !== 'undefined') local.push(global);
        if (typeof GLOBAL !== 'undefined') local.push(GLOBAL);
        if (typeof self !== 'undefined') local.push(self);
        if (!local.length) {
            try {
                local.push(Function('return this')());
            } catch (e) {
                throw new Error('polyfill failed because global object is unavailable in this environment');
            }
        }

        for(var key in local) {
            if (local[key]['Event'] && local[key]['Event'].prototype) {
                CustomEvent.prototype = local[key]['Event'].prototype;
                break;
            } else if (local[key]['event'] && local[key]['event'].prototype) {
                CustomEvent.prototype = local[key]['event'].prototype;
                break;
            }
        }
        for(var key in local) {
            local[key]['CustomEvent'] = CustomEvent;
        }
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
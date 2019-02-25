function clearArray(vars, key) {
    vars.set(key, []);
}

function addToArray(vars, key, value) {
    var current = vars.get(key);
    if(Array.isArray(current)) {
        current.push(value);
        vars.set(key, current);
    }
    else {
        vars.set(key, [value]);
    }
}

var callbackStack = {
    callback,
    requests: [],
    iter: 0,
    idx : 0
 }
function setupCallbackStack(callback, requests, iterationCount = 1) {
    callbackStack.callback = callback;
    callbackStack.requests = requests;
    callbackStack.iter = iterationCount;
    callbackStack.idx = 0;
}

function nextCallback() {
    if(callbackStack.iter > 0) {
        if(callbackStack.idx <= callbackStack.requests.length -1) {
            var next = callbackStack.requests[callbackStack.idx];
            callbackStack.idx = callbackStack.idx + 1;
            return next;
        }
        else {
            if(callbackStack.iter == 1) {
                callbackStack.idx = 0;
                callbackStack.iter = 0;
                return callbackStack.callback;
            }
            else {
                callbackStack.iter = callbackStack.iter - 1;
                if(callbackStack.requests.length > 0) {
                    callbackStack.idx = 1;
                    return callbackStack.requests[0];
                }
                else {
                    callbackStack.idx = 0;
                    return callbackStack.callback;
                }
            }
        }
    }
    return callbackStack.callback;
}

var pmx = {
    set: function(key, value) {
        pm.environment.set(key, value);
    },
    get: function(key) {
        return pm.environment.get(key);
    },
    globals: {
        clear: function(key) {
            clearArray(pm.globals, key);
        },
        add: function(key, value) {
            addToArray(pm.globals, key, value);
        }
    },
    env: {
        clear: function(key) {
            clearArray(pm.environment, key);
        },
        add: function(key, value) {
            addToArray(pm.environment, key, value);
        }
    },
    vars: {
        clear: function(key) {
            clearArray(pm.variables, key);
        },
        add: function(key, value) {
            addToArray(pm.variables, key, value);
        }
    },
    stack: {
        set: function(callback, requests, iterations = 1) {
            setupCallbackStack(callback, requests, iterations);
        },
        navigateNext: function() {
            var next = nextCallback();
            if(next) {
                postman.setNextRequest(next);
            }
        }
    }
}
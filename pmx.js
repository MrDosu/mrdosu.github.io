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

function probability(percentage) {
    var r = Math.floor(Math.random() * Math.floor(100));
    return r <= percentage;
}

function randInt(from, to) {
    return Math.floor(Math.random() * Math.floor(to - from)) + from;
}

function handleResponse(code, func) {
    if(pm.response.code == code) {
        func();
    }
    else {
        pm.test(pm.response.text(), function() {
            postman.setNextRequest(null);
            pm.response.to.have.status(code);
        });
    }
}

function callEndpoint(method, user, url, body, func) {
    var params = {
        url: pmx.get("server") + url,
        method: method,
        body: body,
        header: {
            Authorization: "Bearer " + pm.globals.get("oauth_" + user + "_token")
        }
    };
    pm.sendRequest(params, func);
}

var pmx = {
    set: function(key, value) {
        pm.environment.set(key, value);
    },
    get: function(key) {
        return pm.environment.get(key);
    },
    clear: function(key) {
        clearArray(pm.environment, key);
    },
    add: function(key, value) {
        addToArray(pm.environment, key, value);
    },
    globals: {
        clear: function(key) {
            clearArray(pm.globals, key);
        },
        add: function(key, value) {
            addToArray(pm.globals, key, value);
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
    rand: {
        int: randInt,
        prob: probability
    },
    when: handleResponse,
    call: callEndpoint
}
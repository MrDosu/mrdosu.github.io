function randStr(prefix, length, nullProbability) {
    if(nullProbability) {
        var rp = Math.floor(Math.random() * Math.floor(100));
        if(rp <= nullProbability) {
            return null;
        }
    }
    var randPart = Math.random().toString(36).substring(2, length + 2);
    return prefix + "_" + randPart;
}

function randomProduct() {
    var p = {
        name: randStr("Name",10),
        merchantSku: randStr("SKU", 10),
        productGroup: randStr("Category", 1, 50),
        identifier: {
            mpn: {
                manufacturer: randStr("Manufacturer", 1),
                partNumber: randStr("HAN", 10)
            }
        }
    }
    return p;
}

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

var pmx = {
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
    rand: {
        product: function() {
            return randomProduct();
        }
    }
}
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

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
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
    rand: {
        int: randInt,
        shuffle: shuffleArray
    }
}
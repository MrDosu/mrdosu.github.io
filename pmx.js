var pmx = {
    test: function() {
        console.log("PMX is STILL working!");
    },
    globals: {
        add: function(key, value) {
            var current = pm.globals.get(key);
            if(Array.isArray(current)) {
                current.push(value);
                pm.globals.set(key, current);
            }
            else {
                pm.globals.set(key, [value]);
            }
        }
    }
}
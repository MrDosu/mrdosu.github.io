function warehouses(done) {
    pmx.call('GET', 'merchant', '/api/v1/merchant/warehouses', null, function (err, res) {
        done(res.json().items);
    });
}

function stocksInWarehouse(warehouseId, done) {
    pmx.call('GET', 'merchant', '/api/v1/merchant/stocks/warehouse/' + warehouseId, null, function (err, res) {
        done(_.map(res.json(), x => {
            return {
                warehouseId: x.warehouseId,
                jfsku: x.jfsku,
                shippable: x.stockLevel,
                announced: x.stockLevelAnnounced,
                reserved: x.stockLevelreserved,
                blocked: x.stockLevelBlocked,
            }
        }));
    });
}

function collect(max, iter, current, next, done) {
    var result = current.concat(next);
    if (iter >= max) {
        done(result);
    }
    return result;
}

function stocks(done) {
    warehouses(warehouses => {
        var current = [];
        var iter = 0;
        var max = warehouses.length;
        warehouses.forEach(w => {
            stocksInWarehouse(w.warehouseId, stocks => {
                current = collect(max, ++iter, current, stocks, done);
            });
        });
    });
}

var ffnmerchant = {
    warehouses: warehouses,
    stocksInWarehouse: stocksInWarehouse,
    stocks: stocks
}
function warehouses(done) {
    pmx.call('GET', 'merchant', '/api/v1/merchant/warehouses', null, function(err, res) {
        done(_.map(res.json().items, 'warehouseId'));
    });
}

var ffnmerchant = {
    warehouses: warehouses
}
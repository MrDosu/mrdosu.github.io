function warehouses() {
    var result = [];
    pmx.call('GET', 'merchant', '/api/v1/merchant/warehouses', null, function(err, res) {
        result = _.map(res.json().items, 'warehouseId');
    });
    return result;
}

var ffnmerchant = {
    warehouses: warehouses
}
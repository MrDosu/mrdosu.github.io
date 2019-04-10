function warehouses() {
    return new Promise((resolve, reject) => {
        pmx.call('GET', 'merchant', '/api/v1/merchant/warehouses', null, function(err, res) {
            resolve(_.map(res.json().items, 'warehouseId'));
        });
        return result;
    });
}

var ffnmerchant = {
    warehouses: warehouses
}
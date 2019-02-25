function randInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

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

function randomInbound(warehouseId, jfskus) {
    var items = [];
    jfskus.forEach(e => {
        items.push({
            inboundItemId: randStr("IbndItem", 10),
            jfsku: e,
            quantity: randInt(100) + 1
        });
    });

    return {
        merchantInboundNumber: randStr("IbndNum", 10),
        warehouseId: warehouseId,
        note: randStr("Note", 20),
        items: items
    }
}

var ffnmocks = {
    product: function() {
        return randomProduct();
    },
    inbound: function(warehouseId, jfskus) {
        return randomInbound(warehouseId, jfskus);
    }
}
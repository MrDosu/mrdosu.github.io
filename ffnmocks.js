function randInt(from, to) {
    return Math.floor(Math.random() * Math.floor(to - from)) + from;
}

function randDouble(from, to) {
    return (Math.random() * (to - from)) + from;
}

function randStr(prefix, length, nullProbability = -1) {
    if (nullProbability) {
        var rp = Math.floor(Math.random() * Math.floor(100));
        if (rp <= nullProbability) {
            return null;
        }
    }
    var randPart = Math.random().toString(36).substring(2, length + 2);
    return prefix + "_" + randPart;
}

function probability(percentage) {
    if (!percentage) {
        return true;
    }
    var r = Math.floor(Math.random() * Math.floor(100));
    return r <= percentage;
}

function pickOne(choices, nullProbability = -1) {
    if (!probability(nullProbability)) {
        return null;
    }
    var idx = randInt(0, choices.length - 1);
    return choices[idx];
}

function mockAddress() {
    return {
        "city": "Mortytown",
        "company": "Rickcorp LLC",
        "country": "DE",
        "email": "rick.sanchez@jtl-software.com",
        "extraAddressLine": "Behind the Shoneys",
        "extraLine": "Don't hand over to Mortys",
        "fax": "+49 123456789",
        "firstname": "Rick",
        "lastname": "Sanchez",
        "mobile": "+49 123456789",
        "phone": "+49 123456789",
        "salutation": "Mr",
        "state": "Dimension C-132",
        "street": "Mortystreet 1",
        "zip": "12345"
    }
}

function randomProduct() {
    var p = {
        name: randStr("Name", 10),
        merchantSku: randStr("SKU", 10),
        productGroup: randStr("Category", 1, 50),
        originCountry: pickOne(["DE", "ES", "FR"], 50),
        manufacturer: randStr("Manufacturer", 10, 50),
        weight: randDouble(0, 100),
        note: randStr("Note", 20, 50),
        identifier: {
            mpn: {
                manufacturer: randStr("Manufacturer", 1),
                partNumber: randStr("HAN", 10)
            },
            asin: randStr("ASIN", 10, 50),
            ean: randStr("EAN", 10, 50),
            epid: randStr("EPID", 10, 50),
            isbn: randStr("ISBN", 10, 50),
            upc: randStr("UPC", 10, 50),
        },
        specifications: {
            fnsku: randStr("FNSKU", 10, 50),
            hazardIdentifier: randStr("HAZARD", 10, 50),
            isBatch: probability(20),
            isBestBefore: probability(20),
            isDivisible: probability(50),
            isSerialNumber: probability(20),
            isBillOfMaterials: false,
            taric: randStr("Taric", 10, 50),
            unNUmber: randStr("UNNum", 10, 50)
        },
        purchasePrice: {
            amount: randDouble(1, 10000),
            currency: pickOne(["EUR", "CAD", "JPY"])
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
            quantity: randInt(1, 100)
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
    product: function () {
        return randomProduct();
    },
    inbound: function (warehouseId, jfskus) {
        return randomInbound(warehouseId, jfskus);
    },
    rand: {
        string: randStr,
        int: randInt,
        double: randDouble,
        pick: pickOne,
        probability: probability
    },
    mock: {
        address: mockAddress
    }
}
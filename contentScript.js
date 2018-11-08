var now = new Date();
var strDate = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();

//console.log(strDate);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action == "get-data") {
            console.log("revice action");
            var data = main();
            sendResponse({ data: data });
        }
        return true;
    });

function main() {
    //console.log(document.getElementsByTagName("table")[0]);
    var data = [];
    var table = $("table").closest("tr");

    for (let i = 0; i < table.length; i++) {

        var objDefault = {
            name: "",
            phone: "",
            address: "",
            ward: "",
            district: "",
            city: "",
            nameServices: [],
            price: "",
            employeeSell: "",
            employeeDeloy: "",
            employeeSample: "",
            createDate: strDate
        }


        var row = table[i];

        /****** Patient info ******/
        var patient = $(row).find(".patient-info")[0];

        var tempInfo = $(patient).children().last();

        objDefault.name = handleString($(patient).children(":first").text());
        objDefault.phone = handleString(tempInfo.find("p > a").text());
        objDefault.address = handleString(tempInfo.find("p:nth-child(2)").text());
        objDefault.ward = handleString(tempInfo.find("p:nth-child(3)").text());
        objDefault.district = handleString(tempInfo.find("p:nth-child(4)").text());
        objDefault.city = handleString(tempInfo.find("p:nth-child(5)").text());

        //console.log(patientInfo);
        /****** END ******/

        /****** total price service ******/
        var services = $(row).find("td:nth-child(2)").children("div").first().find("ol > li");
        var nameService = [];
        $.each(services, function (index, element) {
            nameService.push(handleString($(element).text()));
        });

        objDefault.nameServices = nameService;
        //console.log(nameService);
        /****** END ******/

        /****** total price service ******/
        var totalPrice = $(row).find("td:nth-child(2)").children("div").first().find("tr");
        var price = 0;
        if (totalPrice[2]) {
            price = $(totalPrice[2]).find("th").text();
        } else if (totalPrice[1]) {
            price = $(totalPrice[1]).find("th").text();
        } else {
            price = $(totalPrice[0]).find("th").text();
        }
        objDefault.price = handleString(handlePrice(price));
        //console.log();
        /****** END ******/

        /****** total price service ******/
        var employee = $(row).find("td:nth-child(2)").children("table").first().find("tr");
        var employeeSell = "";
        var employeeDeloy = "";
        var employeeSample = "";

        if (employee[0]) {
            employeeSell = handleString($(employee[0]).find("td").text());
        }

        if (employee[1]) {
            employeeDeloy = handleString($(employee[1]).find("td").text());
        }

        if (employee[2]) {
            employeeSample = capitalizeFirstLetter(handleString($(employee[2]).find("td").text()));
        }

        objDefault.employeeSell = employeeSell;
        objDefault.employeeDeloy = employeeDeloy;
        objDefault.employeeSample = employeeSample;
        //console.log(employeeSell + " - " + employeeDeloy + " - " + employeeSample);
        //console.log(handlePrice(handleString(price));
        /****** END ******/

        data.push(objDefault);
    }
    //console.log(table);
    return data;
}

function handleString(str) {
    str = $.trim(str);
    str = str.replace(/\n/ig, '');
    str = str.replace(/ +(?= )/g, '');
    return str;
}

function handlePrice(price) {
    price = price.replace(/[.VNĐ]/g, '');
    return price;
}

function capitalizeFirstLetter(string) {
    var arrString = string.split(" ");
    for (let i = 0; i < arrString.length; i++) {
        arrString[i] = arrString[i].charAt(0).toUpperCase() + arrString[i].slice(1).toLowerCase();
    }
    return arrString.join(" ");
}
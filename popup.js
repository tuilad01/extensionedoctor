document.getElementById("btnGetData").onclick = function () {
    $("#wrapper-spinner").fadeIn();
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {        
        chrome.tabs.sendMessage(tabs[0].id, { action: "get-data" }, function (response) {
            console.log(response);
            if (!response['data']) return false;
            
            var table = createTable();
            table.append(createThead()
                .append(GenTitle()));
            var tbody = createTbody();
            for (var i = 0; i < response.data.length; i++) {
                var patient = response.data[i];
                var row = GenColumn(patient, i+1);
                tbody.append(row);
            }
            table.append(tbody);

            $("#container").html(table);
            $("#wrapper-spinner").fadeOut();
            return true;
        });
    });
}

function GenColumn(patient, index) {
    var row = createRow();
    row.append(createColumn(index));
    row.append(createColumn(patient.name));
    row.append(createColumn(""));
    row.append(createColumn(""));
    row.append(createColumn(patient.phone));
    row.append(createColumn(patient.createDate));
    row.append(createColumn(patient.address + ", " + patient.ward + ", " + patient.district));
    row.append(createColumn(patient.employeeSell));
    row.append(createColumn(""));
    row.append(createColumn(patient.nameServices.join(" + ")));
    row.append(createColumn(patient.price));
    row.append(createColumn(patient.employeeSample));
    row.append(createColumn("MINH"));
    return row;
}

function GenTitle() {
    var row = createRow();
    row.append(createTitle("STT"));
    row.append(createTitle("HỌ VÀ TÊN"));
    row.append(createTitle("GIỚI TÍNH"));
    row.append(createTitle("NĂM SINH"));
    row.append(createTitle("ĐIỆN THOẠI"));
    row.append(createTitle("NGÀY LẤY MẪU"));
    row.append(createTitle("ĐỊA CHỈ"));
    row.append(createTitle("NGUỒN"));
    row.append(createTitle("PHÒNG KHÁM"));
    row.append(createTitle("GÓI KHÁM"));
    row.append(createTitle("SỐ TIỀN PHẢI THU"));
    row.append(createTitle("CTV"));
    row.append(createTitle("TRIỂN KHAI"));
    return row;
}

function createTitle(txt) {
    var th = $("<th>");
    th.text(txt);
    return th;
}

function createRow() {
    var tr = $("<tr>");
    return tr;
}

function createColumn(txt) {
    var td = $("<td>");
    td.text(txt);
    return td;
}

function createThead() {
    var thead = $("<thead>");
    return thead;
}

function createTbody() {
    var tbody = $("<tbody>");
    return tbody;
}

function createTable() {
    var table = $("<table>");
    return table;
}
function JSONToExcelConvertor(JSONData: any, FileName: string, title: any, filter: any) {
  if (!JSONData)
    return;
  //转化json为object
  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

  var excel = "<table>";

  //设置表头  
  var row = "<tr>";

  if (title) {
    //使用标题项
    for (var i in title) {
      row += "<th align='center'>" + title[i] + '</th>';
    }

  }
  else {
    //不使用标题项
    for (var i in arrData[0]) {
      row += "<th align='center'>" + i + '</th>';
    }
  }

  excel += row + "</tr>";

  let indez: number = 0;

  //设置数据  
  for (; indez < arrData.length; indez++) {
    var row = "<tr>";

    for (var index in arrData[indez]) {
      //判断是否有过滤行
      if (filter) {
        if (filter.indexOf(index) == -1) {
          var value = arrData[indez][index] == null ? "" : arrData[indez][index];
          row += '<td>' + value + '</td>';
        }
      }
      else {
        var value = arrData[indez][index] == null ? "" : arrData[indez][index];
        row += "<td align='center'>" + value + "</td>";
      }
    }

    excel += row + "</tr>";
  }

  excel += "</table>";

  var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
  excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
  excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
  excelFile += '; charset=UTF-8">';
  excelFile += "<head>";
  excelFile += "<!--[if gte mso 9]>";
  excelFile += "<xml>";
  excelFile += "<x:ExcelWorkbook>";
  excelFile += "<x:ExcelWorksheets>";
  excelFile += "<x:ExcelWorksheet>";
  excelFile += "<x:Name>";
  excelFile += "{worksheet}";
  excelFile += "</x:Name>";
  excelFile += "<x:WorksheetOptions>";
  excelFile += "<x:DisplayGridlines/>";
  excelFile += "</x:WorksheetOptions>";
  excelFile += "</x:ExcelWorksheet>";
  excelFile += "</x:ExcelWorksheets>";
  excelFile += "</x:ExcelWorkbook>";
  excelFile += "</xml>";
  excelFile += "<![endif]-->";
  excelFile += "</head>";
  excelFile += "<body>";
  excelFile += excel;
  excelFile += "</body>";
  excelFile += "</html>";


  var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);

  var link: any = document.createElement("a");
  link.href = uri;

  link.style = "visibility:hidden";
  link.download = FileName + ".xls";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


export {
  JSONToExcelConvertor
}
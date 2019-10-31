$('.input-excel').change(function(e) {
  var reader = new FileReader();
  reader.readAsArrayBuffer(e.target.files[0]);
  reader.onload = function(e) {
    var data = new Uint8Array(reader.result);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i)
      arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join('');
    var workbook = XLSX.read(bstr, { type: 'binary' });
    // var wb = XLSX.read(data,{type:'array'});
    // var htmlstr = XLSX.write(wb,{type:'binary',bookType:'html'});
    let sheetArr = [];
    for (let j = 0; j < workbook.SheetNames.length; j++) {
      let first_sheet_name = workbook.SheetNames[j];
      let worksheet = workbook.Sheets[first_sheet_name];
      let sheetData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      sheetArr.push(sheetData);
      // fetch(`http://localhost:4000/ans`,{
      //     method:'post',
      //     body:JSON.stringify(XLSX.utils.sheet_to_json(worksheet,{raw:true})),
      //     headers:{'Content-Type': 'application/json'}
      // })
    }
    const rateSheet = sheetArr[0];
    $('.city').html(`${rateSheet[5].__EMPTY_6}<br>${rateSheet[5].AED}`);
    console.log(rateSheet[5].__EMPTY_6);
    for (let i = 7; i < rateSheet.length; i++) {
      if (!rateSheet[i].__EMPTY) break;
      let rawHtml = `<tr><td>${rateSheet[i].__EMPTY_2}</td>
            <td>${rateSheet[i].__EMPTY_4}</td>
            <td>${rateSheet[i].__EMPTY_6}</td></tr>`;
      $('.tableBody').append(rawHtml);
    }
    $('.displayRates').css({
      display: 'block'
    });
    const profitSheet = sheetArr[1];
    for (let i = 4; i < profitSheet.length; i++) {
      let rawHtml = `<tr><td>${profitSheet[i].__EMPTY_1}</td>
            <td>${profitSheet[i].__EMPTY_3}</td>
            <td>${profitSheet[i].__EMPTY_4}</td>
            <td>${profitSheet[i].__EMPTY_5}</td></tr>`;
      $('.tableBodyOfProfitMargin').append(rawHtml);
    }

    $('.profitMargin').css({
      display: 'block'
    });
    // console.log(profitSheet);
    // $('#wrapper')[0].innerHTML += htmlstr;
  };
});

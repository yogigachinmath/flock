$('.input-excel').change(function(e) {
  var reader = new FileReader();
  reader.readAsArrayBuffer(e.target.files[0]);
  let checkIfExcel = e.target.files[0].name.split('.');
  if(checkIfExcel[checkIfExcel.length-1] !== 'xlsx'){
    alert('please provide the correct input file');
  }
  else{
  const formData = new FormData();

  formData.append('file', e.target.files[0]);

  reader.onload = function(e) {
    var data = new Uint8Array(reader.result);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i)
      arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join('');
    var workbook = XLSX.read(bstr, { type: 'binary' });
    let sheetArr = [];

    for (let j = 0; j < workbook.SheetNames.length; j++) {
      let first_sheet_name = workbook.SheetNames[j];
      let worksheet = workbook.Sheets[first_sheet_name];
      let sheetData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      sheetArr.push(sheetData);
    }

    // console.log(formData);
    fetch(`http://localhost:4000/ans`, {
      method: 'post',
      body: formData
    }).then(val => console.log(val));

    const rateSheet = sheetArr[0];
   document.querySelector('.tableBodyOfProfitMargin').innerHTML='';
   document.querySelector('.tableBody').innerHTML='';
   document.querySelector('.bonusBody').innerHTML='';
   
    $('.city').html(`${rateSheet[5].__EMPTY_6}<br>${rateSheet[5].AED}`);
    console.log(rateSheet[5].__EMPTY_6);
    for (let i = 7; i < rateSheet.length; i++) {
      if (!rateSheet[i].__EMPTY) break;
      let rawHtml = `<tr><td>${rateSheet[i].__EMPTY_2}</td>
            <td>${rateSheet[i].__EMPTY_4}</td>
            <td>${rateSheet[i].__EMPTY_6}</td></tr>`;
      $('.tableBody').append(rawHtml);
    }
   
    const profitSheet = sheetArr[1];
    for (let i = 4; i < profitSheet.length; i++) {
      let rawHtml = `<tr><td>${profitSheet[i].__EMPTY_1}</td>
            <td>${profitSheet[i].__EMPTY_3}</td>
            <td>${profitSheet[i].__EMPTY_4}</td>
            <td>${profitSheet[i].__EMPTY_5}</td></tr>`;
      $('.tableBodyOfProfitMargin').append(rawHtml);
    }
    const bonusSheet = sheetArr[2];
    for (let i = 1; i < bonusSheet.length; i++) {
      let rawHtml = `<tr><td>${bonusSheet[i].__EMPTY_1}</td>
              <td>${bonusSheet[i].__EMPTY_3}</td>
              <td>${bonusSheet[i].__EMPTY_4}</td></tr>`;
      $('.bonusBody').append(rawHtml);
    }

    $('.profitMargin').css({
      display: 'block'
    });

    $('.Bonus').css({
      display: 'block'
    });

    $('.displayRates').css({
      display: 'block'
    });

  };
}
});

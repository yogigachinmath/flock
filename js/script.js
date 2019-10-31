$('.input-excel').change(function(e){
    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = function(e) {
            var data = new Uint8Array(reader.result);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            // var wb = XLSX.read(data,{type:'array'});
            // var htmlstr = XLSX.write(wb,{type:'binary',bookType:'html'});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
            fetch(`http://localhost:4000/ans`,{
                method:'post',
                body:JSON.stringify(XLSX.utils.sheet_to_json(worksheet,{raw:true})),
                headers:{'Content-Type': 'application/json'}
            })
            // $('#wrapper')[0].innerHTML += htmlstr;
    }
})

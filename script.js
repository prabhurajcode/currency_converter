const host = 'api.frankfurter.app';
let select = document.querySelectorAll('.currency');
let input = document.getElementById('input');
let convertButton = document.getElementById('btn');

fetch(`https://${host}/currencies`)
.then(response=>response.json())
.then(response=>populateCurrencyDropdown(response));

function populateCurrencyDropdown(response){
   let currency = Object.entries(response);
   for(let i=0 ; i<currency.length; i++){
    let options = `<option value="${currency[i][0]}">${currency[i][0]}</option>`
    select[0].innerHTML += options;
    select[1].innerHTML +=options;
   } 
}

convertButton.addEventListener('click' , ()=>{
    let currency1 = select[0].value;
    let currency2 = select[1].value;
    let inputVal = input.value

    if (currency1 === currency2) {
        alert("Please choose different currencies.");
    } else if (!inputVal) {
        alert("Please enter a valid amount.");
    } else {
        convert(currency1, currency2, inputVal);
    }

});

function convert(currency1,currency2,inputVal){
    fetch(`https://${host}/latest?amount=${inputVal}&from=${currency1}&to=${currency2}`)
    .then(resp => resp.json())
    .then((data) => {
      document.getElementById('result').value = Object.values(data.rates)[0]
    });
  
  }
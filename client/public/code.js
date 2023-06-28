function hidePopup() {
  document.querySelector('.overlay').style.display = 'none';
  document.querySelector('.popup').style.display = 'none';
  document.querySelector('.Mostrar').style.display = 'none';
}

async function sentPayment(){
  if (typeof window.webln === "undefined") {
    return alert("No WebLN available.");
  }
  try{
    await window.webln.enable();
    var factura11 = document.getElementById('f11').value;
    const invoice = factura11;
    const result = await window.webln.sendPayment(invoice);
    var ventana = document.querySelector('.popup');
    if(result.preimage != ""){
      ventana.innerHTML = '<H2>Transacion completada</H2> <br>   <img src="img/verifcado.png" alt="verificacion" class=verify>  <button id="Cerrar" onclick="hidePopup()">Cerrar</button>'
    }
  }catch(error ){
    console.error(error)
  }
}

async function keySend(){
  var pubkey = document.getElementById('pubkey').value;
  var amount = document.getElementById('cantidad').value
  await webln.enable();
const result = await webln.keysend({
  destination: pubkey, 
  amount: amount, 
  customRecords: {
      "34349334": "HELLO AMBOSS"
  }
});
var ventana = document.querySelector('.popup');
console.log(result);
if(result.preimage != ""){
ventana.innerHTML = '<H2>Transacion completada</H2> <br>   <button id="Cerrar" onclick="hidePopup()">Cerrar</button>'
}
}

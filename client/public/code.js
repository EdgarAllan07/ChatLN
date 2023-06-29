import Swal from 'sweetalert';

var toggle = document.querySelector('.toggle')
var cuadro = document.querySelector(".cuadro-texto")
toggle.onclick = function () {
  cuadro.style.display = 'block'
}

function hidePopup() {
  document.querySelector('.overlay').style.display = 'none';
  document.querySelector('.popup').style.display = 'none';
  document.querySelector('.Mostrar').style.display = 'none';
  document.getElementById('f11').value = "";
}
//Enviar el pago
async function sentPayment() {
  var cond = ""
  if (typeof window.webln === "undefined") {
    return alert("No WebLN available.");
  }
  try {
    await window.webln.enable();
    var factura11 = document.getElementById('f11').value;
    const invoice = factura11;
    const result = await window.webln.sendPayment(invoice);
    cond = result.preimage;
    var ventana = document.querySelector('.popup');
    console.log(result);
    if (result.preimage != "") {
      ventana.innerHTML = '<H2>Transacion completada</H2> <br>   <img src="img/verify.png" alt="verificacion" class=verify><button id="Cerrar" onclick="hidePopup()">Cerrar</button>'
    }
  } catch (error) {
    console.error(error)
  }
  cond = "";
}


  

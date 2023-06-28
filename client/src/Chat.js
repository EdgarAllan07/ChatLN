import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import {nombre} from "./App"
import {rm} from "./App"

   // Función para mostrar la ventana emergente
   const showPopup = () =>{
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.popup').style.display = 'block';
  }

  const showUp = ()=> {
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.Mostrar').style.display = 'block';
  }
  
  
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  //Creando el bolt11 de pago
  const createInvoice = async ()=>{
    await window.webln.enable();
    const invoice = await window.webln.makeInvoice({
      amount: "",
    });
      setCurrentMessage(invoice.paymentRequest)
      
    }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const Cuadro = ()=>{
    var cuadro = document.querySelector(".cuadro-texto")
    cuadro.classList.toggle("active");

    async function getInformation(){
      const listaElementos = document.querySelectorAll('ul li');
      //var datos = document.querySelector(".datos");
        await window.webln.enable();
        const info = await window.webln.getInfo();
        var alias= info.node.alias
        var pubkey = info.node.pubkey
        var name = nombre
        var room = rm;
        console.log(info);
        for(var i=0; i<listaElementos.length;i++){
            if(i == 0){
              listaElementos[i].textContent = `Alias del nodo: ${alias}`
            }else if(i == 1){
              listaElementos[i].textContent = `Public Key: ${pubkey}`
            }else if(i == 2){
              listaElementos[i].textContent = `Nombre de usuario: ${name}`
            }else if(i == 3){
              listaElementos[i].textContent = `Numero de room: ${room}`
            }
        }
        
    }
    getInformation();
  }

  return (
    <div className="chat-window">
       <div className="toggle" onClick={Cuadro}><i class="fa-regular fa-user fa-2xl color-box"></i></div>
      <div className="chat-header">
        <p>Live Chat</p>
          <button className="boton bolt" type="button" onClick={createInvoice}>Invoice</button>
          <button onClick={showPopup} className="boton pay" type="button">Pay</button>
          <button onClick={showUp} className="boton pubkey" type="button"> PubKey</button>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
          id="texto"
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
  
}

export default Chat;

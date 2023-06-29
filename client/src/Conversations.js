import React, { useEffect, useState } from "react";
import "./index.scss";
import QRCode from "qrcode";
import { rm } from "./App"

function Conversations({ username, socket,room }) {
    const [messageList, setMessageList] = useState([]);
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        // Escucha el evento "user_list" del servidor
        socket.on("user_list", (data) => {
            setUserList(data);
        });

        // Limpia el listener cuando el componente se desmonta
        return () => {
            socket.off("user_list");
        };
    }, [socket]);

  //Poniendo datos pubkey,Room y todo eso
  const Cuadro = () => {
    var cuadro = document.querySelector(".cuadro-texto")
    cuadro.classList.toggle("active");
    
    if (cuadro.classList.contains("active")){
    //Creando el getInfo o la informacion del nodo junto con el usuario y numeor de room
    async function getInformation() {
      const listaElementos = document.querySelectorAll('ul li');
      //var datos = document.querySelector(".datos");
      await window.webln.enable();
      const info = await window.webln.getInfo();
      const nodeBalance = await window.webln.request("channelbalance");
      var alias = info.node.alias
      var pubkey = info.node.pubkey
      var room = rm;
      console.log(info);
      for (var i = 0; i < listaElementos.length; i++) {
        if (i == 0) {
          listaElementos[i].textContent = `Room Number: ${room}`
        } else if (i == 1) {
            listaElementos[i].textContent = `Balance: ${nodeBalance.local_balance.sat} sats`
        }  else if (i == 2) {
            listaElementos[i].textContent = `Node's alias: ${alias}`
        } else if(i == 3){
            const truncatedPubkey = pubkey.substring(0, 10) + "...";
            listaElementos[i].textContent = `Pubkey: ${truncatedPubkey}`;
            const qrContainer = document.querySelector(".qr-container");
            qrContainer.innerHTML = ""; // Limpiar el contenedor del QR previo

            // Generar el QR y agregarlo al contenedor
            const qrCode = await QRCode.toDataURL(pubkey, { width: 100 });
            const qrImage = document.createElement("img");
            qrImage.src = qrCode;
            qrImage.alt = "Pubkey QR";
            qrContainer.appendChild(qrImage);
          }
      }

    }
    getInformation();
    
}


  }
    return (

        <div class="app-left">
            <div class="app-left-header">
                <div class="app-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <defs />
                        <path
                            class="path-1"
                            fill="#3eb798"
                            d="M448 193.108h-32v80c0 44.176-35.824 80-80 80H192v32c0 35.344 28.656 64 64 64h96l69.76 58.08c6.784 5.648 16.88 4.736 22.528-2.048A16.035 16.035 0 00448 494.868v-45.76c35.344 0 64-28.656 64-64v-128c0-35.344-28.656-64-64-64z"
                            opacity=".4"
                        />
                        <path
                            class="path-2"
                            fill="#3eb798"
                            d="M320 1.108H64c-35.344 0-64 28.656-64 64v192c0 35.344 28.656 64 64 64v61.28c0 8.832 7.168 16 16 16a16 16 0 0010.4-3.84l85.6-73.44h144c35.344 0 64-28.656 64-64v-192c0-35.344-28.656-64-64-64zm-201.44 182.56a22.555 22.555 0 01-4.8 4 35.515 35.515 0 01-5.44 3.04 42.555 42.555 0 01-6.08 1.76 28.204 28.204 0 01-6.24.64c-17.68 0-32-14.32-32-32-.336-17.664 13.712-32.272 31.376-32.608 2.304-.048 4.608.16 6.864.608a42.555 42.555 0 016.08 1.76c1.936.8 3.76 1.808 5.44 3.04a27.78 27.78 0 014.8 3.84 32.028 32.028 0 019.44 23.36 31.935 31.935 0 01-9.44 22.56zm96 0a31.935 31.935 0 01-22.56 9.44c-2.08.24-4.16.24-6.24 0a42.555 42.555 0 01-6.08-1.76 35.515 35.515 0 01-5.44-3.04 29.053 29.053 0 01-4.96-4 32.006 32.006 0 01-9.28-23.2 27.13 27.13 0 010-6.24 42.555 42.555 0 011.76-6.08c.8-1.936 1.808-3.76 3.04-5.44a37.305 37.305 0 013.84-4.96 37.305 37.305 0 014.96-3.84 25.881 25.881 0 015.44-3.04 42.017 42.017 0 016.72-2.4c17.328-3.456 34.176 7.808 37.632 25.136.448 2.256.656 4.56.608 6.864 0 8.448-3.328 16.56-9.28 22.56h-.16zm96 0a22.555 22.555 0 01-4.8 4 35.515 35.515 0 01-5.44 3.04 42.555 42.555 0 01-6.08 1.76 28.204 28.204 0 01-6.24.64c-17.68 0-32-14.32-32-32-.336-17.664 13.712-32.272 31.376-32.608 2.304-.048 4.608.16 6.864.608a42.555 42.555 0 016.08 1.76c1.936.8 3.76 1.808 5.44 3.04a27.78 27.78 0 014.8 3.84 32.028 32.028 0 019.44 23.36 31.935 31.935 0 01-9.44 22.56z"
                        />
                    </svg>
                </div>
                <h1>QuickChat</h1>
            </div>
            <div class="app-profile-box">
               
               <img src="https://images.vexels.com/media/users/3/263623/isolated/preview/d262ff89785ec8364e39438250c1804f-personaje-de-dab-de-astronauta-de-bitcoin.png"/>
                   <div class="app-profile-box-name">
                       {username}
   
                   </div>
                   <button class="btn btn-primary" onClick={Cuadro}><i class="fa-solid fa-circle-info fa-lg"></i></button>
                   <div class="cuadro-texto">
               <ul>
             <li></li>
             <li></li>
             <li></li>
             <li></li>
             <div className="qr-container"></div>
           </ul>
         </div>
               </div>
            <div class="chat-list-wrapper">
                <div class="chat-list-header">
                    Room's users <span class="c-number">{room}</span>
                    <svg
                        class="list-header-arrow"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        className="feather feather-chevron-up"
                        viewBox="0 0 24 24"
                    >
                        <defs />
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </div>
                <ul class="chat-list active">
                    {userList.map((user) => (
                        <li key={user} className="chat-list-item active">
                              <img src="https://images.vexels.com/media/users/3/263623/isolated/preview/d262ff89785ec8364e39438250c1804f-personaje-de-dab-de-astronauta-de-bitcoin.png"/>
                            <span className="chat-list-name">{user.username}</span>
                        </li>
                    ))}


                </ul>
            </div>
        </div>
    );
}

export default Conversations;

import React, { useEffect, useState } from "react";
import "./index.scss";
import { rm } from "./App"

function Conversations({ username, socket }) {
    //Poniendo datos pubkey,Room y todo eso
    const Cuadro = () => {
        var cuadro = document.querySelector(".cuadro-texto")
        cuadro.classList.toggle("active");
    
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
                listaElementos[i].textContent = `Saldo: ${nodeBalance.local_balance.sat} sats`
            }  else if (i == 2) {
                listaElementos[i].textContent = `Node's alias: ${alias}`
            } else if (i == 3) {
                listaElementos[i].textContent = `Public Key: ${pubkey}`
            }
          }
    
        }
        getInformation();
      }

    const [messageList, setMessageList] = useState([]);
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
                <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                    alt="profile"
                />
                <div class="app-profile-box-name">
                    {username}

                </div>
                <button class="btn btn-primary" onClick={Cuadro}>Info</button>
                <div class="cuadro-texto">
            <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
            </div>
            <div class="chat-list-wrapper">
                <div class="chat-list-header">
                    Active Users <span class="c-number">4</span>
                    <svg
                        class="list-header-arrow"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        className="feather feather-chevron-up"
                        viewBox="0 0 24 24"
                    >
                        <defs />
                        <path d="M18 15l-6-6-6 6" />
                    </svg>
                </div>
                <ul class="chat-list active">
                    <li class="chat-list-item active">
                        <img
                            src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                            alt="chat"
                        />
                        <span class="chat-list-name">Dwight Schrute</span>
                    </li>
                    <li class="chat-list-item">
                        <img
                            src="https://images.unsplash.com/photo-1566465559199-50c6d9c81631?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                            alt="chat"
                        />
                        <span class="chat-list-name">Andy Bernard</span>
                    </li>
                    <li class="chat-list-item">
                        <img
                            src="https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2552&q=80"
                            alt="chat"
                        />
                        <span class="chat-list-name">Michael Scott</span>
                    </li>
                    <li class="chat-list-item">
                        <img
                            src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80"
                            alt="chat"
                        />
                        <span class="chat-list-name">Holy Flax</span>
                    </li>
                    <li class="chat-list-item">
                        <img
                            src="https://images.unsplash.com/photo-1583864697784-a0efc8379f70?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                            alt="chat"
                        />
                        <span class="chat-list-name">Jim Halpert</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Conversations;

import React, { useEffect, useState } from "react";
import QRCode from 'qrcode';
import ScrollToBottom from "react-scroll-to-bottom";
import './index.scss';
import { DropdownItem, DropdownMenu, UncontrolledDropdown, DropdownToggle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nombre } from "./App"
import { rm } from "./App"

// Función para mostrar la ventana emergente
const showPopup = () => {
  document.querySelector('.overlay').style.display = 'block';
  document.querySelector('.popup').style.display = 'block';
}

const showUp = () => {
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
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        qrCodeURL: currentMessage.startsWith("lnb") ? await generateQRCode(currentMessage) : null,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const generateQRCode = async (message) => {
    try {
      const url = await QRCode.toDataURL(message);
      return url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Creando el bolt11 de pago
  const createInvoice = async () => {
    await window.webln.enable();
    const invoice = await window.webln.makeInvoice({
      amount: "",
    });
    setCurrentMessage(invoice.paymentRequest);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const Cuadro = () => {
    var cuadro = document.querySelector(".cuadro-texto")
    cuadro.classList.toggle("active");

    // Creando el getInfo o la informacion del nodo junto con el usuario y numero de room
    async function getInformation() {
      const listaElementos = document.querySelectorAll('ul li');
      await window.webln.enable();
      const info = await window.webln.getInfo();
      const nodeBalance = await window.webln.request("walletbalance");
      var alias = info.node.alias
      var pubkey = info.node.pubkey
      var name = nombre
      var room = rm;
      console.log(info);
      for (var i = 0; i < listaElementos.length; i++) {
        if (i === 0) {
          listaElementos[i].textContent = `Node's alias: ${alias}`
        } else if (i === 1) {
          listaElementos[i].textContent = `Public Key: ${pubkey}`
        } else if (i === 2) {
          listaElementos[i].textContent = `Nickname: ${name}`
        } else if (i === 3) {
          listaElementos[i].textContent = `Room Number: ${room}`
        } else if (i === 4) {
          listaElementos[i].textContent = `Saldo: ${nodeBalance.total_balance} sats`
        }
      }
    }

    getInformation();
  }

  return (
    <div className="app-main">
      <div className="chat-wrapper">
        <ScrollToBottom>
          {messageList.map((messageContent, index) => {
            return (
              <div
                className={username === messageContent.author ? "message-wrapper" : "message-wrapper reverse"}
                id={username === messageContent.author ? "you" : "other"}
                key={index}
              >
                <img
                  className="message-pp"
                  src="https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=934&amp;q=80"
                  alt="profile-pic"
                />

                <div className="message-box-wrapper">
                  <span className="message-box-details">
                    <p>{messageContent.author}</p>
                  </span>
                  <div className="message-box">
                    <p>{messageContent.message}</p>
                    {messageContent.qrCodeURL && (
                      <img
                        className="message-qr"
                        src={messageContent.qrCodeURL}
                        alt="QR code"
                      />
                    )}
                  </div>
                  <span className="message-box-details">
                    <p>{messageContent.time}</p>
                  </span>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-input-wrapper">
        <div className="d-flex p-5 justify-content-center">
          <UncontrolledDropdown className="me-2" direction="up">
            <DropdownToggle caret color="primary">
              Wallet
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={createInvoice}>Invoice</DropdownItem>
              <DropdownItem onClick={showPopup}>Pay</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="chat-input"
            placeholder="Enter your message here"
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyPress={(event) => {
              event.key === "Enter" && sendMessage();
            }}
            id="texto"
          />
          <button className="emoji-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="feather feather-smile"
              viewBox="0 0 24 24"
            >
              <defs />
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
            </svg>
          </button>
        </div>
        <button className="chat-send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;

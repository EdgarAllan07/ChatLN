import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import Swal from "sweetalert";
import ScrollToBottom from "react-scroll-to-bottom";
import "./index.scss";
import { DropdownItem, DropdownMenu, UncontrolledDropdown, DropdownToggle } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { nombre } from "./App";

// Función para mostrar la ventana emergente
const showPopup = () => {
  document.querySelector(".overlay").style.display = "block";
  document.querySelector(".popup").style.display = "block";
};

// Función para ocultar la ventana emergente
const hidePopup = () => {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".popup").style.display = "none";
};

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

  // Enviar el pago
  const sentPayment = async () => {
    var cond = "";
    if (typeof window.webln === "undefined") {
      return alert("No WebLN available.");
    }
    try {
      await window.webln.enable();
      var factura11 = document.getElementById("f11").value;
      const invoice = factura11;
      const result = await window.webln.sendPayment(invoice);
      cond = result.preimage;
      console.log(result);
      if (result.preimage !== "") {
        Swal({
          title: "Transacción completada",
          text: "¡La transacción se ha completado con éxito!",
          icon: "success",
          button: "Cerrar",
        }).then(() => {
          hidePopup();
        });
      }
    } catch (error) {
      console.error(error);
    }
    cond = "";
  };

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
                  src="https://images.vexels.com/media/users/3/263623/isolated/preview/d262ff89785ec8364e39438250c1804f-personaje-de-dab-de-astronauta-de-bitcoin.png"
                                    alt="profile-pic"
                />
              
                <div className="message-box-wrapper">
                  <span className="message-box-details">
                    <p>{messageContent.author}</p>
                  </span>
                  <div className="message-box">
                    <p>{messageContent.message}</p>
                    {messageContent.qrCodeURL && (
                      <img className="message-qr" src={messageContent.qrCodeURL} alt="QR code" />
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

      {/* Ventana emergente */}
      <div className="overlay" onClick={hidePopup}></div>
      <div className="popup">
        <h3>Please enter the payment's Invoice</h3>
        <input
          type="text"
          id="f11"
          placeholder="EJ: lnbcrt500u1pjfh90wpp5cmk5fpxr0aav037mz5nnxg0phz"
          required
        />
        <button id="enviar" type="button" onClick={sentPayment}>
          Send
        </button>
        <button id="Cerrar" onClick={hidePopup}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Chat;

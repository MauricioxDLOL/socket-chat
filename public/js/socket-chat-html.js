
params = new URLSearchParams(window.location.search);

let nombre = params.get("nombre");
let sala = params.get("sala");

let divUsuarios = document.getElementById("divUsuarios");
let formEnviar = document.getElementById("formEnviar");
let txtMensaje = document.getElementById("txtMensaje");
let divChatbox = document.getElementById("divChatbox");

// Funciones para renderizar usuarios

function renderizarUsuarios(personas){ // [{},{},{}...]

    let html = ` <li>
                    <a href="javascript:void(0)" class="active"> Chat de <span> ${params.get("sala")}</span></a>
                </li>`
    
    for(let i = 0; i < personas.length; i++){

        html+= `<li>
                    <a id="${personas[i].id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${personas[i].nombre} <small class="text-success">online</small></span></a>
                </li>`

    }

    divUsuarios.innerHTML = html;

    //Id

}

function renderizarMensajes(mensaje,yo){

    let fecha = new Date(mensaje.fecha);

    let hora = fecha.getHours() + ":" + fecha.getMinutes();

    let html = document.createElement("li");

    let adminClass = "info";

    if(mensaje.nombre === "Administrador"){
        adminClass = "danger";
    }
    

    if(yo){

        html.classList.add("reverse");

        html.innerHTML= 
        `
        <li class="reverse">
            <div class="chat-content">
            <h5>${mensaje.mensaje}</h5>
            <div class="box bg-light-inverse">${mensaje.mensaje}</div>
            </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
            <div class="chat-time">${hora}</div>
            </li>
        `

    }else{

        html.classList.add("animated","fadeIn");

        if(mensaje.nombre !== "Administrador"){

            html.innerHTML = `<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>`
        }

        html.innerHTML = `

        <div class="chat-content">
        <h5>${mensaje.nombre}</h5>
        <div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>
        </div>
        <div class="chat-time">${hora}</div>
        `;

    }
  

    divChatbox.append(html)

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


divUsuarios.addEventListener("click", (e) => {

    let id = e.target.id;

    if(id !== ""){

        console.log(id);

    }

});

formEnviar.addEventListener("submit", (e) => {

    e.preventDefault();

    if(txtMensaje.value.trim().length === 0){
        return;
    }

    socket.emit('crearMensaje', {
       nombre: nombre,
        mensaje: txtMensaje.value
    }, function(mensaje) {
        txtMensaje.value = "";
        txtMensaje.focus();
        renderizarMensajes(mensaje,true);
        scrollBottom();
    });




})







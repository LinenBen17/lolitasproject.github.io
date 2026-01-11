// Variables de configuracion del bot de Telegram
const token = '8394572537:AAEVlV1GkO0_th_6wkJ7USq_jKhebg12pko';
const chatId = '-5203773176';

$(document).ready(function () {
    // Enviar mensaje a Telegram al cargar la pagina
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: 'Ingresó un nuevo visitante a la página de Lolita️ 🐾'
                + '\n\nInformación del dispositivo:'
                + `\nTipo: ${getDeviceInfo().tipo}`
                + `\nMarca: ${getDeviceInfo().marca}`
                + `\nModelo: ${getDeviceInfo().modelo}`
                + `\nSistema Operativo: ${getDeviceInfo().sistema} ${getDeviceInfo().versionSistema}`
                + `\nNavegador: ${getDeviceInfo().navegador} ${getDeviceInfo().versionNavegador}`
                + `\nResolución: ${getDeviceInfo().resolucion}`
                + `\nIdioma: ${getDeviceInfo().idioma}`
                + `\nZona Horaria: ${getDeviceInfo().zonaHoraria}`
        })
    })
        .then(res => res.json())
        .catch(console.error);

    // Verificar toque en la pancita
    document.getElementById('tummy').addEventListener('click', pressTummy);
});

// Funcion Cuadro de Dialogo solicitud de Nickname o Usuario
function notifyMe() {
    console.log(localStorage.getItem('firstKissUnlocked'));

    if (localStorage.getItem('firstKissUnlocked') === 'true') {
        Swal.fire({
            title: 'Ingresa tu Nickname, Usuario, Nombre o Correo',
            input: 'text',
            inputLabel: 'Déjame tu rastro🐾, te encontraré, lo prometo...',
            inputPlaceholder: 'Ej.:linen_ben, aaesquite, jmvo_',
        }).then((result) => {
            if (result.isConfirmed && result.value.trim() !== '') {
                const nickname = result.value;
                fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: `El visitante que desbloqueó el recuerdo dejó su rastro: ${nickname} 🐾`
                    })
                });
            } else {
                Swal.fire({
                    title: '¡Oh no! Parece que no ingresaste ningún rastro.',
                    text: 'Por favor, inténtalo de nuevo cuando estés listo para dejarme tu rastro.',
                    imageUrl: 'images/lolita-warning2.png',
                    imageWidth: 120,
                    imageHeight: 150,
                    confirmButtonText: 'Entendido',
                });
            }
        });
    } else {
        Swal.fire({
            title: '¡Aún no has desbloqueado el recuerdo que encontré excavando!🐾',
            text: '¡Resuelve el acertijo! Te doy una pista, amo que acaricien mi pancita',
            imageUrl: 'images/lolita-warning2.png',
            imageWidth: 120,
            imageHeight: 150,
            footer: 'Lee con atención...',
            confirmButtonText: 'Entendido',
        });
    }
}

// Funcion para obtener informacion del dispositivo
function getDeviceInfo() {
    const parser = new UAParser();
    const r = parser.getResult();

    return {
        tipo: r.device.type || 'desktop',
        marca: r.device.vendor || 'desconocida',
        modelo: r.device.model || 'desconocido',
        sistema: r.os.name || 'desconocido',
        versionSistema: r.os.version || '',
        navegador: r.browser.name || 'desconocido',
        versionNavegador: r.browser.version || '',
        resolucion: `${screen.width}x${screen.height}`,
        idioma: navigator.language || '',
        zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    };
}

// Funcion para contar presiones en la pancita
function pressTummy() {
    let tummyPressCount = localStorage.getItem('tummyPressCount') || 0;
    tummyPressCount++;
    localStorage.setItem('tummyPressCount', tummyPressCount);

    if (tummyPressCount >= 3) {
        localStorage.setItem('firstKissUnlocked', true);
        console.log(localStorage.getItem('firstKissUnlocked'));

        console.log(tummyPressCount);

        Swal.fire({
            title: '¡Gracias por acariciar mi pancita!',
            imageUrl: 'images/lolita-success.png',
            imageWidth: 120,
            imageHeight: 150,
            text: '¡Me has hecho muy feliz! 🐾💕',
            confirmButtonText: 'Acabas de desbloquear un recuerdo...',
        }).then(() => {
            Swal.fire({
                showCancelButton: true,
                imageUrl: "images/firstkiss.jpg",
                imageHeight: 'auto',
                imageAlt: "Primer Beso",
                confirmButtonText: 'Lo recuerdo...',
                cancelButtonText: 'No lo recuerdo :/',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: '¡Mi olfato no falla, sabía que lo recordarías! 🐾💕',
                        imageUrl: 'images/lolita-success.png',
                        imageWidth: 120,
                        imageHeight: 150,
                        imageAlt: 'Success Lolita Icon',
                        showConfirmButton: true,
                    }).then(() => {
                        notifyMe();
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        title: 'Está bien, quizás no eres a quien olfateé.',
                        html: 'Aunque hay lugares que aún se viven con mucha nostalgia, como la nostalgia de <b>un primer beso</b>... U otras cosas, ¿No lo crées?🐾',
                        imageUrl: 'images/lolita-warning.png',
                        imageWidth: 120,
                        imageHeight: 150,
                        imageAlt: 'Warning Lolita Icon',
                        showConfirmButton: true,
                    }).then(() => {
                        notifyMe();
                    });
                }
            });
            localStorage.setItem('tummyPressCount', 0); // Reset count after 3 presses
        });
    }
}
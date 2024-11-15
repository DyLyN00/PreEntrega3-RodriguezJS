 // Variables iniciales
 let usuario = {
    nombre: "",
    edad: 0,
    puntuacion: 0
};

const consejos = [
    "Nunca dejes de aprender.",
    "La práctica hace al maestro.",
    "Confía en ti mismo.",
    "La constancia es clave para el éxito."
];

// Recupera datos de LocalStorage si existen
if (localStorage.getItem("usuario")) {
    usuario = JSON.parse(localStorage.getItem("usuario"));
    mostrarOpciones();
    actualizarResultado("Bienvenido nuevamente, " + usuario.nombre);
}

// Función para guardar usuario en LocalStorage
function guardarUsuario() {
    localStorage.setItem("usuario", JSON.stringify(usuario));
}

// Muestra opciones de interacción
function mostrarOpciones() {
    document.getElementById("entradaUsuario").style.display = "none";
    document.getElementById("opciones").style.display = "block";
}

// Actualiza el mensaje en el resultado
function actualizarResultado(mensaje) {
    document.getElementById("resultado").innerText = mensaje;
}

// Evento para iniciar sesión
document.getElementById("iniciar").addEventListener("click", () => {
    const nombreInput = document.getElementById("nombre").value;
    const edadInput = parseInt(document.getElementById("edad").value);

    if (nombreInput && edadInput) {
        usuario.nombre = nombreInput;
        usuario.edad = edadInput;
        usuario.puntuacion = 0;

        guardarUsuario();
        mostrarOpciones();
        actualizarResultado("Bienvenido, " + usuario.nombre + "! Puedes comenzar a interactuar.");
    } else {
        actualizarResultado("Por favor, completa tu nombre y edad.");
    }
});

// Evento para jugar
document.getElementById("jugar").addEventListener("click", () => {
    const numeroAleatorio = Math.floor(Math.random() * 5) + 1;
    const intento = parseInt(prompt("Adivina el número entre 1 y 5"));

    if (intento === numeroAleatorio) {
        usuario.puntuacion += 10;
        guardarUsuario();
        actualizarResultado("¡Correcto! Has ganado 10 puntos. Tu puntuación es: " + usuario.puntuacion);
    } else {
        actualizarResultado("Incorrecto. El número era " + numeroAleatorio);
    }
});

// Evento para recibir un consejo
document.getElementById("consejo").addEventListener("click", () => {
    const consejoAleatorio = consejos[Math.floor(Math.random() * consejos.length)];
    actualizarResultado("Consejo del día: " + consejoAleatorio);
});

// Evento para ver la puntuación
document.getElementById("puntuacion").addEventListener("click", () => {
    actualizarResultado("Tu puntuación actual es: " + usuario.puntuacion);
});

// Evento para salir
document.getElementById("salir").addEventListener("click", () => {
    localStorage.removeItem("usuario"); // Borra los datos de LocalStorage
    usuario = { nombre: "", edad: 0, puntuacion: 0 }; // Reinicia el objeto usuario
    document.getElementById("entradaUsuario").style.display = "block";
    document.getElementById("opciones").style.display = "none";
    actualizarResultado("Has salido del simulador. ¡Hasta la próxima!");
});
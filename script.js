const contLetra = document.getElementById('contLetra'); 
const PalabrasUsadasElement = document.getElementById('PalabrasUsadas');
const inicio = document.getElementById('botonInicio');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width  = 0;
ctx.canvas.height = 0;

const ahorcado = [//Un array para ir dibujando las partes del cuerpo "ahorcado"
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
];

let palabraAdiv;
let PalabrasUsadas; 
let LetrasIncorrectas;
let LetrasCorrectas;

const agregarLetra = letter => {
    const letraAnalizar = document.createElement('span');
    letraAnalizar.innerHTML = letter.toUpperCase();
    PalabrasUsadasElement.appendChild(letraAnalizar);
}

const agregarAhorcado = bodyPart => {
    ctx.fillStyle = '#f30798';
    ctx.fillRect(...bodyPart);
};

const IngresoIncorrecto = () => {
    agregarAhorcado(ahorcado[LetrasIncorrectas]);
    LetrasIncorrectas++;
    if(LetrasIncorrectas === 5) FinDeJuego();
}

const FinDeJuego = () => {
    document.removeEventListener('keydown', letterEvent);
    inicio.style.display = 'block';
}

const IngresoCorrecto = letter => {
    const { children } =  contLetra;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            LetrasCorrectas++;
        }
    }
    if(LetrasCorrectas === palabraAdiv.length){ FinDeJuego();} 
}

const letterInput = letter => {//
    if(palabraAdiv.includes(letter)) {
        IngresoCorrecto(letter);
    } else {
        IngresoIncorrecto();
    }
    agregarLetra(letter);
    PalabrasUsadas.push(letter);
};

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if(newLetter.match(/^[a-zñ]$/i) && !PalabrasUsadas.includes(newLetter)) {
        letterInput(newLetter);
    };
};

const drawWord = () => {
    palabraAdiv.forEach(letter => { 
        const letraAnalizar = document.createElement('span');
        letraAnalizar.innerHTML = letter.toUpperCase(); 
        letraAnalizar.classList.add('letter'); 
        letraAnalizar.classList.add('hidden');
        contLetra.appendChild(letraAnalizar);
    });
};

const selectRandomWord = () => {
    let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
    palabraAdiv = word.split('');
};

const drawHangMan = () => { //Dibujar al ahorcado
    ctx.canvas.width  = 120;
    ctx.canvas.height = 160;
    ctx.scale(20, 20);
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Borrar todo lo que haya
    ctx.fillStyle = '#f00410'; 
    ctx.fillRect(0, 7, 4, 1); 
    ctx.fillRect(1, 0, 1, 8);
    ctx.fillRect(2, 0, 3, 1);
    ctx.fillRect(4, 1, 1, 1);
};

const InicioDeJuego = () => {//Para empezar el juego: Limpiamos todas las variables del juego
    PalabrasUsadas = [];
    LetrasIncorrectas = 0;
    LetrasCorrectas = 0;
    contLetra.innerHTML = '';
    PalabrasUsadasElement.innerHTML = '';
    inicio.style.display = 'none'; 
    drawHangMan(); 
    selectRandomWord();
    drawWord();
    document.addEventListener('keydown', letterEvent);
};

inicio.addEventListener('click', InicioDeJuego);
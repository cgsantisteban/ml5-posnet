let video;
let poseNet;

//En este array guardamos las coordenadas de las poses detectadas
let poses = [];

// Variables para guardar el selector
let narizsel;

//Variable para guardar el tipo de nariz
let nariztipo = 'narizuno';

function setup() {
  
  //Creeamos el canvas
  createCanvas(640, 480);
  
  //Capturamos el vídeo
  video = createCapture(VIDEO);
  video.size(width, height);

  // Cargamos el modelo para detectar las posiciones del cuerpo
  poseNet = ml5.poseNet(video, modelReady);
  
   
  //Guardamos las posiciones detectadas en poses
  poseNet.on('pose', function(results) {
    poses = results;
  });
  
  // Ocultamos el vídeo
  video.hide();
  
   
  // Guardamos en la variable narizsel el selector de tipo de nariz 
  // que hemos creado en index.html
  narizsel = select('#narizselector');
  
  // Detectamos cuando cambiamos la selección
  // y ejecutamos la función seleccionaNariz
  narizsel.changed(seleccionaNariz);
  
}

//Función que se ejecuta cuando el modelo se ha cargado
function modelReady() {
  select('#status').html('Modelo cargado');
}

//Función que se ejecuta cuando pulsamos con el ratón
//Muestra el contenido del array poses
function mousePressed(){
  console.log(poses)
}

// Esta función detecta la opción seleccionada
// y la guarda en la variable ojostipo
function seleccionaNariz(){
  nariztipo = narizsel.value();
  console.log('selected item',nariztipo);
}

function draw() {
  image(video, 0, 0, width, height);
    
  // Si se ha detectado una pose
  if (poses.length > 0) {
    let pose = poses[0].pose;

    // Detectamos la nariz   
    let posicionnariz = pose['nose'];
        
    // Si hemos seleccionado la opción uno
    // dibuja una elipse de color rojo en la nariz
    if(nariztipo == 'narizuno'){
      fill('red');
      ellipse(posicionnariz.x, posicionnariz.y, 20, 20);
      
    }
        
    // Si hemos seleccionado la opción dos
    // dibuja una elipse de color verde en la nariz  
    if(nariztipo == 'narizdos'){
      fill('green');
      ellipse(posicionnariz.x, posicionnariz.y, 20, 20);
    }
        
  }
}

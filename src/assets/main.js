 
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UClTDogLGNB4vl9b9mGe0XRA&part=snippet%2Cid&order=date&maxResults=9';

const content = null || document.getElementById("content");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ad7a91f056msh822c24dacc24e19p1db115jsn300ea3dba259',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};
//Lógica de async: ir por los datos, luego esperar por ellos 
//y finalmente retornarlos hacia el usuario
async function fetchData(urlApi){
//siempre async antes de function    
    const response = await fetch(urlApi, options);
    //hacemos uso del fetch() y 
    //solo por esta vez le pasamos la opciones 
    const data = await response.json();
    //estructura de los datos transformandolos en json
    return data;
    //retorna la información de la API que estamos solicitando
}

//Ahora vamos usar un nuevo concepto: una función que se invoca 
//a sí misma; con JavaScript podemos tener funciones anónimas que
// permitan llamarse automáticamente, la estructura cuenta con 
//la palabra reservada **async **y con funciones arrows:

(async ()=> {
    //Dentro implementamos la lógica necesaria para hacer el 
    //llamado a la API, obtener los elementos y mostrarlos en html
    //Se implementa try y catch
     try {
        const videos = await fetchData(API);
        let view = `${videos.items.map(video => `
            <div class="pariente del grupo">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                        <span aria-hidden="true" class="absolute inset-0"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
        `).slice(0,4).join("")} 
        
        `;//slice para mostrar 4 videos, join para unirlos
        content.innerHTML = view;
        //innerHTML es igual a la vista que se ha creado e itera 
        //con el metodo map y devuelve un nuevo arreglo con los 
        //elementos que queremos obtener como el título, 
        //la descripción, la imagen miniatura de la API
     
    } catch (error) {
        console.log(error);//muestra el error en consola
        
     }
})(); //<= hace que se invoca a si misma

//Dentro de try{} estará el llamado de la API y el template
// de html para interpretar los datos a iterar por cada objeto,
// en este caso, cuando analizamos la salida de la API en rapidapi,
// hay una jerarquía de los datos, están los 9 “items” del 0 al 8
// para la posición de cada vídeo, luego el “snippet” de cada 
//item, luego “thumbnails” y éste a su vez los tamaños de la imagen
// (nos interesa con la más alta resolución “high”), también 
//nos interesa mostrar la descripción “description” y 
//nombre “title” de cada víde
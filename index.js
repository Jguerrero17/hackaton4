//Ejercicio #0
//¿Volver a resolver una promesa?
//¿Cuál es el resultado del siguiente código?
//let promise = new Promise(
    //function(resolve, reject) {
        //resolve(1);
        //setTimeout(() => resolve(2), 1000);
    //});
//promise.then(alert);


El segundo resolve es ignorado porque solo se ejecuta el primer resolve y el resto de llamadas se ignoran


//Ejercicio #1
//Retrasar con una promesa
//La función incorporada setTimeout usa devoluciones de llamada.
//Crea una alternativa basada en promesas. La función delay (ms) debería devolver una promesa.
//Esa promesa debería resolverse después de ms milisegundos, de modo que podamos agregarle.
//Then, así:
//function delay(ms) { // your code}
//delay(3000).then(() => alert('runs after 3 seconds'));


    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


//Ejercicio #2
//Promesa: luego vs atrapar
//¿Son estos fragmentos de código iguales? En otras palabras, ¿se comportan de la misma manera
//en cualquier circunstancia, para cualquier función de controlador?
//promise.then(f1).catch(f2);
//Versus:
//promise.then(f1, f2);


No se comportan de la misma manera porque si hay un error solo se manejaría en el primer ejemplo por el .catch y en el 
segundo no ya que solo tiene el .then y no habría como pasar estos errores.

//Ejercicio #3
//Reescribir usando async / await
//Reescriba este código de ejemplo del capítulo Encadenamiento de promesas usando async /
//await en lugar de .then / catch:
//function loadJson(url) {
//return fetch(url)
    // .then(response => {
//if (response.status == 200) {
//return response.json();
//} else {
//throw new Error(response.status);
//}
//});
//}
//loadJson('no-such-user.json') .catch(alert); // Error: 404


async function loadJson(url) { // (1)
    let response = await fetch(url); // (2)
  
    if (response.status == 200) {
      let json = await response.json(); // (3)
      return json;
    }
  
    throw new Error(response.status);
  }
  
  loadJson('no-such-user.json')
    .catch(alert); // Error: 404 (4)



//Ejercicio #4
//Reescribe "rethrow" con async / await
//A continuación puede encontrar el ejemplo de "relanzamiento". Vuelva a escribirlo usando
//async / await en lugar de .then / catch.
//Y deshacerse de la recursividad a favor de un bucle en demoGithubUser: con async / await que
//se vuelve fácil de hacer.

//class HttpError extends Error {

    //constructor(response) {

        //super(`${response.status} for ${response.url}`);

        //this.name = 'HttpError';

        //this.response = response;

    //}

//}



//function loadJson(url) {

    //return fetch(url)

        //.then(response => { 

            //if (response.status == 200) {

                //return response.json();

            //} else {

                //throw new HttpError(response); 

            //}

    //});

//}

    

// Ask for a user name until github returns a valid userfunction }}

//function demoGithubUser(){ 

    //let name = prompt("Enter a name?", "iliakan"); 

    //return loadJson(`https://api.github.com/users/${name}`) 

        //.then(user => { 

            //console(`Full name: ${user.name}.`); 

            //return user; })

        //.catch(err => { 

            //if (

            //err instanceof HttpError && 

            //err.response.status == 404

            //) {

                //alert("No such user, please reenter.");

                //return demoGithubUser(); 

            //} else { 

                //throw err; 

            //}

        //});

//}

    

//demoGithubUser();



class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }

  
  async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  }
  

  async function demoGithubUser() {
  
    let user;
    while(true) {
      let name = prompt("Ingrese un nombre:", "iliakan");
  
      try {
        user = await loadJson(`https://api.github.com/users/${name}`);
        break; 
      } catch(err) {
        if (err instanceof HttpError && err.response.status == 404) {
          
          alert("No existe tal usuario, por favor reingrese.");
        } else {
          
          throw err;
        }
      }
    }
  
  
    alert(`Nombre completo: ${user.name}.`);
    return user;
  }
  
  demoGithubUser();






//Ejercicio #5
//Llamar a async desde no async
//We have a “regular” function called f. How can you call the async function wait() and use its
//result inside of f?
//async function wait() {
    //await new Promise(resolve => setTimeout(resolve, 1000)); return 10;
//}function f() {
        // ... ¿qué deberías escribir aquí? // necesitamos llamar async wait () y esperar para
        //obtener 10 // recuerda, no podemos usar "await"
//}
//PD La tarea es técnicamente muy simple, pero la pregunta es bastante común para los
//desarrolladores nuevos en async / await.



function f() {
    wait().then(result => alert(result));
  }
  
  f();



//Ejercicio #6
//Error en setTimeout
//¿Qué piensas? ¿Se activará el .catch? Explica tu respuesta.
//new Promise(function(resolve, reject) {
    //setTimeout(() => {
        //throw new Error("Whoops!");
    //}, 1000);
//}).catch(alert);


No se activará por que el .catch al final de la cadena se comporta como un  try...catch y hace que se manejen todos los errores 
sincrónicos pero en este caso el error se maneja fuera de la ejecución y la promesa no se puede cumplir.



//Ejercicio #7
//Salida cada segundo
//Escriba una función printNumbers (from, to) que genere un número cada segundo, comenzando
//desde y terminando con hasta.
//Haz dos variantes de la solución.
    //1. Utilizando setInterval.
    //2. Usando setTimeout anidado.



    1. con setInterval

      function printNumbers(from, to) {
        let act = from;
      
        let id = setInterval(function() {
          alert(act);
          if (act == to) {
            clearInterval(id);
          }
          act++;
        }, 1000);
      }
      
      printNumbers(10, 20);


    2. con setTimeout anidado

    function printNumbers(from, to) {
        let act = from;
      
        setTimeout(function go() {
          alert(act);
          if (act < to) {
            setTimeout(go, 1000);
          }
          act++;
        }, 1000);
      }

      printNumbers(10, 20);

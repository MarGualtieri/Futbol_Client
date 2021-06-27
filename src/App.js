import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';

import { Card } from 'react-bootstrap';
import swal from 'sweetalert';

const Lista = (event) => {

 

function validate(event){
  
 
  if (event.target.value.length>=11) {
    setText(event.target.value.slice(0,-1))
    
  }else{

    setText(event.target.value)
  }
  
  
 
  if (text.length >=5) {
  
    // swal({
    //   title: "Ingresa un nombre Valido",
    //   text: "maximo 10 caracteres",
    //   icon: "error",
    //   button: "Aceptar",


    // })

    
    
  }
}
  
  async function agregarse() {


    if (text.length >= 11 ) {


      swal({
        title: "Ingresa un nombre Valido",
        text: "maximo 10 caracteres",
        icon: "error",
        button: "Aceptar",


      })

    }

    if ( text.length <= 10 && text.length >= 1 ) {

  
      swal({
        title: `¡Hola ${text}!`,
        text: "Agregado exitosamente",
        icon: "success",
        button: "Aceptar",

      })


      let nuevo = {
        nombre: text,
        goles: 0,
        jugados:0,
        ganados: 0,
        empatados: 0,
        perdidos: 0,
        prom: 0.0
      }

      await fetch('https://protected-hamlet-17873.herokuapp.com/users', {
        method: 'PUT',

        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(nuevo)
      })
        .then(res => res.json())
        .then(res => {
          setText("")
          fetch('https://protected-hamlet-17873.herokuapp.com/users')
            .then(res => res.json())
            .then(res =>
             
              name(res)
            ,
        
              )
            .catch(err => console.error(err));
        });
        
      }
      
    
  
    if ( text === "") {

      swal({
        title: "Ingresa un nombre Valido",
        text: "su nombre no puede estar vacio",
        icon: "error",
        // warning , info,  error
        button: "Aceptar",


      })

    }
   
  }
  // guardo el estado list de valor inicial la lista que tengo
  const [list, setList] = useState([])
  const [text, setText] = useState('');
  
  
  useEffect(() => {

    
    
    fetch('https://protected-hamlet-17873.herokuapp.com/users')
      .then(res => res.json())
     
      .then(res => 
        
        
        name(res)
      
      )
      .catch(err => console.error(err));

      
  }, []);



  
  function name(response) {


    response.map((item, key) => (
     
            item.jugados===0 ? 

            item.prom = (
              (item.ganados * 2 + item.perdidos * 1 + item.empatados * 1.5 + (0.5*0)) 
            ).toFixed(1)
            :
            item.prom = (
              (item.ganados * 2 + item.perdidos * 1 + item.empatados * 1.5 + item.goles*0.2) /
              item.jugados  + ( item.jugados*0.1)
            ).toFixed(1)
 
    ))

    {/*-----------------doble iterador---------------*/}
    
      let newSortedList = [...response].sort((a, b) =>
        a.prom < b.prom ? 1 : a.prom > b.prom ? -1 : 0
      );

      if (newSortedList[0] === response[0])
        newSortedList = [...response].sort((b, a) =>
          a.prom > b.prom ? 1 : a.prom < b.prom ? -1 : 0
        );
        
      setList(newSortedList);
    
  }
 
  return (

    <div className="container">
      {/* Aquí pongo el botón para reordenar la lista */}

      <div className="titulo">
        <h4>FUTBOL PARQUE NORTE</h4>

      </div>

      <li className="listado">
        <button
          className="button"
          onClick={() => {
            let newSortedList = [...list].sort((a, b) =>
              a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0
            );
            // si la lista después de ordenarla tiene el mismo primer elemento, lo repito a la inversa
            // (claro que esto es ineficiente, lo suyo sería habilitar otro estado para guardar el tipo de ordenamiento que hemos hecho)
            if (newSortedList[0] === list[0])
              newSortedList = [...list].sort((b, a) =>
                a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0
              );
            setList(newSortedList);
          }}
        >
          Jugadores
        </button>

        <button
          className="button"
          onClick={() => {
            let newSortedList = [...list].sort((a, b) =>
              a.ganados < b.ganados ? 1 : a.ganados > b.ganados ? -1 : 0
            );

            if (newSortedList[0] === list[0])
              newSortedList = [...list].sort((b, a) =>
                a.ganados < b.ganados ? 1 : a.ganados > b.ganados ? -1 : 0
              );
            setList(newSortedList);
          }}
        >
          G
        </button>
        <button
          className="button"
          onClick={() => {
            let newSortedList = [...list].sort((a, b) =>
              a.empatados < b.empatados ? 1 : a.empatados > b.empatados ? -1 : 0
            );

            if (newSortedList[0] === list[0])
              newSortedList = [...list].sort((b, a) =>
                a.empatados < b.empatados ? 1 : a.empatados > b.empatados ? -1 : 0
              );
            setList(newSortedList);
          }}
        >
          E
        </button>

        <button
          className="button"
          onClick={() => {
            let newSortedList = [...list].sort((a, b) =>
              a.perdidos < b.perdidos ? 1 : a.perdidos > b.perdidos ? -1 : 0
            );

            if (newSortedList[0] === list[0])
              newSortedList = [...list].sort((b, a) =>
                a.perdidos < b.perdidos ? 1 : a.perdidos > b.perdidos ? -1 : 0
              );
            setList(newSortedList);
          }}
        >
          P
        </button>

        <button
          className="button"
          onClick={() => {
            let newSortedList = [...list].sort((a, b) =>
              a.goles < b.goles ? 1 : a.goles > b.goles ? -1 : 0
            );

            if (newSortedList[0] === list[0])
              newSortedList = [...list].sort((b, a) =>
                a.goles < b.goles ? 1 : a.goles > b.goles ? -1 : 0
              );
            setList(newSortedList);
          }}
        >
          Gol
        </button>
        <button
          className="button"
          onClick={() => {
            let newSortedList = [...list].sort((a, b) =>
              a.prom < b.prom ? 1 : a.prom > b.prom ? -1 : 0
            );

            if (newSortedList[0] === list[0])
              newSortedList = [...list].sort((b, a) =>
                a.prom < b.prom ? 1 : a.prom > b.prom ? -1 : 0
              );
            setList(newSortedList);
          }}
        >
          Pun
        </button>
      </li>

      {/* Y aquí la lista, cada vez que el estado cambie este componente se va a repintar y a actualizar la vista */}

      {list.map((item, key) => (
        <li className="grid-container" key={key}>
        
          <span className="label">{item.nombre}</span>
          <span className="label">{item.ganados}</span>
          <span className="label">{item.empatados}</span>
          <span className="label">{item.perdidos}</span>
          <span className="label">{item.goles}</span>
          <span className="label">
            {
              item.jugados===0 ? 
              
              // expected output: 2

              item.prom = (
                (item.ganados * 2 + item.perdidos * 1 + item.empatados * 1.5 + (0.5*0)) 
              ).toFixed(1)
              :
              item.prom = (
                (item.ganados * 2 + item.perdidos * 1 + item.empatados * 1.5 + item.goles*0.2) /
                item.jugados + ( item.jugados*0.1)
              ).toFixed(1)
   
              }

          </span>
        </li>

        
      ))}
 
<div id="tituloFooter">
        <span id="h5footer">Ultima Actualización  26/06/2021</span>

      </div>

     {/*-----------------AGREGARSE BOTON---------------*/}

        <div className="add">

<div style={{color:"red",fontSize:"12px", textAlign:"center"}}>máximo 10 caracteres</div>
          <div className="add1">
            <input id="ing"
              type="text"  maxLength="10" value= {text} placeholder="Ingrese su nombre"  onChange={validate}
            />
          </div>


          <div className="add2">
            <button id="button"
              onClick={agregarse} type="button" class="btn btn-danger">
              Agregarse
            </button>
           
          </div>

        </div>


      <div className="foot">
      



   


        {/*-----------------CACLULAR PUNTAJE INICIO---------------*/}
        <div className="buttonFoot">

          <button
            type="button"
            class="btn btn-secondary"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >
            ¿Como se calcula el puntaje?
          </button>

          {/* modal reglas...... */}

          <div
            className="modal fade"
            id="exampleModalLong"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    REGLAS DEL PUNTAJE
                  </h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
               
                <p className="parrafo">&#128309; Ganado = 2 puntos</p>
                <p className="parrafo">&#128310; Empatado = 1.5 puntos</p>
                <p className="parrafo">&#128308; Perdido = 1 punto</p>
                <p className="parrafo">⚽ Goles = 0.2 puntos</p>
                <p className="parrafo">&#127942; Bonus = 0.2 x partido jugado</p>
               Los puntos se promedian con la cantidad de partidos jugados
               <p className="parrafo">----------------------------------------</p>
               <p className="parrafo"> &#128219; PENALIZACIONES &#128219;</p>
               &#128553; los jugadores que falten sin aviso perderan todos los puntos de la tabla 
               
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>

          </div>


          
          {/* --------------------------- */}
          <div className="buttonFoot">
          <a
            className="btn btn-info"
            href="https://www.google.com/maps/dir/?api=1&destination=parque+norte&travelmode=bicycling"
          >
            Como llegar
          </a>
          {/* https://goo.gl/maps/P3QvNVVZyuEMoSvB6 */}
          <a href="https://chat.whatsapp.com/DVP4DON0B8hAQZYpfcCy1r" class="btn btn-success">
            {" "}
            Whats app
          </a>

        </div>

      {/*-----------------noticias---------------*/}

<div id="bloque">
        
        <div id="news">
        <h5 id="h5">
        📝 Sección de noticias
        </h5>
        </div>
        <div id="card">
        <Card style={{ width: '18rem' }}>
        {/* <div>
                <img src="https://blog.uptodown.com/wp-content/uploads/dream-league-2019-feat.jpg" alt="display image" />
            </div> */}
  <Card.Img variant="top" src="https://parquenorte.com/wp-content/uploads/2020/10/G0242932-1.jpg" />
  
  <Card.Body>
    <Card.Title>Vuelve el Futbol !</Card.Title>
    <Card.Text>
      Agosto! podria ser el mes para iniciar la actividad
    </Card.Text>
    {/* <Button variant="primary"></Button> */}
  </Card.Body>
</Card>
</div>
</div>
 
      </div>
    </div>
  
  );
}

export default Lista
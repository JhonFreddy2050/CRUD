//import React, { useEffect,useState} from 'react'
import React, { useState,useEffect } from 'react'

import Swal from 'sweetalert2'
import Axios from 'axios'
export default function RegistrarPersona() {
  const [nombres,setNombres]=useState('')
  const[apellidos,setApellidos]=useState('')
  const[estadoVacuna,setEstadoVacuna]=useState([])
  const[estadoVacunaSelect,setEstadoVacunaSelect]=useState([])
  const[dosisAplicadas,setDosisAplicadas]=useState([])
  const[dosisAplicadasSelect,setDosisAplicadasSelect]=useState([])


  useEffect(()=>{
    setEstadoVacuna(['No vacunado','Vacunado','Primera dosis'])
    setEstadoVacunaSelect('No vacunado')

    setDosisAplicadas(['Ninguna','Primera dosis','Segunda dosis','Esquema completo'])
    setDosisAplicadasSelect('Ninguna')

  },[])


  const guardar = async(e)=>{
    e.preventDefault()
    const usuario= {
      nombres,
      apellidos,
      estadoVacuna:estadoVacunaSelect,
      dosisAplicadas:dosisAplicadasSelect,
      ciudad: sessionStorage.getItem('idUsuario'),
      ciudadNombre :sessionStorage.getItem('nombre')

    }

    if(nombres===""){

      Swal.fire({
        icon:'error',
        title:"Debe escribir un nombre",
        showConfirmButton:false,
        timer:1500
      })

    }


    else if(apellidos===""){

      Swal.fire({
        icon:'error',
        title:"Debe escribir un apellido",
        showConfirmButton:false,
        timer:1500
      })

    }


    else {

      const token = sessionStorage.getItem('token')
      const respuesta = await Axios.post('/persona/crear',usuario,{

       headers:{'autorizacion':token}


      })
      const mensaje= respuesta.data.mensaje
      console.log(mensaje)


      Swal.fire({
        icon:'success',
        title:mensaje,
        showConfirmButton:false,
        timer:1500
      })

      e.target.reset();
      setNombres("");
      setApellidos("");





    }
  }


  return (

  

<div className="container mt-4">
        <div className="row">
          <div className="col-md-7  mx-auto">
            <div className="card">
              <div className="container text-center fa-5x">
                <i className="fas fa-user-plus"></i>
              </div>
              <div className="card-header bg-info text-center">
                <h4>Registrar paciente</h4>
              </div>
              <div className="card-body">
                <form onSubmit={guardar}>
                  <div className="row">

                    <div className="col-md-6">
                      <label>Nombres</label>
                      <input type="text" className="form-control required" onChange={(e)=>setNombres(e.target.value)} />
                    </div>

                    <div className="col-md-6">
                      <label>Apellidos</label>
                      <input type="text" className="form-control required" onChange={(e)=>setApellidos(e.target.value)} />
                    </div>


                    {/* <div className="col-md-6">
                      <label>Cedula</label>
                      <input type="text" className="form-control required" />
                    </div> */}


                    {/* <div className="col-md-6">
                      <label>Telefono</label>
                      <input type="text" className="form-control required" />
                    </div> */}

                    <div className="col-md-6">
                      <label>Dosis aplicadas</label>

                      <select className='form-control' onChange={(e) => setDosisAplicadasSelect(e.target.value)}>

                        {
                            dosisAplicadas.map(dosisAplicada => (
                                <option key={dosisAplicada}>
                                    {dosisAplicada}

                                </option>
                            ))


                        }
                        </select>
                    </div>


                    <div className="col-md-6">
                      <label>Estado de vacuna</label>
                      <select className='form-control' onChange={(e) => setEstadoVacunaSelect(e.target.value)}>

                          {
                              estadoVacuna.map(estadoVacunas => (
                                  <option key={estadoVacunas}>
                                      {estadoVacunas}

                                  </option>
                              ))


                          }
                          </select>
                    </div>


                  </div>
                    <br />
                  <button type="submit" class="btn btn-outline-info">
                      
                    <span class="fa fa-save"></span> Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

    
    
      
   
  );
}

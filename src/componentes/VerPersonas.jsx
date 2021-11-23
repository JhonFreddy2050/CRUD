import MaterialTable from 'material-table'
import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2'
import Axios from 'axios'
import { Modal,Button } from 'react-bootstrap';

function BasicSearch() {

  const [personas,setPersonas]=useState([])
  const [idPersona,setIdPersona]=useState('')
  const [nombres,setNombres]=useState('')
  const[apellidos,setApellidos]=useState('')
  const[estadoVacuna,setEstadoVacuna]=useState([])
  const[estadoVacunaSelect,setEstadoVacunaSelect]=useState([])
  const[dosisAplicadas,setDosisAplicadas]=useState([])
  const[dosisAplicadasSelect,setDosisAplicadasSelect]=useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(()=>{
    obtenerPersonas()

    setEstadoVacuna(['No vacunado','Vacunado','Primera dosis'])
   

    setDosisAplicadas(['Ninguna','Primera dosis','Segunda dosis','Esquema completo'])
    


 

  },[])


  const obtenerPersonas = async()=>{

    const id = sessionStorage.getItem('idUsuario')
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.get('/persona/listarPersonasCiudad/'+id,{
      headers:{'autorizacion':token}
    })

    console.log(respuesta)
    setPersonas(respuesta.data)
      

  }

  const obtenerPersona= async(idParametro)=>{
    
    setShow(true)
    const id = idParametro
    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.get('/persona/listar/'+id,{
      headers:{'autorizacion':token}
    })

    console.log(respuesta.data)
    setIdPersona(respuesta.data._id)
    setNombres(respuesta.data.nombres)
    setApellidos(respuesta.data.apellidos)
    setEstadoVacunaSelect(respuesta.data.estadoVacuna)
    setDosisAplicadasSelect(respuesta.data.dosisAplicadas)
    

  }


  const actualizar= async (e)=>{

    e.preventDefault();
    const id = idPersona
    const token = sessionStorage.getItem('token')
    const persona ={

      nombres,
      apellidos,
      estadoVacuna:estadoVacunaSelect,
      dosisAplicadas: dosisAplicadasSelect


    }

    const respuesta = await Axios.put('/persona/actualizar/'+id,persona,{
      headers:{'autorizacion':token}

    })
    const mensaje = respuesta.data.mensaje
    obtenerPersonas()

    Swal.fire({
      icon:'success',
      title:mensaje,
      showConfirmButton:false,
      timer:1500
    })

    setShow(false)
  }


  const eliminar = async (id)=>{


    const token = sessionStorage.getItem('token')
    const respuesta = await Axios.delete('/persona/eliminar/'+id,{
      headers:{'autorizacion':token}

    })
    const mensaje = respuesta.data.mensaje
    Swal.fire({
      icon:'success',
      title:mensaje,
      showConfirmButton:false,
      timer:1500
    })
   
    obtenerPersonas()


  }





  const data =
  personas.map((persona)=>({
    id:persona._id,
    nombres:persona.nombres,
    apellidos:persona.apellidos,
    dosisAplicadas:persona.dosisAplicadas,
    estadoVacuna:persona.estadoVacuna

  }))



    return (
        <div className="container">
           <br />
      <MaterialTable
        title="Mi tabla"
        columns={[
    
          { title: 'ID', field: 'id' },
          { title: 'NOMBRES', field: 'nombres' },
          { title: 'APELLIDOS', field: 'apellidos' },
          { title: 'DOSIS APLICADAS', field: 'dosisAplicadas' },
          { title: 'ESTADO DE VACUNA', field: 'estadoVacuna' },
         
       
        ]}
        data={data}       
        options={{
          search: true,
          actionsColumnIndex:-1,
          initialPage:1
         
        }}

        actions={[
          {
            icon:'delete',
            tooltip:'Eliminar',
            onClick:(event,rowData)=>eliminar(rowData.id)

          },

          {
            icon:'edit',
            tooltip:'editar',
            onClick:(event,rowData)=>obtenerPersona(rowData.id)
         


          }
                ]}
      />

        <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Editar persona</Modal.Title>
                </Modal.Header>
                <Modal.Body>

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
                <form onSubmit={'guardar'}>
                  <div className="row">

                    <div className="col-md-6">
                      <label>Nombres</label>
                      <input type="text" className="form-control required" onChange={(e)=>setNombres(e.target.value)} value={nombres} />
                    </div>

                    <div className="col-md-6">
                      <label>Apellidos</label>
                      <input type="text" className="form-control required" onChange={(e)=>setApellidos(e.target.value)} value={apellidos}/>
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

                      <select className='form-control' onChange={(e) => setDosisAplicadasSelect(e.target.value)} value={dosisAplicadasSelect}>

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
                      <select className='form-control' onChange={(e) => setEstadoVacunaSelect(e.target.value)} value={estadoVacunaSelect}>

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
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={actualizar}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>          

      </div>
    )
  }
  export default BasicSearch

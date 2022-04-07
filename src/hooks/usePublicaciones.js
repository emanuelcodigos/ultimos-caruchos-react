import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';

import { firebaseContext } from '../firebase/index';
import { useForm } from './useForm';



export const ContenedorHeader = styled.div`
     background-color: var(--violetaprincipal);
     border-radius: 0 0 10px 10px;
     margin: auto;
     padding-bottom: 1rem;
     text-align: center;

     h1{
         font-size: 3rem;
         font-weight: 900;
         text-transform: uppercase;
         color: var(--blanco);
         margin: 0 auto 1.5rem auto;
     }

     div{
         margin: auto;
         width: 90%;
         max-width: 500px;
         background-color: var(--violetaprincipaldark);
         border-radius: 8px;
         display:flex;
         justify-content: space-around;
         
         button{
             margin: 10px;
             width: 50%;
             border-style: none;
             border-radius: 8px;
             padding: 1rem;
             font-size: 1.5rem;
             font-weight: 700;
             color: var(--blanco);
             background-color: var(--violetaprincipal);
         }
     }

`;
export const BotonCrear = styled.div`

   position:fixed;
   z-index: 99;
   bottom: 20px;
   right: 15px;
   width: 70px;
   height: 70px;
   border-radius: 100%;
   background-color: var(--violetaprincipal);
   display: flex;
   justify-content: center;
   align-items: center;
   cursor:pointer;
`;
export const BotonCargarMas = styled.button`
   display: block;
   margin: 1rem auto;
   width: 90%;
   padding: 1rem;
   background-color: var(--violetaoscuro);
   color: var(--blanco);
   font-size: 2rem;
   font-weight: 700;
   border-style: none;
   border-radius: 8px;
`;

const BackgroundModal = styled.div`
   position: fixed;
   top: 0; bottom: 0; left:0; right: 0;
   margin:auto;
   z-index: 999;
   width: 100vw;
   height: 100vh;
   background-color: rgba(0, 0,0, .7);
   display: flex;
   justify-content: center;
`;
const Modal = styled.div`
   margin: auto;
   width: 90%;
   max-width: 500px;
   heigth: 70%;
   background-color: var(--blanco);
   border-radius: 8px;
   padding: 1rem;

   h1{
       margin: 1rem;
       padding:1rem;
       color: var(--violetaoscuro);
   }
`;

const Formulario = styled.form`
   width: 95%;
   margin:auto;
   margin-top: 3rem;
   display:flex;
   flex-direction: column;
   justify-content: center;

   span{
       margin: .5rem;
       margin-left: .5rem;
       display:block;
       font-size: 1.6rem;
       font-weight: 700;
       color: var(--violetaoscuro); 
   }
   input{
       padding: 1rem;
       width:100%;
       border-style: none;
       border-radius: 8px;
       border: 1px solid var(--gris3);
       margin-bottom: 1rem;
   }
   select{
    padding: 1rem;
    width:100%;
    border-style: none;
    border-radius: 8px;
    border: 1px solid var(--gris3);
    margin-bottom: 1rem;
   }
   textarea{
       padding: 1rem;
       width: 100%;
       min-height: 200px;
       border-radius: 8px;
       border: 1px solid var(--gris3);
       margin-bottom: 1rem;
   }
`;

const BotonesModal = styled.div`
    display: flex;
    flex-align: center;
    justify-content: space-between;
    button{
        padding: 1rem;
        margin: center;
        width: 45%;
        font-size: 2rem;
        font-weight: 700;
        border-style:none;
        border-radius: 8px;
        color: var(--blanco);
        background-color: var(--violetaoscuro);
    }
    div{
        padding: 1rem;
        margin: center;
        width: 45%;
        font-size: 2rem;
        font-weight: 700;
        border-style:none;
        border-radius: 8px;
        color: var(--blanco);
        background-color: var(--violetaoscuro);
        text-align: center;
        cursor: pointer;
    }
`;

export const ModalCrear = ({ handleOcualtar, titulo, aceptaCategoria }) => {

    const { firebase, usuario } = useContext(firebaseContext);
    const [formValues, handleInputChange, reset] = useForm({ nombre: '', descripcion: '', categoria: '' });
    const { nombre, descripcion, categoria } = formValues;
    const [stateAceptaCategorias, setStateAceptaCategorias] = useState(false);
    const [archivoState, setarchivoState] = useState(null);


    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setarchivoState({
                path: `publicaciones/${e.target.files[0].name}`,
                file: e.target.files[0]
            });
        }
    }

    const crearPublicacion = async (uid, nombreUser) => {

        let numeroPublic = null;
        if (stateAceptaCategorias) {
            numeroPublic = await firebase.getNumeroDePublicion('cosas_que_no_sabias');
        } else {
            numeroPublic = await firebase.getNumeroDePublicion('invitados');
        }

        let data = {
            arrayLikes: [],
            descripcion,
            nombre,
            likes: 0,
            usuario: {
                uid,
                nombre: nombreUser
            },
            nro_publicacion: numeroPublic.numero
        }

        let resp = null;
        if (stateAceptaCategorias) {
            data = {
                ...data,
                categoria: categoria
            }

            resp = await firebase.crearDocumento('cosas_que_no_sabias', data, archivoState);
        } else {
            resp = await firebase.crearDocumento('invitados', data);
        }

        if (resp.ok) {
            reset();
            Swal.fire('Correcto', 'Publicacion creada correctamente', 'success');
            handleOcualtar(false);
        } else {
            Swal.fire('Error', 'Ocurrio un error en el servidor', 'error');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombre.trim() === '' || descripcion.trim() === '') {
            return Swal.fire('Error', 'Completa todos los campos', 'error');
        }

        if (usuario) {
            if (usuario.ok) {
                crearPublicacion(usuario.usuario.uid, usuario.usuario.displayName);
            } else {
                return Swal.fire('Error', 'Tienes que registrarte para crear personajes', 'error');
            }
        }
    }

    useEffect(() => {
        if (aceptaCategoria) {
            setStateAceptaCategorias(true);
        }
    }, []);


    return (

        <BackgroundModal>
            <Modal>
                <h1>{titulo}</h1>

                <Formulario onSubmit={handleSubmit}>
                    <div>
                        <span>Nombre</span>
                        <input
                            type='text'
                            placeholder='Nombre personaje'
                            name='nombre'
                            value={nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                    {
                        (aceptaCategoria) &&
                        <>
                            <div>
                                <span>Categorias</span>
                                <select name='categoria' value={categoria} onChange={handleInputChange}>
                                    <option value=''>-- Selecciona una categoria --</option>
                                    <option value='ciencia' >Ciencia</option>
                                    <option value='deportes' >Deportes</option>
                                    <option value='arte' >Arte</option>
                                    <option value='random' >Random</option>
                                    <option value='musica' >Musica</option>
                                </select>
                            </div>
                            <div>
                                <span>Imagen</span>
                                <input
                                    type='file'
                                    name='imgen'
                                    id='imagen'
                                    onChange={handleImageChange}
                                />
                            </div>
                        </>

                    }
                    <div>
                        <span>Descripcion</span>
                        <textarea
                            placeholder='Una descripcion breve'
                            name='descripcion'
                            value={descripcion}
                            onChange={handleInputChange}
                        />
                    </div>

                    <BotonesModal>
                        <div onClick={() => handleOcualtar(false)}>CANCELAR</div>
                        <button type='submit'>CREAR</button>
                    </BotonesModal>
                </Formulario>
            </Modal>
        </BackgroundModal>

    );
}

export const useGetPublicaciones = () => {

    const { firebase } = useContext(firebaseContext);
    const [statePubliciones, setSatatePublicaciones] = useState(null);
    const [stateNroPublicaciones, setStateNroPublicaciones] = useState({ nro: null, cargarMas: true });


    const resetPublicaciones = () => {
        setSatatePublicaciones([]);
        setStateNroPublicaciones({ nro: null, cargarMas: true });
    }

    const getPublicaciones = async (coleccion, condicion, limite, donde = '', donde2 = '') => {

        if (donde !== '') {

            const resp = await firebase.consultarDocumentoDB(coleccion, condicion, limite, donde, donde2);

            //console.log(resp);
            //TODO: verficar que los id no se repitan
            if (resp.length > 0) {

                /*setSatatePublicaciones([
                    ...statePubliciones,
                    ...resp
                ]);*/
                setSatatePublicaciones(
                    prevState => [...prevState, ...resp]
                );
                setStateNroPublicaciones({
                    nro: resp[resp.length - 1].data.nro_publicacion,
                    nroLikes: resp[resp.length - 1].data.likes,
                    cargarMas: true
                });
            } else {
                setStateNroPublicaciones({
                    ...stateNroPublicaciones,
                    cargarMas: false
                });
            }

        } else {
            const resp = await firebase.consultarDocumentoDB(coleccion, condicion, limite);

            setStateNroPublicaciones({
                nro: resp[resp.length - 1].data.nro_publicacion,
                nroLikes: resp[resp.length - 1].data.likes,
                cargarMas: true
            });
            setSatatePublicaciones(resp);
        }
    }

    return [statePubliciones, stateNroPublicaciones, getPublicaciones, resetPublicaciones];
}

export const useLikearPublicacion = () => {

    const { firebase, usuario } = useContext(firebaseContext);

    const likearPublicacion = async (coleccion, id) => {
        if (usuario) {
            if (usuario.ok) {
                return await firebase.likearPublicacion(coleccion, id, usuario.usuario.uid);
            }
        }
    }

    let idUsuario = null;
    if (usuario) {
        if (usuario.ok) {
            idUsuario = usuario.usuario.uid;
        }
    }

    return [idUsuario, likearPublicacion];
} 
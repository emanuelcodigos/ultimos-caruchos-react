import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
    getFirestore, addDoc, collection, updateDoc, doc, getDoc, query, orderBy, limit, where,
    getDocs, deleteDoc, setDoc, increment, arrayUnion
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { firebaseConfig } from './config';

class Firebase {
    constructor() {
        initializeApp(firebaseConfig);

        this.auth = getAuth();
        this.googlePovider = new GoogleAuthProvider();
        this.db = getFirestore();
        this.storage = getStorage();
    }

    //registrar usuario
    async registrar(nombre, email, password) {

        try {
            const nuevoUsuario = await createUserWithEmailAndPassword(this.auth, email, password);
            //anadir nombre de usuario

            await updateProfile(nuevoUsuario.user, {
                displayName: nombre
            });

            const data = {
                dataUsuario: {
                    tipo: 'jugador',
                    email: nuevoUsuario.user.email,
                    nombre: nuevoUsuario.user.displayName,
                    uid: nuevoUsuario.user.uid,
                    imgenPerfil: nuevoUsuario.user.photoURL,
                    telefono: nuevoUsuario.user.phoneNumber,
                    creado: nuevoUsuario.user.metadata.creationTime,
                    creadoEn: nuevoUsuario.user.metadata.createdAt
                },
                puntaje: 0
            }

            const docRef = doc(this.db, `usuarios/${nuevoUsuario.user.uid}`);
            await setDoc(docRef, data);

            return { ok: true, msg: 'Registrado correctamente' };
        } catch (error) {

            return { ok: false, msg: error.message };
        }

    }

    //login con google
    async loginWithGoogle() {

        signInWithPopup(this.auth, this.googlePovider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                console.log(user);
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    //iniciar sesion
    async iniciarSesion(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            return { ok: true, msg: userCredential };

        } catch (error) {
            return { ok: false, msg: error.message };
        }
    }

    //sign out
    async signOut() {
        await signOut(this.auth);
    }

    async mostrarInformacionUsuario(uid) {

        const docRef = doc(this.db, 'usuarios', uid);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return ({ ok: true, data: docSnap.data() });
        } else {
            return ({ ok: false, msg: 'No existe el usuario buscado' });
        }

    }

    async consultarDocumentoDB(coleccion, condicion = '', limite = '', donde = '', donde2 = '') {
        /*condicion {
            campo: 'nombre campo',
            orden: 'desc' o 'asc'
        }*/
        /*donde{
            campo: 'nombre campo,
            comparacion: == != < >
            comparado: 'elemento a comparar' 
        }*/
        /*donde2{
            campo: 'nombre campo,
            comparacion: == != < >
            comparado: 'elemento a comparar' 
        }*/

        let q = query(collection(this.db, coleccion));
        if (condicion !== '' && limite != '') {
            q = query(collection(this.db, coleccion), orderBy(condicion.campo, condicion.orden), limit(limite));
        } else if (condicion !== '') {
            q = query(collection(this.db, coleccion), orderBy(condicion.campo, condicion.orden));
        }

        if(donde2 !== ''){
            q = query(collection(this.db, coleccion), where(donde.campo, donde.comparacion, donde.comparado),where(donde2.campo, donde2.comparacion, donde2.comparado), orderBy(condicion.campo, condicion.orden), limit(limite));
        
        }else if (donde !== '') {
            q = query(collection(this.db, coleccion), where(donde.campo, donde.comparacion, donde.comparado), orderBy(condicion.campo, condicion.orden), limit(limite));
        }

        const documetosObtenidos = [];
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            documetosObtenidos.push({ id: doc.id, data: doc.data() });
        });

        return documetosObtenidos;

    }

    async getNumeroDePublicion(coleccion) {
        try {
            const docRef = doc(this.db, coleccion, 'nro_publicaciones');
            await updateDoc(docRef, {
                numero: increment(1)
            });

            const numeroPublic = await getDoc(docRef);
            return numeroPublic.data();
        } catch (error) {
            console.log(error);
        }
    }

    async subirArchivos(path, archivo, documentoPath) {
        /* 
          path: coleccion
        */
        const fileRef = ref(this.storage, path);
        await uploadBytes(fileRef, archivo);
        const urlImage = await getDownloadURL(fileRef);

        const documentRef = doc(this.db, documentoPath) 
        await updateDoc(documentRef, {
            imagen: urlImage
        }).then(resp => {
            console.log(resp);
        });

    }

    async crearDocumento(coleccion, data, archivo = '') {
        try {

            const docRef = await addDoc(collection(this.db, coleccion), {
                ...data
            });

            if(archivo !== ''){
                
                const fileRef = ref(this.storage, archivo.path);
                await uploadBytes(fileRef, archivo.file);
                const urlImage = await getDownloadURL(fileRef);

                await updateDoc(docRef, {
                    imagen: urlImage
                })
            }

            return ({ ok: true, msg: `Id: ${docRef.id}` });
        } catch (error) {
            return ({ ok: false });
        }
    }

    async actualizarDocumentoPorId(coleccion, id, data) {

        try {
            const docRef = doc(this.db, coleccion, id);

            if (data.campo) {
                await updateDoc(docRef, {
                    [data.campo]: increment(data.valor)
                });
            } else {
                await updateDoc(docRef, {
                    ...data
                });
            }

        } catch (error) {
            return (error.message);
        }
    }

    async likearPublicacion(coleccion, id, uid) {

        try {
            const docRef = doc(this.db, coleccion, id);
            await updateDoc(docRef, {
                likes: increment(1),
                arrayLikes: arrayUnion(uid)
            });
            return ({ ok: true });

        } catch (error) {
            console.log(error);
            return ({ ok: false });
        }

    }


}

export const firebase = new Firebase();
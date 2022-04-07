import styled from "@emotion/styled";


export const ContendorFormulario = styled.div`
   background-color: var(--violetaprincipal);
   height: 100vh;
   width: 100vw;

   h2{
      text-align: center;
      color: var(--amarillo);
      font-weight: 900;
      text-transform: uppercase;
      margin-bottom: 0;
      font-size: 1.8rem;
   }
   h1{
    margin: 0;
    text-align: center;
    color: var(--blanco); 
    font-size: 5rem;
    margin-bottom: 2rem;
    
   }
`;

export const Formulario = styled.form`
   width: 90%;
   max-width: 500px;
   display: flex;
   flex-direction:column;
   justify-content:center;
   margin: auto;

   input{
       margin-bottom: 1rem;
       padding: 1.5rem;
       border-radius: 5px;
       border-style: none;
   }
`;
export const BotonSubmit = styled.input`
   width: 100%;
   background-color: var(--violetaoscuro);
   padding:2rem;
   text-transform: uppercase;
   border-radius:5px;
   color: var(--blanco);
   font-weight: 900;
   margin-top: 2rem;
   margin-bottom: 5rem;
`;
export const ContenedorRedes = styled.div`
   width: 90%;
   max-width: 500px;
   display: flex;
   flex-direction:column;
   justify-content:center;
   margin: auto;
   margin-top: 2rem;
`;
export const BotonRedSocial = styled.div`
   margin: auto;
   padding: 1rem;
   width: 90%;
   border-radius: 8px;
   background-color: var(--blanco);
   border-style: none;
   box-shadow: 2px 2px 5px #433b5a;

   text-align: center;
   display: grid;
   grid-template-columns: 20% 70%;
   align-items: center;
   
   img{
      width: 40px;
   }
   p{
      font-weight: 900;
      font-size:2rem;
      margin: 0;
      padding: 0;
      color: var(--violetaoscuro);
   }
`;

export const ParrafoLoginSingIn = styled.p`
   text-align: center;
   font-size: 1.6rem;
   color: var(--blanco);
   margin: 3rem 0;
   padding: 0;
   span{
       font-weight: 900;
   }
`;
export const SeparadorDiv = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;

   div{
     border-bottom: solid 2px var(--violetaoscuro);
     width: 33.3%;
   }
   p{
       padding: 0;
       width: 33.3%;
       margin: 5px;
       color: var(--blanco);
       text-align: center;
       font-weight: 700;
   }
`;
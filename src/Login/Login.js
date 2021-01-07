// import { Button } from "@material-ui/core";
// import { auth, provider } from "../firebase";
// import { actionType } from "../Reducer";
// import { useStateValue } from "../StateProvider";
// import image from "../whatsapp.png";
// import "./Login.css";
// import firebase from "firebase";

// function Login() {
//   const [{}, dispatch] = useStateValue();

//   const signIn = () => {
//     firebase
//       .auth()
//       .signInWithRedirect(provider)
//       .then((result) => {
//         dispatch({
//           type: actionType.SET_USER,
//           user: result.user,
//         });
//       })
//       .catch((error) => alert(error.message));
//   };

//   return (
//     <div className="login__container">
//       <div className="login__container">
//         <img src={image} />
//         <div className="login__text">
//           <h2>Sign in to Whatsapp</h2>
//         </div>
//         <Button type="submit" onClick={signIn} className="btn">
//           SIGN IN WITH GOOGLE
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default Login;

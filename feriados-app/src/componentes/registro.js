import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js';
import mostrarLogin from './login.js';

export default function mostrarRegistro() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="registro">
      <h2>Registro</h2>
      <input type="text" id="nombre" placeholder="Nombre" />
      <input type="email" id="correo" placeholder="Correo electrónico" />
      <input type="password" id="contrasena" placeholder="Contraseña" />
      <input type="date" id="fecha" placeholder="Fecha de nacimiento" />
      <input type="tel" id="telefono" placeholder="Teléfono" />
      <button id="btnRegistro">Registrarse</button>
      <p><a href="#" id="irLogin">¿Ya tienes cuenta? Inicia sesión</a></p>
    </div>
  `;

  document.getElementById("btnRegistro").addEventListener("click", async () => {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const fecha = document.getElementById("fecha").value;
    const telefono = document.getElementById("telefono").value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        nombre,
        correo,
        fecha,
        telefono
      });

      alert('Usuario registrado correctamente');
      mostrarLogin();
    } catch (error) {
      alert('Error al registrarse: ' + error.message);
    }
  });

  document.getElementById("irLogin").addEventListener("click", (e) => {
    e.preventDefault();
    mostrarLogin();
  });
}

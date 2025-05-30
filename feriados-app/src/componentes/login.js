import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';
import mostrarRegistro from './registro.js';

export default function mostrarLogin() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div class="login">
      <h2>Iniciar Sesión</h2>
      <input type="email" id="correo" placeholder="Correo electrónico" />
      <input type="password" id="contrasena" placeholder="Contraseña" />
      <button id="btnLogin">Ingresar</button>
      <p>¿No tienes cuenta? <a href="#" id="irRegistro">Regístrate</a></p>
    </div>
  `;

  document.getElementById("btnLogin").addEventListener("click", async () => {
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;

    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  });

  document.getElementById("irRegistro").addEventListener("click", (e) => {
    e.preventDefault();
    mostrarRegistro();
  });
}

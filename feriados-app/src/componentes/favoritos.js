import { auth, db } from '../firebaseConfig.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default async function mostrarFavoritos() {
  const app = document.getElementById("app");
  app.innerHTML = `<h2>Feriados Favoritos</h2><p id="cargando">Cargando...</p>`;

  const uid = auth.currentUser?.uid;
  if (!uid) {
    app.innerHTML = "<p>Debes iniciar sesión para ver tus favoritos.</p>";
    return;
  }

  try {
    const favoritosRef = collection(db, "favoritos");
    const q = query(favoritosRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      app.innerHTML = "<p>No tienes feriados guardados como favoritos.</p>";
      return;
    }

    const lista = document.createElement("div");
    lista.style.padding = "10px";

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.style.marginBottom = "10px";
      div.innerHTML = `
        <strong>${data.fecha}</strong> - ${data.nombreLocal} (${data.nombreInglés}) - ${data.país}
      `;
      lista.appendChild(div);
    });

    app.innerHTML = `<h2>Feriados Favoritos</h2>`;
    app.appendChild(lista);
  } catch (error) {
    app.innerHTML = `<p style="color:red;">Error al cargar favoritos: ${error.message}</p>`;
    console.error("Error obteniendo favoritos:", error);
  }
}

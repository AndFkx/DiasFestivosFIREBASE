import { auth, db } from '../firebaseConfig.js';
import { addDoc, collection, setDoc, doc } from 'firebase/firestore';

export default async function mostrarOriginal() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <h2>Días Festivos</h2>
    <div style="margin-bottom: 16px;">
      <input type="number" id="anio" placeholder="Año" value="${new Date().getFullYear()}" style="padding: 10px; width: 120px;" />
      <input type="text" id="pais" placeholder="Código país (ej: MX)" value="MX" style="padding: 10px; width: 120px;" />
      <button id="buscar" style="padding: 10px;">Buscar</button>
    </div>
    <div id="lista" style="padding: 10px;"></div>
  `;

  document.getElementById("buscar").addEventListener("click", async () => {
    const year = document.getElementById("anio").value;
    const country = document.getElementById("pais").value.toUpperCase();
    await cargarFeriados(year, country);
  });

  await cargarFeriados(new Date().getFullYear(), "MX");
}

async function cargarFeriados(year, countryCode) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "<p>Cargando feriados...</p>";

  try {
    const res = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
    if (!res.ok) throw new Error("Error al obtener los datos");

    const feriados = await res.json();
    lista.innerHTML = "";

    feriados.forEach((feriado) => {
      const div = document.createElement("div");
      div.style.marginBottom = "10px";
      div.style.display = "flex";
      div.style.justifyContent = "space-between";
      div.style.alignItems = "center";

      div.innerHTML = `
        <div>
          <strong>${feriado.date}</strong> - ${feriado.localName} (${feriado.name})
        </div>
        <button style="padding: 4px 10px;" class="guardarFavorito">❤️</button>
      `;

      const boton = div.querySelector('.guardarFavorito');
      boton.addEventListener('click', () => guardarFavorito(feriado, countryCode));

      lista.appendChild(div);
    });

    await guardarConsultaEnFirestore(year, countryCode);
  } catch (error) {
    lista.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}

async function guardarConsultaEnFirestore(year, countryCode) {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  try {
    await addDoc(collection(db, "consultas"), {
      uid,
      año: parseInt(year),
      país: countryCode,
      fechaConsulta: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error al guardar consulta:", error);
  }
}

async function guardarFavorito(feriado, countryCode) {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  const idUnico = `${uid}_${feriado.date}`;

  try {
    await setDoc(doc(db, 'favoritos', idUnico), {
      uid,
      fecha: feriado.date,
      nombreLocal: feriado.localName,
      nombreInglés: feriado.name,
      país: countryCode,
      timestamp: new Date().toISOString()
    });
    alert(`Guardado: ${feriado.localName}`);
  } catch (error) {
    console.error("Error al guardar favorito:", error);
    alert("Error al guardar favorito");
  }
}

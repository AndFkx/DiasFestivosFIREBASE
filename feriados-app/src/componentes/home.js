export default function mostrarHome() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <h2>Bienvenido a la App de Días Festivos</h2>
      <p>Consulta los feriados oficiales por país y año.</p>
    </div>
  `;
}

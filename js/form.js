const scriptURL = "https://script.google.com/macros/s/AKfycbxmWp66zNYVTuBckNGXzu465t3j05WR-eZ3UJNM7108oNCA-_dC3uIBQhSqnFapvyF6Rw/exec";

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  console.log("📤 Enviando datos como FormData...", Object.fromEntries(formData.entries()));

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: formData,
      mode: "no-cors" // necesario para que no bloquee CORS
    });

    // con no-cors no se puede leer la respuesta, asumimos éxito
    alert("✅ Datos enviados correctamente");
    form.reset();
  } catch (err) {
    console.error("❌ Error:", err);
    alert("❌ No se pudo enviar. Revisa la consola.");
  }
});

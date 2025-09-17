const scriptURL = "https://script.google.com/macros/s/AKfycbxmWp66zNYVTuBckNGXzu465t3j05WR-eZ3UJNM7108oNCA-_dC3uIBQhSqnFapvyF6Rw/exec";

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  console.log("📤 Enviando datos al servidor...", Object.fromEntries(formData.entries()));

  try {
    const res = await fetch(scriptURL, { method: "POST", body: formData });
    console.log("📡 Estado HTTP:", res.status);

    if (!res.ok) {
      throw new Error(`Servidor respondió con ${res.status}`);
    }

    const text = await res.text();
    console.log("✅ Respuesta servidor:", text);

    if (text.includes("OK")) {
      form.querySelector(".hint").hidden = false;
      form.reset();
      alert("✅ Datos enviados correctamente a Google Sheets");
    } else {
      alert("⚠️ El servidor respondió pero no con 'OK': " + text);
    }
  } catch (err) {
    console.error("❌ Error:", err);
    alert("❌ No se pudo enviar. Mira la consola para más detalles.");
  }
});

const scriptURL = "https://script.google.com/macros/s/AKfycbwVW9WPrwzM57LvPx8BxT9pRQ7PQupOIPSURNd2EJEWdteW9bUp_3nknoHPF-A8hCTiMg/exec";

// Formulario de Contacto
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  formData.append("formType", "contacto"); // ⚡ identificar tipo

  try {
    await fetch(scriptURL, { method: "POST", body: formData, mode: "no-cors" });
    alert("✅ Formulario de contacto enviado");
    form.reset();
  } catch (err) {
    console.error(err);
    alert("❌ Error al enviar contacto");
  }
});

// Formulario de Boletín
document.getElementById("newsletterForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  formData.append("formType", "boletin"); // ⚡ identificar tipo

  try {
    await fetch(scriptURL, { method: "POST", body: formData, mode: "no-cors" });
    alert("✅ Suscripción al boletín registrada");
    form.reset();
  } catch (err) {
    console.error(err);
    alert("❌ Error al enviar boletín");
  }
});

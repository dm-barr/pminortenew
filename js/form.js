const scriptURL = "https://script.google.com/macros/s/AKfycbyUryJOckwwSsRElbj4YxQ0db2R4N5iBC3lb0b-UBe-h4-HHB37iGo_3JaHvLTQGy38fg/exec";

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

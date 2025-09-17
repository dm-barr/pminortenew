const scriptURL = "https://script.google.com/macros/s/AKfycbx80LfsDjmQ87zWe8XkVjn8ca9BDrkbSiduYbW-WoSCrhSnkBkQrT0KOjp5plfWK3ODOA/exec";

// Formulario de Contacto
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  formData.append("formType", "contacto"); // ⚡ identificar tipo

  try {
    const response = await fetch(scriptURL, { method: "POST", body: formData });
    const data = await response.json();
    alert(`✅ ${data.message}`);
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
    const response = await fetch(scriptURL, { method: "POST", body: formData });
    const data = await response.json();
    alert(`✅ ${data.message}`);
    form.reset();
  } catch (err) {
    console.error(err);
    alert("❌ Error al enviar boletín");
  }
});

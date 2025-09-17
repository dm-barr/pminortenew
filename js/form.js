const scriptURL = "https://script.google.com/macros/s/AKfycbyUryJOckwwSsRElbj4YxQ0db2R4N5iBC3lb0b-UBe-h4-HHB37iGo_3JaHvLTQGy38fg/exec";

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

// 📌 FORMULARIO DE BOLETÍN
document.getElementById("newsletterForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // Aseguramos que tenga un campo "email"
  if (!formData.has("email")) {
    const emailInput = form.querySelector("input[type='email']");
    if (emailInput) {
      formData.append("email", emailInput.value);
    }
  }

  console.log("📤 Enviando BOLETÍN...", Object.fromEntries(formData.entries()));

  try {
    await fetch(scriptURL, {
      method: "POST",
      body: formData,
      mode: "no-cors"
    });

    alert("✅ Suscripción al boletín registrada");
    form.reset();
  } catch (err) {
    console.error("❌ Error en boletín:", err);
    alert("❌ No se pudo registrar la suscripción al boletín.");
  }
});
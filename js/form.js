const scriptURL = "https://script.google.com/macros/s/AKfycbx97kj1qtnLGSQR4KTmq5AG202qrl_aJUcM1uZ9mh8gkk9De-Sgeg5vG3jhPiUQUKkg7A/exec";

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

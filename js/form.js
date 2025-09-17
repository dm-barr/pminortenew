const scriptURL = "https://script.google.com/macros/s/AKfycbx80LfsDjmQ87zWe8XkVjn8ca9BDrkbSiduYbW-WoSCrhSnkBkQrT0KOjp5plfWK3ODOA/exec";

// Formulario de Contacto
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  formData.append("formType", "contacto"); 
  try {
    const response = await fetch(scriptURL, { method: "POST", body: formData });
    const data = await response.json();
    form.reset();
  } catch (err) {
    console.error(err);
  }
});

// Formulario de Boletín
document.getElementById("newsletterForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  formData.append("formType", "boletin"); 

  try {
    const response = await fetch(scriptURL, { method: "POST", body: formData });
    const data = await response.json();
    form.reset();
  } catch (err) {
    console.error(err);
  }
});

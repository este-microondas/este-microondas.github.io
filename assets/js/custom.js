document.addEventListener("DOMContentLoaded", function () {
  const forma = document.getElementById("contactForm");

  if (!forma) return;

  //LD11 uzd 6

  const mygtukas = forma.querySelector('button[type="submit"]');

  function tikrintiForma() {
    const laukai = forma.querySelectorAll("[required]");
    let uzpildyta = true;

    laukai.forEach(function (laukas) {
      if (laukas.value.trim() === "" || !laukas.checkValidity()) {
        uzpildyta = false;
      }
    });

    mygtukas.disabled = !uzpildyta;
  }

  forma.addEventListener("input", tikrintiForma);
  tikrintiForma();

  //pabaiga(mygtuko aktyvavimas)
//1 papildnomas

  // Papildoma 1 - Laukų validacija
  const laukaiValidacijai = forma.querySelectorAll(
    'input[required]:not([type="tel"])'
  );

  laukaiValidacijai.forEach(function (laukas) {
    const klaidosTekstas = document.createElement("small");
    klaidosTekstas.className = "validation-error";
    laukas.after(klaidosTekstas);

    laukas.addEventListener("input", function () {
      let klaida = "";
      const reiksme = laukas.value.trim();

      laukas.setCustomValidity("");

      if (reiksme === "") {
        klaida = "Privalomas laukas";
      }
      else if (laukas.id === "vardas" || laukas.id === "pavarde") {
        if (!/^\p{L}+$/u.test(reiksme)) {
          klaida = "Galima įvesti tik raides";
        }
      }
      else if (laukas.id === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reiksme)) {
          klaida = "Neteisingas el. pašto formatas";
        }
      }
      else if (laukas.type === "number") {
        if (!laukas.checkValidity()) {
          klaida = "Įveskite skaičių nuo 1 iki 10";
        }
      }

      laukas.setCustomValidity(klaida);
      laukas.classList.toggle("is-invalid", klaida !== "");
      klaidosTekstas.textContent = klaida;

      tikrintiForma();
    });
  });

//papildomas 2
  //Telefono numerio formatavimas
  const telefonas = document.getElementById("telefonas");
  const telefonoKlaida = document.createElement("small");

  telefonoKlaida.className = "validation-error";
  telefonas.after(telefonoKlaida);

  telefonas.addEventListener("input", function () {
    let skaiciai = telefonas.value.replace(/\D/g, "");

    if (skaiciai.startsWith("370")) {
      skaiciai = skaiciai.slice(3);
    }

    skaiciai = skaiciai.slice(0, 8);

    if (skaiciai.length > 3) {
      telefonas.value = "+370 " + skaiciai.slice(0, 3) +
        " " + skaiciai.slice(3);
    } else if (skaiciai.length > 0) {
      telefonas.value = "+370 " + skaiciai;
    } else {
      telefonas.value = "";
    }

    let klaida = "";

    if (skaiciai.length === 0) {
      klaida = "Privalomas laukas";
    } else if (!/^6\d{7}$/.test(skaiciai)) {
      klaida = "Įveskite numerį formatu +370 6xx xxxxx";
    }

    telefonas.setCustomValidity(klaida);
    telefonas.classList.toggle("is-invalid", klaida !== "");
    telefonoKlaida.textContent = klaida;

    tikrintiForma();
  });

//papild 2 pabaiga

//1 papildomas pabaiga
  const rezultatas = document.createElement("div");
  rezultatas.className = "mt-4 p-3 border rounded";
  rezultatas.style.whiteSpace = "pre-line";
  rezultatas.hidden = true;

  forma.after(rezultatas);

  // Papildoma 3 - Formos išvalymas
  const isvalyti = document.getElementById("isvalyti");

  isvalyti.addEventListener("click", function () {
    forma.reset();

    forma.querySelectorAll("input").forEach(function (laukas) {
      laukas.setCustomValidity("");
      laukas.classList.remove("is-invalid");
    });

    forma.querySelectorAll(".validation-error").forEach(function (klaida) {
      klaida.textContent = "";
    });

    rezultatas.textContent = "";
    rezultatas.hidden = true;

    tikrintiForma();
  });


  forma.addEventListener("submit", function (event) {
    event.preventDefault();

    const duomenys = {
      vardas: document.getElementById("vardas").value,
      pavarde: document.getElementById("pavarde").value,
      email: document.getElementById("email").value,
      telefonas: document.getElementById("telefonas").value,
      adresas: document.getElementById("adresas").value,
      klausimas1: Number(document.getElementById("klausimas1").value),
      klausimas2: Number(document.getElementById("klausimas2").value),
      klausimas3: Number(document.getElementById("klausimas3").value)
    };

    const vidurkis = (
  duomenys.klausimas1 +
  duomenys.klausimas2 +
  duomenys.klausimas3
) / 3;

    console.log(duomenys);

    rezultatas.textContent =
      "Vardas: " + duomenys.vardas + "\n" +
      "Pavardė: " + duomenys.pavarde + "\n" +
      "El. paštas: " + duomenys.email + "\n" +
      "Tel. numeris: " + duomenys.telefonas + "\n" +
      "Adresas: " + duomenys.adresas + "\n" +
      "1 klausimas: " + duomenys.klausimas1 + "\n" +
      "2 klausimas: " + duomenys.klausimas2 + "\n" +
      "3 klausimas: " + duomenys.klausimas3 + "\n\n" +
duomenys.vardas + " " + duomenys.pavarde + ": " + vidurkis.toFixed(2);

    rezultatas.hidden = false;
  });
});

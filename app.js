const artistas = [
  "Rosalia","AlejandroSanz","Aitana","PabloAlboran","LolaIndigo",
  "Melendi","LaOrejaDeVanGogh","Amaral","VetustaMorla","Leiva",
  "DaniMartin","Estopa","IndiaMartinez","DavidBisbal","VanesaMartin",
  "AntonioOrozco","Malu","Beret","CTangana","Fangoria"
];

const peliculas = [
  "MarAdentro","TodoSobreMiMadre","Volver","Tesis","Celda211",
  "LaIslaMinima","OchoApellidosVascos","ElDiaDeLaBestia",
  "ElLabertintoDelFauno","Campeones","LaLenguaDeLasMariposas",
  "LaComunidad","Torrente","MientrasDureLaGuerra","AbreLosOjos",
  "LosLunesAlSol","LaGranFamiliaEspanola","ElReino","PerdiendoElNorte",
  "LaPielQueHabito"
];

const actores = [
  "PenelopeCruz","JavierBardem","AntonioBanderas","CarmenMaura",
  "LuisTosar","EmmaSuarez","EduardFernandez","MaribelVerdu",
  "MarioCasas","BelenRueda","PacoLeon","InmaCuesta",
  "DaniRovira","QuimGutierrez","TerelePavez","CandelaPena",
  "RaulArevalo","JoseCoronado","AdrianaUgarte","ElenaAnaya"
];

const frases = [
  "OleOle","VivaLaVida","FiestaEspanola","SolYPlaya","TapeoNoche",
  "SiempreFuerte","CorazonLatino","RitmoIberico","MagiaEnEscena",
  "LuzYCamara"
];

const numeros = ["0","1","2","3","4","5","6","7","8","9"];

function generarContrasena(opciones) {
  let { longitud, usarArtistas, usarPeliculas, usarActores, usarFrases, usarNumeros, usarGuion } = opciones;

  if (longitud < 12) longitud = 12;
  if (longitud > 25) longitud = 25;

  let elementosTexto = [];

  if (usarArtistas) elementosTexto = elementosTexto.concat(artistas);
  if (usarPeliculas) elementosTexto = elementosTexto.concat(peliculas);
  if (usarActores) elementosTexto = elementosTexto.concat(actores);
  if (usarFrases) elementosTexto = elementosTexto.concat(frases);

  if (elementosTexto.length === 0) {
    elementosTexto = artistas.concat(peliculas, actores, frases);
  }

  let password = "";

  while (password.length < longitud) {
    const tiposDisponibles = ["texto"];
    if (usarNumeros) tiposDisponibles.push("numero");
    if (usarGuion) tiposDisponibles.push("guion");

    const tipo = tiposDisponibles[Math.floor(Math.random() * tiposDisponibles.length)];

    if (tipo === "texto") {
      const token = elementosTexto[Math.floor(Math.random() * elementosTexto.length)];
      password += token;
    } else if (tipo === "numero") {
      const n = numeros[Math.floor(Math.random() * numeros.length)];
      password += n;
    } else if (tipo === "guion") {
      password += "_";
    }
  }

  return password.slice(0, longitud);
}

document.addEventListener("DOMContentLoaded", () => {
  const lengthInput = document.getElementById("length");
  const useArtists = document.getElementById("useArtists");
  const useMovies = document.getElementById("useMovies");
  const useActors = document.getElementById("useActors");
  const usePhrases = document.getElementById("usePhrases");
  const useNumbers = document.getElementById("useNumbers");
  const useUnderscore = document.getElementById("useUnderscore");
  const generateBtn = document.getElementById("generateBtn");
  const resultInput = document.getElementById("resultPassword");
  const copyBtn = document.getElementById("copyBtn");
  const copyMessage = document.getElementById("copyMessage");

  generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const longitud = parseInt(lengthInput.value, 10) || 16;

    const pass = generarContrasena({
      longitud,
      usarArtistas: useArtists.checked,
      usarPeliculas: useMovies.checked,
      usarActores: useActors.checked,
      usarFrases: usePhrases.checked,
      usarNumeros: useNumbers.checked,
      usarGuion: useUnderscore.checked
    });

    resultInput.value = pass;
    copyMessage.hidden = true;
  });

  copyBtn.addEventListener("click", () => {
    if (!resultInput.value) return;

    resultInput.select();
    resultInput.setSelectionRange(0, 99999);

    try {
      const ok = document.execCommand("copy");
      if (ok) {
        copyMessage.hidden = false;
        setTimeout(() => (copyMessage.hidden = true), 2000);
      }
    } catch (err) {
      console.error(err);
      copyMessage.hidden = true;
    }
  });
});

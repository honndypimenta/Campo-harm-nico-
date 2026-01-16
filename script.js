// Teclas do piano
const notas = [
  "C","C#","D","D#","E","F","F#","G","G#","A","A#","B"
];

// Criar piano
const piano = document.getElementById("piano");
notas.forEach(nota => {
  const tecla = document.createElement("div");
  tecla.classList.add("tecla");
  tecla.classList.add(nota.includes("#") ? "preta" : "branca");
  tecla.textContent = nota;
  tecla.dataset.nota = nota;
  piano.appendChild(tecla);
});

// Inicializa Tone.js
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

// Tocar nota ao clicar
document.querySelectorAll(".tecla").forEach(tecla => {
  tecla.addEventListener("click", () => {
    synth.triggerAttackRelease(tecla.dataset.nota + "4", "8n");
  });
});

// Tocar acorde ao clicar
document.querySelectorAll(".acorde").forEach(div => {
  div.addEventListener("click", () => {
    const acordes = div.dataset.notas.split(",");
    synth.triggerAttackRelease(acordes.map(n => n + "4"), "1n");
  });
});

// Exemplo de música
document.getElementById("tocar-musica").addEventListener("click", async () => {
  const progressao = [
    ["C","E","G"],
    ["A","C","E"],
    ["F","A","C"],
    ["G","B","D"]
  ];
  for(let acordes of progressao){
    synth.triggerAttackRelease(acordes.map(n => n+"4"), "1n");
    await new Promise(r => setTimeout(r, 800));
  }
});

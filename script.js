const pastaInput = document.getElementById('pasta');
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const atualSpan = document.getElementById('atual');
const totalSpan = document.getElementById('total');
const capaImg = document.getElementById('capa');
const tituloH2 = document.getElementById('titulo');
const artistaP = document.getElementById('artista');

let musicas = [];
let indiceAtual = 0;
let estaTocando = false;

// Quando escolher a pasta
pastaInput.addEventListener('change', (e) => {
  musicas = [];
  const arquivos = Array.from(e.target.files);

  // Filtra apenas arquivos de música e separa capas
  arquivos.forEach(arquivo => {
    if (arquivo.name.endsWith('.mp3') || arquivo.name.endsWith('.wav') || arquivo.name.endsWith('.ogg')) {
      musicas.push({
        nome: arquivo.name.replace(/\.[^/.]+$/, ""),
        arquivo: arquivo,
        caminho: URL.createObjectURL(arquivo)
      });
    }
  });

  if (musicas.length === 0) {
    alert("Nenhuma música encontrada na pasta!");
    return;
  }

  indiceAtual = 0;
  carregarMusica(indiceAtual);
  atualizarLista();
});

function carregarMusica(indice) {
  const musica = musicas[indice];
  audio.src = musica.caminho;
  tituloH2.textContent = musica.nome;

  // Procura capa com o mesmo nome (jpg, jpeg, png)
  const capaPossivel = musicas.find(m => {
    const nomeSemExt = m.arquivo.name.replace(/\.[^/.]+$/, "");
    return nomeSemExt === musica.nome && (m.arquivo.type.startsWith('image/'));
  });

  if (capaPossivel) {
    capaImg.src = URL.createObjectURL(capaPossivel.arquivo);
  } else {
    capaImg.src = "capa-default.jpg"; // opcional: coloque uma imagem padrão na pasta
  }

  // Se estava tocando, continua tocando
  if (estaTocando) audio.play();
}

function tocarPausar() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    estaTocando = true;
  } else {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    estaTocando = false;
  }
}

function proxima() {
  indiceAtual = (indiceAtual + 1) % musicas.length;
  carregarMusica(indiceAtual);
}

function anterior() {
  indiceAtual = (indiceAtual - 1 + musicas.length) % musicas.length;
  carregarMusica(indiceAtual);
}

// Atualiza barra de progresso
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progresso = (audio.currentTime / audio.duration) * 100;
    progress.value = progresso;

    atualSpan.textContent = formatarTempo(audio.currentTime);
    totalSpan.textContent = formatarTempo(audio.duration);
  }
});

// Clique na barra pra pular
progress.addEventListener('input', () => {
  const tempo = (progress.value / 100) * audio.duration;
  audio.currentTime = tempo;
});

// Quando acabar a música → próxima
audio.addEventListener('ended', proxima);

// Botões
playPauseBtn.addEventListener('click', tocarPausar);
nextBtn.addEventListener('click', proxima);
prevBtn.addEventListener('click', anterior);

// Formatar tempo bonito (mm:ss)
function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min}:${seg < 10 ? '0' : ''}${seg}`;
}

function atualizarLista() {
  artistaP.textContent = `${musicas.length} música(s) carregada(s)`;
}

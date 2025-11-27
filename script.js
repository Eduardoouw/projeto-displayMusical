// === VARIÁVEIS GLOBAIS ===
let context = null;
let baseNoteBuffer = null;
const BASE_NOTE = 'C4';
const BASE_NOTE_FILE_PATH = 'sons/69.ogg';
let baseNoteFrequency = 0;
// 🟢 NOVO: Nó de controle de ganho global (volume)
let mainGainNode = null;

// === USUÁRIOS (LOGIN SIMULADO) ===
const USERS = [
    { email: "ana@gmail.com", password: "1234", name: "Ana Silva" },
    { email: "XD@gmail.com", password: "XDXDXD", name: "XD" },
    { email: "lucas@gmail.com", password: "dev2025", name: "Lucas Mendes" },
    { email: "bea@gmail.com", password: "musica123", name: "Beatriz Costa" },
    { email: "rita@gmail.com", password: "12345", name: "Rita Steyer" }
];

// === MÚSICAS PRÉ-CARREGADAS ===
const MUSICAS = [
    { nome: "Música 1 - MINECRAFT", seq: "[IP] - O [QY] - [QEI] -- [IP] - O [QY] - T [IP] - O [QY] - [EI] -- [IP] - O [QY] I T E [IP] - T [QY] - [EI] - [TO] [IP] - O [QYP] E [TS] [IP] - [OS] [QD] - [EOS] P O [IP] - O [QYP] - I [T] -- [QY] - [EI] -- [TO] - P [QI] TO" },
    { nome: "Música 2 - FUR ELISE", seq: "f - D - f - D - f - a - d - s - [6ep] - 0 - e - t - u - p - [3a] - 0 - W - u - O - a - [6s] - 0 - e - u - f - D - f - D - f - a - d - s - [6ep] - 0 - e - t - u - p - [3a] - 0 - W - u - s - a - [6p] - 0 - e - a - s - d - [8f] - w - t - o - g - f - [5d] - w - r - i - f - d - [6s] - 0 - e - u - d - s - [3a] - 0 - u - u - f - u - f - f - x - D - f - D - f - D - f - D - f - D - f - D - f - D - f - D - f - a - d - s - [6p] - 0 - e - t - u - p - [3a] - 0 - W - u - O - a - [6s] - 0 - e - u - f - D - f - D - f - a - d - s - [6p] - 0 - e - t - u - p - [3a] - 0 - W - u - s - a - [6p] - 0 - e - a - s - d - [8f] - w - t - o - g - f - [5d] - w - r - i - f - d - [6s] - 0 - e - u - d - s - [3a] - 0 - u - s - a - [pe6]" },
    { nome: "Música 3 - MINECRAFT 2", seq: "6 - 0 - e - r - T - r - e - 0 - 9 - Q - T - u - T - e - 6 - 0 - e - r - T - r - e - 0 - 9 - Q - T - u - T - e - O - 0 - e - r - T - r - [pe] - 0 - I - Q - T - u - T - e - u - I - O - 0 - e - r - T - r - [ea] - S - [QI] - T - u - T - e - S - f - [h5] - [GQ] - [ed] - [9p] - [7a] - 5 - 7 - 9 - Q - e - [h5] - G - [ed] - [9p] - [7a] - 5 - 7 - 9 - Q - e - p - [6u] - 0 - e - r - T - r - e - 0 - 6 - 0 - e - r - T - u - p - S - | - [7yd] - S - p - [uf] - [IG] - [9yd] - Q - e - T - p - S - [5d] - 7 - S - d - e - G - S - | - r - e - [3r] - % - 7 - 0 - W - 0 - 7 - % - 3 - % - 7 - 0 - W - 0 - 6 - 5 - 7 - 9 - Q - e - Q - 9 - 7 - 6 - (0 - e - T - r - e - 0 - 3 - % - 7 - 0 - W - 3 - % - 7 - 0 - W - d - d - D - d - s - d - o - s - P - o - P - s - s - s - d - s - P - s - d - P - o - o - P - o - P - o - [od] - d - D - d - [so] - P - d - s - d - o - o - P - p - p - d - d - [^P] - p - d - c - ^ - [g@] - d - s - P - s - d - P - [sp] - i - o - i - u - i - d - d - s - d - o - i - i - g - d - s - P - s - d - P - s - i - o - i - u - i - d - d - S - d - J - j - g - o - p - P - P - p - P - d - [spi] - s - P - s - p - [iP] - P - p - P - i - o - o - p - P - P - p - P - d - s - s - s - P - s - P - p - s - P - i - p - s - j - l - z - c - b - d - d - D - d - s - d - o - s - P - o - P - s - s - s - d - s - P - s - d - P - o - o - P - o - P - o - d - d - D - d - s - P - d - s - d - o - o - P - p - p - p - d - d - P - y - i - p - y - i - p - d - i - P - d - g - [^PJ] - J - J - J - J - J - J - J - J - J - J - J - J - J - j - j - k - l - z - x - c - v - b - n - l - z - x - c - v - b - n - l - J - J - -J - J - J - J - J - J - J - J - J - J - J - J - J" },
    { nome: "Música 4 - SUPER MARIO BROS", seq: "h - f - f - f - s - f - h - o - soupa - P - p - o - f - h -j - g - h - f - s - d - a - soupa - P - p - o - f - h - j - g - h - f - s - d - a - h - G - g - D - f - O - p - s - p - s - d - h - G - g - D - f - l - l - l - h - G - g - D - f - O - p - s - p - s - d - D - d - s - h - G - g - D - f - O - p - s - p - s - d - h - G - g - D - f - l - l - l - h - G - g - D - f - O - p - s - p - s - d - [DO] - [id] - [us] - s - s - s - s - d - f - s - p - o - s - s - s - s - d - f - s - s - s - s - d - f - s - p - o - f - f - f - s - f - h - o - soupa - P - p - o - f - h - j - g - h - f - s - d - a - soupa - P - p - o - f - h - j - g - h - f - s - d - a - h - G - g - D - f - O - p - s - p - s - d - h - G - g - D - f - l - l - l - h - G - g - D - f - O - p - s - p - s - d - [DO] - [id] - [us]"},
    { nome: "Música 5 - RUSH E", seq: "u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - [uf] - [uf ] - [uf0] - [uf0] - [uf0x] - [uf0x] - [uf0x3] - [uf0x3] - 6 - [80] - 3 - [80] - 346 - [80] - 3 - [80] - u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - i - u - Y - u - p - s - d - d - d - d - d - s - a - d - s - s - s - s - s - a - p - s - a - a - a - a - O - a - P -u - | - u -  u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - i - u - Y - u - p - s - f - g - h - | - hgf - hgfd - gfdS - fdpiy - apoiuy -Tuy - u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - i - u - Y - u - p - s - d - d - d - d - d - s - a - d - s - s - s - s - s - a - p - s - a - a - a - a - O - a - P - u - |u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - u - i - u - Y - u - p - s - f - g - h - | - hgf - hgfd - gfdS - fdpiy - apoiuy -Tuy - u - o - I - o - p - a - p - o - a - p - o - i - o - p - | - i - u - Y - u - i - o - i - u - o - i - y - i - p - d - p - i - y - o - I - o - p - a - p - o - p - o - i - u - i - | - s - o - a - p - i - p - u - y - [et] - [pi]"},
    { nome: "Música 6 - CHANGES", seq: "[ua0] - a - a - a - [aT*] - a - a - a - [aW%] - a - a - a - a - a - a - k - k - Z - L - k - J - [uk0] - k - k - k - L - k - J - [kT*] - k - k - k - L - k - J - [kW%]  - k  - k - k - L - k - J - [ka] - k - a - k - [ka] - k - k - [aZ] - L - k - J - [uk0] - k - k - k - L - k - J - [kT*] - k - k - k - L - k - J - [kW%] - k - k - k - L - k - J - [ka] - k - a - k - [ka] - k - k - [aZ] - L - k - J - [u0] - k - k - k - L - Z - L - k - k - [T*] - k - k - k - L - Z - L - k - k - [W%] - k - k - k - L - Z - L - k - k - a - a - a - a - k - k - Z - L - k - J - [uk0] - k - k - k - L - k - J - [kT*] - k - k - k - L - k - J - [kW%] - k - k - k - L - k - J - k - k - k - k - k - k - Z - L - k - J - [uk0] - k - k - k - L - k - J - [kT*] - k - k - k - L - k - J - [kW%] - k - k - k - L - k - J - k - k - k - k - k - k - Z - L - k - J  -[u0] - k - k - k - L - Z - L - k - k - [T*] - k - k - k - L - Z - L - k  -k - [W%] - k - k - k - L - Z - L - k - k - a - a - a - a - a - a - a - a " },
    { nome: "Música 7 - MOONLIGHT SONATA (BETHOVEN)", seq: "[9e] - y - i - e - y - i - e - y - i - e - y - i - | - [8e] - y - i - e - y - i - e - y - i - e - y - i - E - y - i - E - y - i - E - Y - o - E - Y - o - [6e] - T - o - e - y - i - [6e] - y - u - w - T - u - [9q] - e - y - e - y - i - e - y - i - p - e - y - p - | - [*p] - u - o - e - u - o - e - u - o - p - u - o - p - [9p] - y - i - e - y - i - P - y - o - E - y - o - | - [8p] - t - i - e - t - i  - [8o] - t - u - s - u - o - [4i] - t - i - e - t - i - e - t - i - e - t - i - W - t - i - W - t - i - W - t - i - O - t - i - O - O - t - I - O - t - I - O - t - I - O - t - I - O - * - T - i - W - T - i - W - y - i - o - y - i - [8o] - t - Y - w - t - Y - W - t - y - W - t - y - | - [5o] - t - Y - w - t - Y - [wo] - r - y - w - r - y - [8t] - Y - o - t - Y - o - t - u - o - s - u - o - | - S - i - O - [qt] - i - O - W - i - O - [qa] - i - O - [8s] - u - o - t - u - o - t - u - o - s - u - o - | - S - i - O - [qt] - i - O - W - i - O - [qa] - i - O - [8s] - u - o - t - u - o - [6s] - Y - I - t - Y - I - | - s - y - p - t - y - p - E - y - i - E - y - i - 8 - t - Y - W - t - Y* - E - u - w - E - u - [9y] - w - E - 9 - w - E - [9y] - w - t - [9y] - Q - e | [5w] - E - y - E - y - o - y - o - P - d - o - P - d - d - p - s - y - p - s - y - p - s - d - p - s - d - [5d] - o - P - y - o - P - 0 - o - P - 8 - o - P | *o - p - u - o - p - u - o - p - [8f] - o - p - [9g] - p - d - i - p - d - [5f] - o - P - d - i - a - | 6 - T - u - p - T - u - P - T - u - o - T - u - 6 - T - u - e - T - u - E - T - u - w - T - u - 6 - e - y - q - e - y - 6 - w - T - 0 - w - T - [26qy] - [26qy] - [26qy]"},
    { nome: "Música 8 - LOVELY", seq: "[tp] - a - [0f] - [rd] - [7a] - p - a - [rp] - o - [8u] - I - [8o] - [tp] - a - [0f] - [rd] - [7a] - p - a - [rp] - o - [8u] - I - [8o] - [tp] - a - [0f] - [rd] - [7a] - p - a - [rp] - o - [8u] - I - [8o] - [tp] - a - [0f] - [rd] - [7a] - p - a - [rp] - o - [8u] - I - [8o] - [tp] - a - [0f] - [rd] - [7a] - Q - r - [8k] - j - h - G - f - j - h - G - [0k] - j - h - G - f - G - f - h - [8k] - j - h - G - f - j - h - G - 0 - h - G - G - f - h - [0u]" },
    { nome: "Música 9 - IPHONE RINGTONE", seq: "[oa] - [ua] - [od] - [pf] - [uf] - d - a - f - [yp] - f - d - f - [pT] - [oa] - [ua] - [od] - [pf] - [uf] - d - a - f - [yp] - f - d - f - [pT] - [oa] - [ua] - [od] - [pf] - [uf] - d - a - f - [yp] - f - d - f - [pT] - [oa] - [ua] - [od] - [pf] - [uf] - d - a - f - [yp] - f - d - f - [pT]" },
    { nome: "Música 10 - OLD TOWN ROAD", seq: "[sYW] - [sYW] - [rSI] - [rSI] - [SQP] - [SQP] - [SO0] - [SO0] - [sYW] - [sYW] - [rSI] - [rSI] - [SQP] - [SQP] - [SO0] - [SO0] - [sYWD] - S - [sYWD] - H - [rSID] - S - [rSI] - [SQP] - O - [SQP] - O - [SO0] - a - [SPO0] - O - [sYWD] - S - [sYWD] - H - [rSID] - S - [rSI] - [SQP] - O - [SQP] - O - [SO0] - a - [SPO0] - O - [sYW] - [sYW] - [rSI] - [rSI] - [SQP] - [SQP] - [SO0] - [SO0] - [sYW] - [sYW] - [rSI] - [rSI] - [SQP] - [SQP] - [SO0] - [SO0] - [sYW] - S - [sYWD] - H - [rSID] - S - [rSI] - [SQP] - O - [SQP] - O - [SO0] - a - [SPO0] - O - [sYW] - S - [sYWD] - H - [rSID] - S - [rSI] - [SQP] - O - [SQP] - O - [SO0] - a - [SPO0] - O" },
    { nome: "Trem Bala - Intro", seq: "C4 C4 C4 - G4 - A4 - G4 - F4 - E4 - F4 - D4" }
];

// === MAPEAMENTO VISUAL (rótulos nas teclas) ===
const noteLabelMap = {
    'C1':'1', 'D1':'2', 'E1':'3', 'F1':'4', 'G1':'5', 'A1':'6', 'B1':'7',
    'C2':'8', 'D2':'9', 'E2':'0', 'F2':'q', 'G2':'w', 'A2':'e', 'B2':'r',
    'C3':'t', 'D3':'y', 'E3':'u', 'F3':'i', 'G3':'o', 'A3':'p', 'B3':'a',
    'C4':'s', 'D4':'d', 'E4':'f', 'F4':'g', 'G4':'h', 'A4':'j', 'B4':'k',
    'C5':'l', 'D5':'z', 'E5':'x', 'F5':'c', 'G5':'v', 'A5':'b', 'B5':'n', 'C6':'m',
    'C#1':'!', 'D#1':'@', 'F#1':'$', 'G#1':'%', 'A#1':'*',
    'C#2':'(', 'D#2':'Q', 'F#2':'W', 'G#2':'E', 'A#2':'T',
    'C#3':'Y', 'D#3':'I', 'F#3':'O', 'G#3':'P', 'A#3':'S',
    'C#4':'D', 'D#4':'G', 'F#4':'H', 'G#4':'J', 'A#4':'L',
    'C#5':'Z', 'D#5':'C', 'F#5':'V', 'G#5':'B'
};

// === MAPEAMENTO TECLADO → NOTA ===
const keyMap = {
    '1':'C1', '2':'D1', '3':'E1', '4':'F1', '5':'G1', '6':'A1', '7':'B1',
    '8':'C2', '9':'D2', '0':'E2', 'q':'F2', 'w':'G2', 'e':'A2', 'r':'B2',
    't':'C3', 'y':'D3', 'u':'E3', 'i':'F3', 'o':'G3', 'p':'A3', 'a':'B3',
    's':'C4', 'd':'D4', 'f':'E4', 'g':'F4', 'h':'G4', 'j':'A4', 'k':'B4',
    'l':'C5', 'z':'D5', 'x':'E5', 'c':'F5', 'v':'G5', 'b':'A5', 'n':'B5', 'm':'C6',
    '!':'C#1', '@':'D#1', '$':'F#1', '%':'G#1', '*':'A#1',
    '(':'C#2', 'Q':'D#2', 'W':'F#2', 'E':'G#2', 'T':'A#2',
    'Y':'C#3', 'I':'D#3', 'O':'F#3', 'P':'G#3', 'S':'A#3',
    'D':'C#4', 'G':'D#4', 'H':'F#4', 'J':'G#4', 'L':'A#4',
    'Z':'C#5', 'C':'D#5', 'V':'F#5', 'B':'G#5'
};

// === MAPEAMENTO INVERSO ===
const noteToKey = {};
for (const [note, key] of Object.entries(noteLabelMap)) {
    noteToKey[note] = key;
}

// === GRAVAÇÃO E SEQUÊNCIA ===
let isRecording = false;
let recording = [];
let recordingStartTime = 0;
let currentSequence = [];
let isPlayingMusic = false;
let playbackSpeed = 1.0;

// === INICIALIZAÇÃO DO ÁUDIO ===
document.addEventListener('click', () => {
    if (!context) {
        context = new (window.AudioContext || window.webkitAudioContext)();
        // 🟢 NOVO: Inicializa o nó de ganho principal e conecta-o ao destino
        mainGainNode = context.createGain();
        mainGainNode.connect(context.destination); 
        
        loadBaseSound();
        // Chama a introdução após a inicialização do contexto
        playIntroMusic(); 
    }
}, { once: true });


// 🟢 NOVO: FUNÇÃO DE FADE-OUT E INTRODUÇÃO
function playIntroMusic() {
    if (!context || !mainGainNode) return;

    // 1. Sequência da música (a nova música é a última do array)
    const tremBalaIndex = MUSICAS.length - 1;
    const seqString = MUSICAS[tremBalaIndex].seq;
    const seqList = parseSequenceString(seqString);

    // 2. Implementa o fade-out no nó de ganho principal
    const fadeDuration = 5.0; // 5 segundos
    
    // Configura o volume inicial para 100%
    mainGainNode.gain.setValueAtTime(1.0, context.currentTime); 

    // Diminui o volume lentamente até 0% em 5 segundos
    mainGainNode.gain.linearRampToValueAtTime(0.0, context.currentTime + fadeDuration);
    
    // Força a reprodução, passando 'true' para o parâmetro isIntro
    playSequenceFromList(seqList, true); 
}

// === FUNÇÕES DE ÁUDIO ===
function getFrequency(note) {
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const A4Index = 43;
    let noteIndex = -1;
    for (let octave = 0; octave <= 8; octave++) {
        for (let i = 0; i < notes.length; i++) {
            noteIndex++;
            if (notes[i] + octave === note) {
                const n = noteIndex - A4Index;
                return parseFloat((440 * Math.pow(2, n / 12)).toFixed(2));
            }
        }
    }
    return 0;
}

function updateDisplay(note) {
    const freq = getFrequency(note);
    document.getElementById('current-note').textContent = note;
    document.getElementById('current-frequency').textContent = `${freq} Hz`;
}

function loadBaseSound() {
    if (!context) return Promise.reject("AudioContext não inicializado");
    baseNoteFrequency = getFrequency(BASE_NOTE);

    const localPath = 'sons/69.ogg';
    const onlinePath = 'https://cdn.jsdelivr.net/gh/gleitz/midi-js-soundfonts@master/FluidR3_GM/piano-ogg/C4.ogg';

    return fetch(localPath)
        .then(response => {
            if (response.ok) return response.arrayBuffer();
            console.warn("Arquivo local não encontrado. Tentando online...");
            return fetch(onlinePath).then(r => r.arrayBuffer());
        })
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            baseNoteBuffer = audioBuffer;
            console.log("Som base carregado com sucesso!");
            return audioBuffer;
        })
        .catch(error => {
            console.error("Falha ao carregar som:", error);
            alert("Erro: Não foi possível carregar o som do piano.");
            throw error;
        });
}

function playNote(note) {
    if (!context || !baseNoteBuffer) return;
    const targetFrequency = getFrequency(note);
    const playbackRate = targetFrequency / baseNoteFrequency;

    const source = context.createBufferSource();
    const gainNode = context.createGain();

    source.buffer = baseNoteBuffer;
    source.playbackRate.value = playbackRate;
    source.connect(gainNode);
    gainNode.connect(context.destination);

    const now = context.currentTime;
    const fadeOutTime = 1.5;
    const endTime = now + fadeOutTime;

    let startVolume = 0.8;
    if (playbackRate < 1.0) {
        const boost = (1.0 - playbackRate) * 0.5;
        startVolume = 0.8 * (1.0 + boost);
    }
    if (startVolume > 1.2) startVolume = 1.2;

    if (isRecording) {
        const timeOffset = performance.now() - recordingStartTime;
        recording.push({ note: note, time: timeOffset });
    }

    gainNode.gain.setValueAtTime(startVolume, now);
    gainNode.gain.linearRampToValueAtTime(0.0, endTime);

    source.start(now);
    source.stop(endTime);
}

// === RENDERIZAÇÃO DO PIANO ===
// ... (Linha 329, início da função renderPiano)

// === RENDERIZAÇÃO DO PIANO ===
function renderPiano() {
    const piano = document.getElementById('piano');
    piano.innerHTML = '';
    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    let whiteIndex = 0;

    // Ajustado para gerar o total de 36 teclas (C1 a C6)
    // C1 a B5 são 5 oitavas completas (35 notas). C6 é a 36ª.
    for (let octave = 1; octave <= 6; octave++) {
        for (let i = 0; i < notes.length; i++) {
            const note = notes[i] + octave;

            // Se for C6 e já tiver sido gerado no loop, paramos aqui
            if (octave === 6 && notes[i] !== 'C') {
                break; 
            }
            
            if (notes[i].length === 1) { // Teclas Brancas
                const white = document.createElement('div');
                white.className = 'key white-key';
                white.dataset.note = note;
                const label = noteLabelMap[note] || '';
                white.innerHTML = `<span class="note-label">${label}</span>`;
                
                // Largura da tecla branca: 36px
                white.style.left = `${whiteIndex * 36}px`;
                piano.appendChild(white);

                // Teclas Pretas
                if (notes[i + 1]?.includes('#') && octave < 6) { // Pretas até B5 (a última C6 não tem preta)
                    const blackNote = notes[i + 1] + octave;
                    if (noteLabelMap[blackNote]) {
                        const black = document.createElement('div');
                        black.className = 'key black-key';
                        black.dataset.note = blackNote;
                        black.innerHTML = `<span class="note-label">${noteLabelMap[blackNote]}</span>`;
                        black.style.left = `${(whiteIndex * 36) + 24}px`;
                        piano.appendChild(black);
                    }
                }
                whiteIndex++;
            }
        }
    }
    
    // O total de teclas brancas geradas agora é 21.
    // A largura do piano deve ser 21 * 36px = 756px.
    piano.style.width = `${whiteIndex * 36}px`;


    document.querySelectorAll('.key').forEach(key => {
        // ... (restante da função)
    });
}

// === EVENTOS DO TECLADO ===
document.addEventListener('keydown', e => {
    const note = keyMap[e.key];
    if (note && !e.repeat) {
        const keyEl = document.querySelector(`[data-note="${note}"]`);
        if (keyEl) {
            keyEl.classList.add('active');
            playNote(note);
            updateDisplay(note);
            createSpark(keyEl);

            if (!isRecording && !isPlayingMusic) {
                const keyLabel = noteToKey[note];
                const isBlack = note.includes('#');
                currentSequence.push({ notes: note, display: keyLabel, isChord: false, isBlack });
                updateVisualSequence();
            }
        }
    }
});

document.addEventListener('keyup', e => {
    const note = keyMap[e.key];
    if (note) {
        const keyEl = document.querySelector(`[data-note="${note}"]`);
        if (keyEl) keyEl.classList.remove('active');
    }
});

// === EFEITO DE FAÍSCA ===
function createSpark(keyElement) {
    const oldSpark = keyElement.querySelector('.spark-effect');
    if (oldSpark) oldSpark.remove();
    const spark = document.createElement('div');
    spark.className = 'spark-effect';
    keyElement.appendChild(spark);
    spark.addEventListener('animationend', () => spark.remove());
}

// === GRAVAÇÃO ===
function toggleRecording() {
    const recordButton = document.getElementById('recordButton');
    const playButton = document.getElementById('playButton');
    const downloadButton = document.getElementById('downloadButton');

    isRecording = !isRecording;
    if (isRecording) {
        recording = [];
        currentSequence = [];
        updateVisualSequence();
        recordingStartTime = performance.now();
        recordButton.textContent = 'Stop Parar';
        recordButton.classList.add('recording');
        playButton.disabled = true;
        downloadButton.disabled = true;
    } else {
        recordButton.textContent = 'Record Gravar';
        recordButton.classList.remove('recording');
        if (recording.length > 0) {
            playButton.disabled = false;
            downloadButton.disabled = false;
        }
    }
}

function playRecording() {
    if (recording.length === 0) return;

    const recordButton = document.getElementById('recordButton');
    const playButton = document.getElementById('playButton');
    const downloadButton = document.getElementById('downloadButton');

    recordButton.disabled = true;
    playButton.disabled = true;
    downloadButton.disabled = true;

    currentSequence = recording.map(item => {
        const note = item.note;
        const keyLabel = noteToKey[note];
        return { notes: note, display: keyLabel, isChord: false, isBlack: note.includes('#') };
    });
    updateVisualSequence();

    const promises = [];
    recording.forEach((event, index) => {
        const promise = new Promise(resolve => {
            setTimeout(() => {
                playNote(event.note);
                highlightKeyInSequence(index);

                const keyEl = document.querySelector(`[data-note="${event.note}"]`);
                if (keyEl) {
                    keyEl.classList.add('active');
                    setTimeout(() => keyEl.classList.remove('active'), 100);
                }
                resolve();
            }, event.time);
        });
        promises.push(promise);
    });

    const totalDuration = recording[recording.length - 1].time;
    setTimeout(() => {
        recordButton.disabled = false;
        playButton.disabled = false;
        downloadButton.disabled = false;
        highlightKeyInSequence(-1);
    }, totalDuration + 1500);
}

function downloadRecording() {
    if (recording.length === 0) return;
    const jsonString = JSON.stringify(recording, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minha-gravacao.json';
    a.click();
    URL.revokeObjectURL(url);
}

// === LEITOR VISUAL ===
const sequenceTrack = document.getElementById('sequenceTrack');
const sequenceReader = document.getElementById('sequenceReader');

function updateVisualSequence() {
    if (!sequenceTrack || isPlayingMusic) return;
    sequenceTrack.innerHTML = '';
    currentSequence.forEach((item, i) => {
        const span = document.createElement('span');
        span.className = 'sequence-item';
        span.textContent = item.display;
        if (item.isBlack) span.classList.add('black');
        else if (item.isChord) span.classList.add('chord');
        else span.classList.add('white');
        span.dataset.index = i;
        sequenceTrack.appendChild(span);
    });
    scrollToCurrentNote(-1);
}

function scrollToCurrentNote(index) {
    if (!sequenceReader || !sequenceTrack) return;
    const item = sequenceTrack.querySelector(`.sequence-item[data-index="${index - 2}"]`);
    if (item) {
        const newTransformX = -item.offsetLeft + (sequenceReader.offsetWidth / 2) - (item.offsetWidth / 2) - 25;
        sequenceTrack.style.transform = `translateX(${newTransformX}px)`;
    } else {
        sequenceTrack.style.transform = `translateX(0px)`;
    }
}

function highlightKeyInSequence(index) {
    if (!sequenceTrack) return;
    sequenceTrack.querySelectorAll('.sequence-item').forEach((el, i) => {
        el.classList.toggle('playing', i === index);
    });
    scrollToCurrentNote(index);
}

// === REPRODUÇÃO DE MÚSICA ===
function parseToken(token) {
    const isChord = token.startsWith('[') && token.endsWith(']');
    const clean = token.replace(/[\[\]]/g, '').trim();
    if (!clean) return [];
    const keys = clean.split('');
    const notes = keys.map(k => keyMap[k.toUpperCase()] || keyMap[k]).filter(Boolean);
    if (notes.length === 0) return [];
    return [{
        notes: notes.join(','),
        display: keys.join(''),
        isChord: isChord || notes.length > 1,
        isBlack: notes[0].includes('#')
    }];
}

function parseSequenceString(str) {
    const parts = str.split(/\s+/);
    const result = [];
    let buffer = '';
    for (let t of parts) {
        if (t === '-' || t === '--') {
            if (buffer) result.push(...parseToken(buffer));
            buffer = '';
            result.push({ isPause: true, duration: t === '--' ? 400 : 200 });
        } else {
            buffer += (buffer ? ' ' : '') + t;
        }
    }
    if (buffer) result.push(...parseToken(buffer));
    return result.filter(x => x);
}

function playSequenceFromList(seq) {
    if (isPlayingMusic) return;
    isPlayingMusic = true;
    currentSequence = seq;

    const recordButton = document.getElementById('recordButton');
    const playButton = document.getElementById('playButton');
    const playMusicButton = document.getElementById('playMusicButton');
    recordButton.disabled = playButton.disabled = playMusicButton.disabled = true;

    sequenceTrack.innerHTML = '';
    currentSequence.forEach((item, i) => {
        if (item.isPause) return;
        const span = document.createElement('span');
        span.className = 'sequence-item';
        span.textContent = item.display;
        if (item.isBlack) span.classList.add('black');
        else if (item.isChord) span.classList.add('chord');
        else span.classList.add('white');
        span.dataset.index = i;
        sequenceTrack.appendChild(span);
    });
    scrollToCurrentNote(-1);

    let time = 0;
    const baseNoteDuration = 200;
    const noteDuration = baseNoteDuration / playbackSpeed;
    const playPromises = [];

    seq.forEach((item, index) => {
        if (item.isPause) {
            time += item.duration;
        } else {
            const notesToPlay = item.notes.split(',');
            notesToPlay.forEach(note => {
                playPromises.push(new Promise(resolve => {
                    setTimeout(() => {
                        playNote(note);
                        const keyEl = document.querySelector(`[data-note="${note}"]`);
                        if (keyEl) {
                            keyEl.classList.add('active');
                            setTimeout(() => keyEl.classList.remove('active'), noteDuration - 50);
                        }
                        resolve();
                    }, time);
                }));
            });
            playPromises.push(new Promise(resolve => {
                setTimeout(() => {
                    highlightKeyInSequence(index);
                    resolve();
                }, time);
            }));
            time += noteDuration;
        }
    });

    Promise.all(playPromises).then(() => {
        highlightKeyInSequence(-1);
        setTimeout(() => {
            recordButton.disabled = playButton.disabled = playMusicButton.disabled = false;
            isPlayingMusic = false;
        }, noteDuration + 1500);
    });
}

// === CONTROLES DE MÚSICA ===
function setupMusicControls() {
    const musicSelect = document.getElementById('musicSelect');
    const playMusicButton = document.getElementById('playMusicButton');
    const clearSequence = document.getElementById('clearSequence');

    MUSICAS.forEach((musica, i) => {
        const opt = document.createElement('option');
        opt.value = i + 1;
        opt.textContent = musica.nome;
        musicSelect.appendChild(opt);
    });

    playMusicButton.addEventListener('click', () => {
        const idx = parseInt(musicSelect.value);
        if (idx > 0) {
            playSequenceFromList(parseSequenceString(MUSICAS[idx - 1].seq));
        } else {
            alert("Selecione uma música primeiro.");
        }
    });

    clearSequence.addEventListener('click', () => {
        currentSequence = [];
        recording = [];
        updateVisualSequence();
        musicSelect.value = "";
        document.getElementById('playButton').disabled = true;
        document.getElementById('downloadButton').disabled = true;
    });
}

// === CONFIGURAÇÕES AVANÇADAS ===
let rgbInterval = null;

function lighten(color, percent) {
    const num = parseInt(color.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 255) + amt;
    const B = (num & 255) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

function applyColors() {
    const white = document.getElementById('whiteColor').value;
    const black = document.getElementById('blackColor').value;
    document.querySelectorAll('.white-key').forEach(k => {
        k.style.background = `linear-gradient(to bottom, ${white} 0%, ${lighten(white, -10)} 50%, ${lighten(white, -30)} 100%)`;
    });
    document.querySelectorAll('.black-key').forEach(k => {
        k.style.background = `linear-gradient(to bottom, ${black} 0%, ${lighten(black, -20)} 100%)`;
    });
}

function toggleRGB(enabled) {
    const piano = document.querySelector('.piano');
    if (enabled) {
        piano.classList.add('rgb-effect');
        if (!rgbInterval) {
            rgbInterval = setInterval(() => {
                const hue = Math.random() * 360;
                piano.style.filter = `hue-rotate(${hue}deg)`;
            }, 800);
        }
    } else {
        piano.classList.remove('rgb-effect');
        piano.style.filter = '';
        if (rgbInterval) {
            clearInterval(rgbInterval);
            rgbInterval = null;
        }
    }
}

function updateKeyMapper() {
    const container = document.getElementById('keyMapper');
    container.innerHTML = '';
    const whites = ['C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6'];
    whites.forEach(note => {
        const key = Object.keys(keyMap).find(k => keyMap[k] === note) || '?';
        const div = document.createElement('div');
        div.className = 'key-item';
        div.textContent = key;
        div.onclick = () => {
            const newKey = prompt(`Nova tecla para ${note}:`, key);
            if (newKey && newKey.length === 1) {
                if (key !== '?') delete keyMap[key];
                keyMap[newKey] = note;
                noteLabelMap[note] = newKey;
                updateKeyMapper();
                renderPiano();
            }
        };
        container.appendChild(div);
    });
}

// === INICIALIZAÇÃO FINAL (SÓ UM DOMContentLoaded!) ===
document.addEventListener('DOMContentLoaded', () => {
    // 1. Renderiza o piano IMEDIATAMENTE (CORREÇÃO DO BUG)
    renderPiano();
    updateDisplay('C4');
    loadBaseSound().catch(() => {}); // O som continua a tentar carregar em segundo plano

    // 2. Configurações salvas (LÓGICA DE PERSISTÊNCIA REMOVIDA)
    const loadConfig = () => {
        // A lógica de carregar de localStorage foi removida, 
        // pois os botões de Salvar/Resetar e a persistência não são mais necessários.
        applyColors();
        const rgbToggle = document.getElementById('rgbToggle');
        toggleRGB(rgbToggle.checked);
        updateKeyMapper();
    };

    // 3. Eventos de configuração
    // OS EVENT LISTENERS DOS BOTÕES "SALVAR" E "RESETAR" FORAM REMOVIDOS.

    document.getElementById('whiteColor').oninput = applyColors;
    document.getElementById('blackColor').oninput = applyColors;
    document.getElementById('rgbToggle').onchange = e => toggleRGB(e.target.checked);

    document.querySelector('[data-modal="modal3"]').onclick = () => {
        // A função loadConfig é chamada aqui para atualizar o keyMapper quando o modal é aberto.
        setTimeout(loadConfig, 300);
    };

    // 4. Volume, cores, nome, RGB antigo (REMOVIDA A LÓGICA DE localStorage)
    window.globalVolume = 1.0;
    const volSlider = document.getElementById('volumeSlider');
    const volDisplay = document.getElementById('volumeDisplay');
    if (volSlider) {
        volSlider.addEventListener('input', (e) => {
            const vol = e.target.value / 100;
            window.globalVolume = vol;
            volDisplay.textContent = e.target.value + '%';
            // localStorage.setItem('pianoVol', e.target.value); // REMOVIDO
        });
        const savedVol = 100; // Valor padrão fixo
        volSlider.value = savedVol;
        volDisplay.textContent = savedVol + '%';
        window.globalVolume = savedVol / 100;
    }

    document.getElementById('whiteKeyColor')?.addEventListener('input', (e) => {
        const color = e.target.value;
        document.querySelectorAll('.key.white-key').forEach(k => {
            k.style.background = `linear-gradient(to bottom, ${color}, ${lighten(color,-20)}, ${lighten(color,-40)})`;
        });
        // localStorage.setItem('whiteKeyColor', color); // REMOVIDO
    });

    document.getElementById('keyOpacitySlider')?.addEventListener('input', (e) => {
        const op = e.target.value / 100;
        document.querySelectorAll('.key').forEach(k => k.style.opacity = op);
        document.getElementById('opacityDisplay').textContent = e.target.value + '%';
        // localStorage.setItem('keyOpacity', e.target.value); // REMOVIDO
    });

    document.getElementById('saveNameBtn')?.addEventListener('click', () => {
        const name = document.getElementById('displayNameInput').value.trim();
        if (name) {
            document.getElementById('userEmailDisplay').textContent = name;
            // localStorage.setItem('displayName', name); // REMOVIDO
            alert('Nome salvo: ' + name);
            document.getElementById('displayNameInput').value = '';
        }
    });

    const rgbToggle = document.getElementById('rgbModeToggle');
    if (rgbToggle) {
        rgbToggle.addEventListener('change', (e) => {
            document.body.classList.toggle('rgb-mode', e.target.checked);
            // localStorage.setItem('rgbMode', e.target.checked); // REMOVIDO
        });
        // if (localStorage.getItem('rgbMode') === 'true') { // REMOVIDO
        //     rgbToggle.checked = true;
        //     document.body.classList.add('rgb-mode');
        // }
    }

    // 5. Chat de ajuda
    const conversationDisplay = document.getElementById('conversation-display');
    const choicesArea = document.getElementById('choices-area');
    const restartButton = document.getElementById('restart-button');

    const conversationNodes = {
        start: { message: "Olá! Como posso te ajudar com o Piano Virtual hoje?", choices: [
            { text: "Como tocar com o teclado?", next: "teclado" },
            { text: "Como gravar uma música?", next: "gravar" },
            { text: "O som não está saindo", next: "sem_som" },
            { text: "Como mudar as cores?", next: "cores" },
            { text: "Quero falar com humano", next: "humano" }
        ]},
        teclado: { message: "Use as teclas do seu teclado físico!\n\n• a s d f g h j → C4 a B4\n• z x c v b n m → C3 a B3\n• q w e r t y u → C5 a B5\n\nTeclas pretas: segure Shift + letra", choices: [{ text: "Entendi, valeu!", next: "start" }]},
        gravar: { message: "Clique em 'Record Gravar' → toque sua música → clique novamente para parar.\n\nDepois use 'Play Tocar' ou 'Download Baixar' para ouvir/salvar!", choices: [{ text: "Show! Obrigado", next: "start" }]},
        sem_som: { message: "Clique em qualquer tecla do piano primeiro!\n\nO navegador só libera som após uma interação (regra de segurança).\n\nDepois disso tudo funciona normalmente!", choices: [{ text: "Agora deu certo!", next: "start" }]},
        cores: { message: "Abra o menu (≡) → Configurações → use o seletor de cor das teclas brancas.\n\nTem também modo RGB no fundo!", choices: [{ text: "Perfeito!", next: "start" }]},
        humano: { message: "Hehe sou só um robô muito bem feito\n\nMas pode mandar mensagem pra gente no:\ncontato@pianovirtual.com\n\nA gente responde rapidinho!", choices: [{ text: "Haha tudo bem!", next: "start" }]}
    };

    let currentNode = 'start';

    const addMessage = (text, type) => {
        const div = document.createElement('div');
        div.className = `message ${type}-message`;
        div.innerHTML = text.replace(/\n/g, '<br>');
        conversationDisplay.appendChild(div);
        conversationDisplay.scrollTop = conversationDisplay.scrollHeight;
    };

    const showChoices = (node) => {
        choicesArea.innerHTML = '';
        node.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-button';
            btn.textContent = choice.text;
            btn.onclick = () => {
                addMessage(choice.text, 'user');
                currentNode = choice.next;
                addMessage(conversationNodes[currentNode].message, 'bot');
                showChoices(conversationNodes[currentNode]);
            };
            choicesArea.appendChild(btn);
        });
    };

    const ajudaModal = document.getElementById('modal5');
    const observer = new MutationObserver(() => {
        if (ajudaModal.classList.contains('open')) {
            setTimeout(() => {
                conversationDisplay.innerHTML = '<div class="message bot-message">Olá! Como posso te ajudar hoje? <span style="font-size:0.8em">♫</span></div>';
                showChoices(conversationNodes.start);
            }, 300);
        }
    });
    observer.observe(ajudaModal, { attributes: true });

    restartButton.onclick = () => {
        conversationDisplay.innerHTML = '<div class="message bot-message">Olá! Como posso te ajudar hoje? <span style="font-size:0.8em">♫</span></div>';
        showChoices(conversationNodes.start);
    };

    // 6. Slider de velocidade
    const sequencePointer = document.getElementById('sequencePointer');
    const sliderContainer = sequencePointer.querySelector('.speed-slider-container');
    const track = sliderContainer.querySelector('.speed-slider-track');
    const thumb = document.getElementById('speedSliderThumb');
    const speedDisplay = document.getElementById('speedValueDisplay');
    let isDragging = false;

    const updateSpeed = (mouseY) => {
        const trackRect = track.getBoundingClientRect();
        const trackHeight = trackRect.height;
        let relativeY = trackRect.bottom - mouseY;
        relativeY = Math.max(0, Math.min(trackHeight, relativeY));
        const percentage = relativeY / trackHeight;
        playbackSpeed = (percentage * 1.5) + 0.5;
        thumb.style.bottom = `calc(${percentage * 100}% - 11px)`;
        speedDisplay.textContent = `${playbackSpeed.toFixed(1)}x`;
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        updateSpeed(clientY);
    };

    const stopDrag = () => {
        isDragging = false;
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('touchend', stopDrag);
    };

    thumb.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        isDragging = true;
        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', stopDrag);
    });
    thumb.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        isDragging = true;
        document.addEventListener('touchmove', onDrag);
        document.addEventListener('touchend', stopDrag);
    });

    track.addEventListener('click', (e) => {
        e.stopPropagation();
        updateSpeed(e.clientY);
    });

    sequencePointer.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isDragging) return;
        sequencePointer.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        sequencePointer.classList.remove('open');
    });

    // 7. Login, menu, modais, botões
    setupMusicControls();

    document.getElementById('loginModal').classList.add('open');
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const user = USERS.find(u => u.email === email && u.password === password);
        if (user) {
            document.getElementById('loginModal').classList.remove('open');
            document.getElementById('userInfo').style.display = 'flex';
            document.getElementById('userEmailDisplay').textContent = user.name;
        } else {
            document.getElementById('loginError').style.display = 'block';
        }
    });

    document.getElementById('logoutBtn').addEventListener('click', () => {
        document.getElementById('userInfo').style.display = 'none';
        document.getElementById('loginModal').classList.add('open');
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('loginError').style.display = 'none';
    });

    const menuButton = document.getElementById('menuButton');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        menuButton.classList.toggle('open');
        sidebarOverlay.classList.toggle('open');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('open');
        menuButton.classList.remove('open');
        sidebarOverlay.classList.remove('open');
    });

    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        menuButton.classList.remove('open');
        sidebarOverlay.classList.remove('open');
    });

    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => closeBtn.closest('.modal').classList.remove('open'));
    });

    document.querySelectorAll('.sidebar-menu button[data-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            document.getElementById(modalId)?.classList.add('open');
            sidebar.classList.remove('open');
            menuButton.classList.remove('open');
            sidebarOverlay.classList.remove('open');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) e.target.classList.remove('open');
    });

    document.getElementById('recordButton').addEventListener('click', toggleRecording);
    document.getElementById('playButton').addEventListener('click', playRecording);
    document.getElementById('downloadButton').addEventListener('click', downloadRecording);
});
renderPiano();

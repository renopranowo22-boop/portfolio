const responses = {
  siapa: 'Saya Reno, lulusan S1 Teknik Informatika Universitas Muhammadiyah Prof. Dr. HAMKA dengan IPK 3,23. Saya tertarik pada pengembangan web dan kecerdasan buatan.',
  proyek: 'Saya mengembangkan chatbot layanan informasi kampus untuk BPTI UHAMKA dari tahap awal menggunakan DialoGPT dan Gemini API. Proyek ini juga menjadi topik skripsi saya.',
  skill: 'HTML, CSS, JavaScript, MySQL, Word, PowerPoint, Excel, dan Canva, semuanya level dasar. Saya juga terbiasa bekerja dalam tim dan di bawah tekanan.',
  pengalaman: 'Saya PKL di bagian AI BPTI UHAMKA (Mei–Agu 2025) dan bekerja paruh waktu sekitar dua tahun di beberapa coffee shop. Pengalaman tersebut melatih saya bekerja cepat, disiplin mengatur waktu, tetap teliti saat operasional padat, dan membagi waktu antara studi dengan pekerjaan.',
  kontak: 'Email: renopranowo22@gmail.com. WhatsApp: 0813-1722-4580.',
  kopi: 'Saya bekerja paruh waktu di beberapa coffee shop selama kurang lebih dua tahun. Pengalaman ini melatih saya bekerja cepat, disiplin mengatur waktu, tetap teliti saat ramai, dan membagi waktu antara studi dengan pekerjaan.'
};

const keywordMap = [
  ['siapa', ['siapa', 'tentang', 'kenalan', 'nama']],
  ['proyek', ['proyek', 'chatbot', 'skripsi', 'project', 'bpti']],
  ['skill', ['skill', 'keahlian', 'bisa', 'teknologi', 'tools', 'bahasa']],
  ['pengalaman', ['pengalaman', 'kerja', 'pkl', 'magang']],
  ['kopi', ['kopi', 'coffee', 'barista']],
  ['kontak', ['kontak', 'email', 'hubungi', 'wa', 'telepon', 'nomor']]
];

const quickQuestions = [
  ['Siapa Reno?', 'siapa'],
  ['Proyeknya apa?', 'proyek'],
  ['Skill apa saja?', 'skill'],
  ['Cara menghubungi', 'kontak']
];

const log = document.getElementById('log');
const input = document.getElementById('q');
const chipsWrap = document.getElementById('chips');
const form = document.getElementById('f');
const track = document.getElementById('track');
const fallbackResponse =
  'Maaf, saya belum paham pertanyaan itu. Coba tanya soal proyek, skill, pengalaman, atau kontak Reno.';

function addMessage(text, type) {
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;
  log.appendChild(message);
  log.scrollTop = log.scrollHeight;

  return message;
}

function findResponseKey(question) {
  const questionWords = new Set(question.toLowerCase().match(/[a-z0-9]+/g) ?? []);
  const match = keywordMap.find(([, keywords]) =>
    keywords.some((keyword) => questionWords.has(keyword))
  );

  return match?.[0] ?? null;
}

function askQuestion(text, key = null) {
  addMessage(text, 'me');

  const responseKey = key ?? findResponseKey(text);
  const typingMessage = addMessage('•••', 'bot typing');

  setTimeout(() => {
    typingMessage.classList.remove('typing');
    typingMessage.textContent = responses[responseKey] ?? fallbackResponse;
    log.scrollTop = log.scrollHeight;
  }, 550);
}

function renderQuickQuestions() {
  quickQuestions.forEach(([label, key]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.addEventListener('click', () => askQuestion(label, key));
    chipsWrap.appendChild(button);
  });
}

function handleQuestionSubmit(event) {
  event.preventDefault();
  const question = input.value.trim();

  if (!question) {
    return;
  }

  askQuestion(question);
  input.value = '';
}

function scrollSkills(distance) {
  track.scrollBy({ left: distance, behavior: 'smooth' });
}

function initializeChatbot() {
  renderQuickQuestions();
  form.addEventListener('submit', handleQuestionSubmit);
  addMessage(
    'Halo! Saya bot kecil yang tahu soal Reno. Pilih pertanyaan di bawah atau ketik sendiri.',
    'bot'
  );
}

initializeChatbot();

document.getElementById('prev').addEventListener('click', () => scrollSkills(-340));
document.getElementById('next').addEventListener('click', () => scrollSkills(340));

// script.js

let currentQuestion = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let unattemptedCount = 0;

const questions = [
  { q: "Which city is known as the cultural capital of India?", options: ["Mumbai", "Kolkata", "Chennai", "Delhi"], answer: 1 },
  { q: "Which Indian festival is known as the festival of lights?", options: ["Holi", "Dussehra", "Diwali", "Eid"], answer: 2 },
  { q: "Which is the classical dance of Tamil Nadu?", options: ["Kathak", "Bharatanatyam", "Odissi", "Kuchipudi"], answer: 1 },
  { q: "Which language is the most spoken in India?", options: ["Hindi", "Bengali", "Tamil", "Marathi"], answer: 0 },
  { q: "Which state is famous for the Bihu festival?", options: ["Punjab", "Assam", "Bihar", "Kerala"], answer: 1 },
  { q: "What is the name of the Indian festival of colors?", options: ["Diwali", "Holi", "Onam", "Pongal"], answer: 1 },
  { q: "Which Indian monument is also a UNESCO World Heritage Site?", options: ["Gateway of India", "India Gate", "Taj Mahal", "Red Fort"], answer: 2 },
  { q: "Who is considered the Father of the Nation in India?", options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Bhagat Singh", "Mahatma Gandhi"], answer: 3 },
  { q: "Where is the Golden Temple located?", options: ["Delhi", "Amritsar", "Chandigarh", "Lucknow"], answer: 1 },
  { q: "Which Indian festival celebrates the bond of brothers and sisters?", options: ["Raksha Bandhan", "Karva Chauth", "Bhai Dooj", "Janmashtami"], answer: 0 },
  { q: "Which Indian state is known for its backwaters?", options: ["Goa", "Tamil Nadu", "Kerala", "Andhra Pradesh"], answer: 2 },
  { q: "What is the national language of India?", options: ["English", "Hindi", "Sanskrit", "Urdu"], answer: 1 },
  { q: "Which city is known as the Pink City?", options: ["Udaipur", "Jodhpur", "Jaipur", "Bikaner"], answer: 2 },
  { q: "Where is the Jagannath Temple located?", options: ["Odisha", "West Bengal", "Bihar", "Madhya Pradesh"], answer: 0 },
  { q: "Which is the harvest festival of Punjab?", options: ["Pongal", "Lohri", "Onam", "Bihu"], answer: 1 },
  { q: "Which dance form is from Andhra Pradesh?", options: ["Bharatanatyam", "Kathak", "Kuchipudi", "Mohiniyattam"], answer: 2 },
  { q: "Which Indian state celebrates Pongal?", options: ["Kerala", "Tamil Nadu", "Karnataka", "Maharashtra"], answer: 1 },
  { q: "Where is the Sun Temple of India located?", options: ["Konark", "Madurai", "Hampi", "Rameswaram"], answer: 0 },
  { q: "Which Indian leader gave the slogan 'Jai Jawan Jai Kisan'?", options: ["Indira Gandhi", "Lal Bahadur Shastri", "Rajiv Gandhi", "Sardar Patel"], answer: 1 },
  { q: "Which Indian language is written in the Gurmukhi script?", options: ["Punjabi", "Gujarati", "Kannada", "Urdu"], answer: 0 },
  { q: "Which Indian state is known for Garba dance?", options: ["Rajasthan", "Gujarat", "Madhya Pradesh", "Odisha"], answer: 1 },
  { q: "Where is Meenakshi Temple located?", options: ["Chennai", "Madurai", "Thanjavur", "Trichy"], answer: 1 },
  { q: "Which Indian musical instrument is made of bamboo?", options: ["Sitar", "Veena", "Flute", "Tabla"], answer: 2 },
  { q: "What is the major festival of Kerala?", options: ["Onam", "Baisakhi", "Ugadi", "Navratri"], answer: 0 },
  { q: "Which folk dance originates from Rajasthan?", options: ["Lavani", "Garba", "Ghoomar", "Yakshagana"], answer: 2 },
  { q: "Which language is classical and originated in South India?", options: ["Hindi", "Marathi", "Kannada", "Sanskrit"], answer: 2 },
  { q: "What does 'Namaste' mean in Indian culture?", options: ["Goodbye", "Thank you", "Hello with respect", "Sorry"], answer: 2 },
  { q: "Which Indian river is considered sacred?", options: ["Godavari", "Yamuna", "Krishna", "Ganga"], answer: 3 },
  { q: "Which Indian leader's birthday is celebrated as Children's Day?", options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Dr. B.R. Ambedkar"], answer: 1 },
  { q: "Which Indian city is famous for its Mysore Palace?", options: ["Bangalore", "Chennai", "Hyderabad", "Mysore"], answer: 3 }
];

function showInstructions() {
  document.getElementById('welcomePage').classList.add('hidden');
  document.getElementById('instructionPage').classList.remove('hidden');
}

function startQuiz() {
  document.getElementById('instructionPage').classList.add('hidden');
  document.getElementById('quizPage').classList.remove('hidden');
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('questionNumber').innerText = `Question ${currentQuestion + 1}`;
  document.getElementById('questionText').innerText = q.q;
  
  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="radio" name="option" value="${idx}"> ${opt}`;
    container.appendChild(label);
  });
  document.getElementById('answerStatus').innerText = '';
  label.innerHTML = `<input type="radio" name="option" value="${idx}"><span>${opt}</span>`;

}

function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) {
    const isCorrect = parseInt(selected.value) === questions[currentQuestion].answer;
    selected.parentElement.classList.add(isCorrect ? 'correct' : 'incorrect');
    document.getElementById('answerStatus').innerText = isCorrect ? 'Correct ✅' : 'Incorrect ❌';
    if (isCorrect) {
      score += 4;
      correctCount++;
    } else {
      score -= 1;
      wrongCount++;
    }
  } else {
    unattemptedCount++;
    document.getElementById('answerStatus').innerText = 'Unattempted ❕';
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function clearSelection() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (selected) selected.checked = false;
  document.getElementById('answerStatus').innerText = '';
}

function showResult() {
  document.getElementById('quizPage').classList.add('hidden');
  document.getElementById('resultPage').classList.remove('hidden');

  const resultText = `
    Total Questions: ${questions.length}<br>
    Attempted: ${correctCount + wrongCount}<br>
    Correct: ${correctCount}<br>
    Incorrect: ${wrongCount}<br>
    Unattempted: ${unattemptedCount}<br>
    Final Score: ${score}
  `;
  document.getElementById('resultText').innerHTML = resultText;
}

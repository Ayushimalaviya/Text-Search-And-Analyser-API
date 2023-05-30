

const form = document.getElementById('myForm');
const results = document.getElementById('results');
const error = document.getElementById('error') 
const formLabel = document.getElementById('formlabel')
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const textarea = document.getElementById('text_input').value;
  if (!textarea || !textarea.trim()) {
    error.hidden = false;
    error.innerHTML = 'You must enter a value';
    formLabel.className = 'error'; 
    form.reset();
  }
  else{
  error.hidden = true;
  formLabel.classList.remove('error')
  const text = textarea.toLowerCase().trim();

  const totalLetters = text.match(/[a-z]/g)?.length || 0;
  const nonLetters = [];
  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    if (/[^a-zA-Z]/.test(char)) {
    nonLetters.push(char);
  }
}

  const totalNonLetters = nonLetters.length;
  const totalVowels = text.match(/[aeiou]/g)?.length || 0;
  const totalConsonants = text.match(/[bcdfghjklmnpqrstvwxyz]/g)?.length || 0;

  const words = text.trim().split(/[^a-z]+/).filter(word => word.length > 0);
  const totalWords = words.length
  const arr = words.filter((word, index) => {
    return words.indexOf(word) === index;
  });
  const uniqueWords = arr.length; //doubt
  const longWords = words.filter(word => word.length >= 6).length;
  const shortWords = words.filter(word => word.length <= 3).length ; //doubt
  // Result
  const html = `
    <dl>
      <dt>Original Input:</dt>
      <dd>${textarea}</dd>
      <dt>Total Letters</dt>
      <dd>${totalLetters}</dd>
      <dt>Total Non-Letters</dt>
      <dd>${totalNonLetters}</dd>
      <dt>Total Vowels</dt>
      <dd>${totalVowels}</dd>
      <dt>Total Consonants</dt>
      <dd>${totalConsonants}</dd>
      <dt>Total Words</dt>
      <dd>${totalWords}</dd>
      <dt>Unique Words</dt>
      <dd>${uniqueWords}</dd>
      <dt>Long Words</dt>
      <dd>${longWords}</dd>
      <dt>Short Words</dt>
      <dd>${shortWords}</dd>
    </dl>
  `;
  results.innerHTML += html;
  form.reset();
}
});

 
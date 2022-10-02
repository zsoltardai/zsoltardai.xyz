export default function createSlug(title) {
  const letters = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ű': 'u',
    'ü': 'u',
    'ő': 'o'
  };
  title = title.toLowerCase();
  for (const letter of Object.keys(letters)) {
    title = title.replaceAll(letter, letters[letter]);
  }
  title = title.replace(/[^a-zA-Z ]/g, '');
  title = title.replaceAll(' ', '-');
  return title;
}

const fetchAnswerTrivia = async () => {
  const tokenEP = localStorage.getItem('token');
  const endPoint = `https://opentdb.com/api.php?amount=5&token=${tokenEP}`;
  const response = await fetch(endPoint);
  const data = await response.json();
  return data.results;
};

export default fetchAnswerTrivia;

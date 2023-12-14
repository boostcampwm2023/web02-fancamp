const CLOVA_SENTIMENT_URL =
  'https://naveropenapi.apigw.ntruss.com/sentiment-analysis/v1/analyze';

interface Confidence {
  negative: number;
  positive: number;
  neutral: number;
}

export async function getSentimentColor(content: string) {
  const confidence: Confidence = await getSentiment(content);
  return calcSentimentHex(confidence);
}

export async function getSentiment(content: string): Promise<Confidence> {
  const response = await fetch(CLOVA_SENTIMENT_URL, {
    method: 'POST',
    headers: {
      'X-NCP-APIGW-API-KEY-ID': process.env.CLOVA_API_KEY_ID,
      'X-NCP-APIGW-API-KEY': process.env.CLOVA_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: content,
    }),
  });

  const jsonResponse = await response.json();
  return jsonResponse.document.confidence;
}

//가장 큰 감정의 색을 값에 따라 낮으면 어둡게, 높으면 강하게 표시
function calcSentimentHex({ negative, positive, neutral }) {
  let r = 0;
  let g = 0;
  let b = 0;
  const maxValue = Math.max(negative, positive, neutral);
  switch (maxValue) {
    case negative:
      r = Math.floor(maxValue * 0.01 * 255);
      break;
    case positive:
      g = Math.floor(maxValue * 0.01 * 255);
      break;
    case neutral:
      b = Math.floor(maxValue * 0.01 * 255);
      break;
  }
  const rgb = [r, g, b];
  const hex = getHEX(rgb);
  return `#${hex}`;
}

const getHEX = (colors) => {
  return colors
    .map((color) => Number(color).toString(16).padStart(2, '0'))
    .join('');
};

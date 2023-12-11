export type AvailableLanguage = 'ko' | 'en' | 'ja';

interface TranslateResult {
  message: {
    result: {
      srcLangType: string;
      tarLangType: string;
      translatedText: string;
    };
  };
}

export const translateText = async (
  text: string,
  targetLanguage: AvailableLanguage,
): Promise<TranslateResult> => {
  const textData = {
    text,
    target: targetLanguage,
    source: 'auto',
  };
  return fetch(process.env.PAPAGO_ENDPOINT, {
    method: 'POST',
    headers: {
      'X-NCP-APIGW-API-KEY-ID': process.env.PAPAGO_CLIENT_ID,
      'X-NCP-APIGW-API-KEY': process.env.PAPAGO_SECRET,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(textData),
  }).then((res) => {
    if (!res.ok) {
      return {
        message: {
          result: {
            srcLangType: targetLanguage,
            tarLangType: targetLanguage,
            translatedText: text,
          },
        },
      };
    }
    return res.json();
  });
};

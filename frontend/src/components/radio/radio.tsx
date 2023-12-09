/* eslint-disable jsx-a11y/label-has-associated-control */

import Text from '@components/ui/Text';
import useLanguage from '@hooks/useLanguage';
import { useEffect, useState } from 'react';

interface RadioProps {
  items: {
    text: string;
    value: string;
    onClick: () => void;
  }[];
}

const languageText = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
};

function Radio({ items }: RadioProps) {
  const { language } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(Object.keys(languageText).findIndex((key) => key === language));
  }, [language]);

  return (
    <>
      <Text size={16} className="relative inline py-xl h-center xl:hidden">
        {languageText[language]}
      </Text>
      <div className="hidden w-full justify-between p-xl xl:flex">
        {items.map((item, i) => {
          return (
            <button
              type="button"
              key={`radio-${item.text}`}
              className={`flex cursor-pointer items-center gap-xs ${
                index === i ? 'text-point-yellow' : 'text-text-primary'
              } `}
              onClick={() => {
                setIndex(i);
                item.onClick();
              }}
            >
              <input type="radio" className="sr-only" />
              <label
                className={`relative inline-block h-[0.75rem] w-[0.75rem] border-sm border-text-primary ${
                  index === i ? 'bg-point-yellow' : 'bg-surface-primary'
                }`}
              />
              <Text size={16} weight={400}>
                {item.text}
              </Text>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Radio;

export function getLocaleString(date?: string): string {
  if (date) {
    return new Date(date).toLocaleString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return new Date().toLocaleString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getCurrentDateString(): string {
  return JSON.stringify(new Date()).slice(1, -1);
}

export function getFullDateString(createdAt: string): string {
  const dateObj = new Date(createdAt);
  const [year, month, date] = dateObj
    .toLocaleDateString()
    .split('.')
    .map((el) => el.trim());
  const dayArray = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const day = dayArray[dateObj.getDay()];
  return `🗓️ ${year}년 ${month}월 ${date}일 ${day}`;
}

export const formatDate = (date: string) => {
  const currDate = new Date();
  const currYear = currDate.getFullYear();
  const currDay = currDate.getDate();

  const inputDate = new Date(date);
  const inputYear = inputDate.getFullYear();
  const inputMonth = inputDate.getMonth() + 1;
  const inputDay = inputDate.getDate();
  const inputHour = inputDate.getHours();
  const inputMinute = inputDate.getMinutes();

  if (inputYear !== currYear) {
    return `${inputYear}.${inputMonth.toString().padStart(2, '0')}.${inputDay
      .toString()
      .padStart(2, '0')} ${inputHour.toString().padStart(2, '0')}:${inputMinute
      .toString()
      .padStart(2, '0')}`;
  }
  if (inputDay !== currDay) {
    return `${inputMonth.toString().padStart(2, '0')}.${inputDay
      .toString()
      .padStart(2, '0')} ${inputHour.toString().padStart(2, '0')}:${inputMinute
      .toString()
      .padStart(2, '0')}`;
  }
  return `${inputHour.toString().padStart(2, '0')}:${inputMinute
    .toString()
    .padStart(2, '0')}`;
};

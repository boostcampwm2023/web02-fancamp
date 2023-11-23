export function getLocaleString(): string {
  return new Date().toLocaleString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
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

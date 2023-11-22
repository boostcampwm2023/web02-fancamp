export function getLocaleString(): string {
  return new Date().toLocaleString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

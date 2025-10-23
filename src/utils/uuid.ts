export default function generateUuid() {
  let uuid = '';
  for (let i = 0; i < 8; i += 1) {
    const num = Math.floor(Math.random() * 65536);
    uuid += num.toString(16);
    if (i === 1 || i === 2 || i === 3 || i === 4) {
      uuid += '-';
    }
  }
  return uuid;
}

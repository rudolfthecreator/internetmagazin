export function formatNum(num: number) {
  return Intl.NumberFormat("ru-RU").format(num);
}

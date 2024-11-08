export const boardToBase3 = (value: Array<number>) => (
  Number.parseInt(value.map((el) => el + 1).join(''), 3)
)

export const stringToUint8Array = (value: string): Uint8Array => (
  Uint8Array.from(value.split('').map((el) => el.charCodeAt(0)))
)

import { stringToUint8Array } from './stringify';

export class StatesValues extends Map {
  constructor() {
    super();
  }

  getIndexesUInt8Array() {
    const indexes = Array.from(this).map((el) => el[0]);
    const uint16array = new Uint16Array(indexes);
    return new Uint8Array(uint16array.buffer);
  }

  getValuesUInt8Array() {
    const floats = Array.from(this).map((el) => el[1]);
    const float64Array = new Float64Array(floats);
    return new Uint8Array(float64Array.buffer);
  }

  merge(payload: Map<number, number>) {
    payload.forEach((value, key) => this.set(key, value));
  }

  serialize() {
    const values = this.getValuesUInt8Array();
    const indexes = this.getIndexesUInt8Array();

    const all = new Uint8Array(values.length + indexes.length);
    all.set(values);
    all.set(indexes, values.length);

    const string = String.fromCharCode.apply(null, all as unknown as Array<number>);
    const result = btoa(string);
    return [result, values.length].join('\n');
  }



  deserialize(value: string) {
    const [payload , length] = value.split('\n');
    const base64 = atob(payload);
    const uint8array = stringToUint8Array(base64);
    const revertedFloats = uint8array.slice(0, Number(length));
    const revertedIndexes = uint8array.slice(Number(length));
    const floats = Array.from(new Float64Array(revertedFloats.buffer));
    const indexes = Array.from(new Uint16Array(revertedIndexes.buffer));
    this.clear();
    indexes.forEach((el, index) => {
      this.set(el, floats[index]);
    })
  }
}

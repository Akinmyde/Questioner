class Helpers {
  static findArrayById(arr, id) {
    return arr.find(newArr => newArr.id.toString() === id);
  }

  static regex(val) {
    return val.replace((/[^a-zA-Z0-9' ]/g), '').trim();
  }
}
export default Helpers;

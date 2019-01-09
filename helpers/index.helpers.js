class Helpers {
  static dateFormater() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${day}-${month + 1}-${year}`;
  }

  static findArrayById(arr, id) {
    return arr.find(newArr => newArr.id.toString() === id);
  }

  static regex(val) {
    return val.replace((/[^a-zA-Z0-9' ]/g), '').trim();
  }
}
export default Helpers;
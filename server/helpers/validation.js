class Validation {
  static regex(val) {
    return val.replace((/[^a-zA-Z0-9' ]/g), '').trim();
  }
}
export default Validation;

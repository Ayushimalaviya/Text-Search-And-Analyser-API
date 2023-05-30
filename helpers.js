import {ObjectId} from "mongodb"
const exportedMethods = {
    checkId(id) {
      if (!id) throw 'Error: You must provide an id to search for';
      if (typeof id !== 'string') throw 'Error: id must be a string';
      id = id.trim();
      if (id.length === 0)
        throw 'Error: id cannot be an empty string or just spaces';
      if (!ObjectId.isValid(id)) throw 'Error: invalid object ID';
      return id;
    },
    checkString(strVal, varName) {
      if (!strVal) throw `Error: You must supply a ${varName}!`;
      if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
      strVal = strVal.trim();
      if (strVal.length === 0)
        throw `Error: ${varName} cannot be an empty string or string with just spaces`;
      if (!isNaN(strVal))
        throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
      return strVal;
    },
    checkStringArray(strVal, varName) {
      if(!Array.isArray(strVal) || strVal.length === 0){
        throw `Invalid ${varName}`}
      let validatetype = strVal.filter((ele) => (typeof ele !== 'string' || ele.trim().length === 0))
      if(validatetype.length > 0){
        throw `Invalid ${varName} elements are provided.`
      }
      strVal = strVal.map((ele) => (ele.trim()))
      return strVal;
  }
  };
  export default exportedMethods;

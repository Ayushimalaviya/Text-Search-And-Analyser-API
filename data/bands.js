import {bands} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb"

const method = {
  async create(name, genre, website, recordCompany, groupMembers, yearBandWasFormed) {
      if(!name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed){
          throw `All fields need to have valid values`
      }
      if(typeof name !== 'string' || typeof website !== 'string' || typeof recordCompany !== 'string'){
          throw `Name, website and record company name must be a string.`
      }
      if(name.trim().length === 0 || website.trim().length === 0 || recordCompany.trim().length === 0){
         throw `Name, website and record company name must not be empty string.` 
      }
      name = name.trim()
      website = website.trim()
      recordCompany = recordCompany.trim()
      var url = /^http:\/\/www\.(?![_-])[a-zA-Z0-9\-_]{5,}(?<![_-])\.com$/
      if(!url.test(website)){
         throw `provide valid url!!`
      }
      if(!Array.isArray(genre) || genre.length === 0){
             throw `Invalid genre ${genre}`
      }
      let validatetype = genre.filter((ele) => (typeof ele !== 'string' || ele.trim().length === 0))
      if(validatetype.length > 0){
          throw `Invalid genre elements are provided ${validatetype.join(', ')}`
      }
      genre = genre.map((ele) => (ele.trim()))
      if(!Array.isArray(groupMembers) || groupMembers.length === 0){
          throw `Invalid groupMembers ${groupMembers}`
      }
      let validate = groupMembers.filter((ele) => (typeof ele !== 'string' || ele.trim().length === 0))
      if(validate.length > 0){
       throw `Invalid group members are present ${validate.join(', ')}`
      }
      groupMembers = groupMembers.map((ele) => (ele.trim()))
      //console.log(groupMembers)
      if(typeof yearBandWasFormed !== 'number'){
          throw `Year for the band formed must of type number`
      }
      if(yearBandWasFormed < 1900 || yearBandWasFormed > 2023){
          throw `Only years 1900-2023 are valid values.`
      }
      let obj1 = {
          name: name,
          genre: genre,
          website: website,
          recordCompany: recordCompany,
          groupMembers: groupMembers,
          yearBandWasFormed: yearBandWasFormed,
          albums: [],
          overallRating: 0
      };
      const bandCollection = await bands();
      const insertInfo = await bandCollection.insertOne(obj1)
  
      const newId = insertInfo.insertedId.toString();
      const band = await this.get(newId);
      return band;
},
async getAll(){
    const bandCollection = await bands();
    let bandList = await bandCollection.find({}).toArray();
    if (!bandList) throw 'Could not get all bands';
    bandList = bandList.map((element) => {
    element._id = element._id.toString();
    return element;
    });
    return bandList;
},
async get(id){
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'id must be a string';
    if (id.trim().length === 0)
      throw 'id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const bandCollection = await bands();
    const band_obj = await bandCollection.findOne({_id: new ObjectId(id)});
    if (!band_obj) throw 'No band object with that id';
    band_obj._id = band_obj._id.toString();
    return band_obj; 
},
async remove(id){
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'id must be a string';
    if (id.trim().length === 0)
    throw 'id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object id';
    const bandCollection = await bands();
    const deleted_by_id = await bandCollection.findOneAndDelete({_id: new ObjectId(id)});
    if (deleted_by_id.lastErrorObject.n === 0) {
      throw `Could not delete bands with id of ${id}`;
    }
    let obj1 = {
       "bandId" : id,
       "deleted" : true
    }
    return obj1;
},
async update(id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed) {
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Id must be a string';
    if (id.trim().length === 0)
      throw 'Id cannot be an empty string or just spaces';
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';

    if(!name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed){
        throw `All fields need to have valid values`
    }
    if(typeof name !== 'string' || typeof website !== 'string' || typeof recordCompany !== 'string'){
        throw `Name, website and record company name must be a string.`
    }
    if(name.trim().length === 0 || website.trim().length === 0 || recordCompany.trim().length === 0){
       throw `Name, website and record company name must not be empty string.` 
    }
    name = name.trim()
    website = website.trim()
    recordCompany = recordCompany.trim()
    var url = /^http:\/\/www\.(?![_-])[a-zA-Z0-9\-_]{5,}(?<![_-])\.com$/
    if(!url.test(website)){
       throw `provide valid url!!`
    }
    if(!Array.isArray(genre) || genre.length === 0){
           throw `Invalid genre ${genre}`
    }
    let validatetype = genre.filter((ele) => (typeof ele !== 'string' || ele.trim().length === 0))
    if(validatetype.length > 0){
        throw `Invalid genre elements are provided ${validatetype.join(', ')}`
    }
    genre = genre.map((ele) => (ele.trim()))
    if(!Array.isArray(groupMembers) || groupMembers.length === 0){
        throw `Invalid genre ${genre}`
    }
    let validate = groupMembers.filter((ele) => (typeof ele !== 'string' || ele.trim().length === 0))
    if(validate.length > 0){
     throw `Invalid group members are present ${validate.join(', ')}`
    }
    groupMembers = groupMembers.map((ele) => (ele.trim()))
    //console.log(groupMembers)
    if(typeof yearBandWasFormed !== 'number'){
        throw `Year for the band formed must of type number`
    }
    if(yearBandWasFormed < 1900 || yearBandWasFormed > 2023){
        throw `Only years 1900-2023 are valid values.`
    }
    let obj1 = {
        name: name,
        genre: genre,
        website: website,
        recordCompany: recordCompany,
        groupMembers: groupMembers,
        yearBandWasFormed: yearBandWasFormed,
        albums: [],
        overallRating: 0
    };
    const bandCollection = await bands();
    const update_all = await bandCollection.findOneAndUpdate(
        {_id: new ObjectId(id)},
        {$set: obj1},
        {returnDocument: 'after'}
    );
    return update_all.value;
}

}

export default method

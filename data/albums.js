import {bands} from "../config/mongoCollections.js";
import {ObjectId} from "mongodb"

const method = {
  async create (bandId,title,releaseDate,tracks,rating) {
    if (!bandId) throw `You must provide an id to search for`;
    if (typeof bandId !== 'string') throw `Id must be a string`;
    if (bandId.trim().length === 0)
      throw `Id cannot be an empty string or just spaces`;
      bandId = bandId.trim();
    if (!ObjectId.isValid(bandId)) throw `invalid object ID`;

    if(!title || !releaseDate || !tracks || !rating ){
      throw `All fields need to have valid values`
  }
  if(typeof title !== 'string' || typeof releaseDate !== 'string' ){
      throw `title and released date must be a string type with proper format when required.`
  }
  if(!Array.isArray(tracks) || tracks.length < 3){
    throw `Please provide more than two tracks and track should be array.`
}
title = title.trim()
releaseDate = releaseDate.trim()
let validatetype = tracks.filter((ele) => (typeof ele !== 'string' || ele.trim().length === 0))
if(validatetype.length > 0){
 throw `Invalid tracks elements are provided ${validatetype.join(', ')}`
}
tracks = tracks.map((ele) => (ele.trim()))
  if(title.trim().length === 0 || releaseDate.trim().length === 0){
     throw `title and released date must not be a empty string.` 
  }
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if(!regex.test(releaseDate)){
    throw `Release date must have proper format of 'MM/DD/YYYY'.`
  }
  const date = new Date(releaseDate);
  if(isNaN(date)){
    throw `Enter valid day.`
  }
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear + 1) {
    throw `Release date out of range`;
  }
  if (typeof rating !== 'number' || rating < 1 || rating > 5 ){
    throw `Rating must be a number type having value between 1 and 5.`
  }
  if(! /^(\d+|\d+\.\d)$/.test(rating)) throw 'Rating(float) will be accepted as long as your input is formatted like 1.5 or 4.8'
  const bandCollection = await bands();  
  const band = await bandCollection.findOne({_id: new ObjectId(bandId)});
  if(!band){
    throw `No band with ${bandId} exists.`
  }
  if(band.albums.length > 0){
     band.albums.forEach(element => {
       if(element.title.trim() === title.trim()){
        throw `Album with the given title is already present.`
       }
     });
  }
  let obj1 = {
      _id: new ObjectId,
      title: title,
      releaseDate: releaseDate,
      tracks: tracks,
      rating: rating
  };
  
  let album = band.albums.flat() // to get the reviews from object of array.
  let rate = album.map((a) => a.rating) // to get rating values and store it in an array
  rate.push(rating) //inserting current rating
  let sum_rate = rate.reduce((sum, itr) => sum + itr) // summ it
  let avg = Math.floor((sum_rate/(rate.length))* 10)/ 10 
  const update_band = await bandCollection.updateOne({_id: new ObjectId(bandId)}, {$addToSet: {albums: obj1}, $set: {overallRating: avg}});
  
  return obj1;
},
async getAll(bandId){
  if (!bandId) throw `You must provide an id to search for`;
    if (typeof bandId !== 'string') throw `Id must be a string`;
    if (bandId.trim().length === 0)
      throw `Id cannot be an empty string or just spaces`;
      bandId = bandId.trim();
    if (!ObjectId.isValid(bandId)) throw `invalid object ID`;

  const bandCollection = await bands();  
  const band = await bandCollection.findOne({_id: new ObjectId(bandId)});
  if (!band) {
    throw `Could not find movie with id of ${bandId}`;
  }
  return band.albums;
},
async get(albumId){
  if (!albumId) throw `You must provide an id to search for`;
  if (typeof albumId !== 'string') throw `Id must be a string`;
  if (albumId.trim().length === 0)
    throw `Id cannot be an empty string or just spaces`;
    albumId = albumId.trim();
  if (!ObjectId.isValid(albumId)) throw `invalid object ID`;
  const bandCollection=await bands();
  const album = await bandCollection.findOne(
    {'albums._id': new ObjectId(albumId)},
    {projection: {_id: 0, 'albums.$': 1}}
    );
  if (!album) throw `No member with that id ${albumId}`;
  return album.albums[0];
},
async remove(albumId){
  if (!albumId) throw `You must provide an id to search for`;
  if (typeof albumId !== 'string') throw `Id must be a string`;
  if (albumId.trim().length === 0)
    throw `Id cannot be an empty string or just spaces`;
    albumId = albumId.trim();
  if (!ObjectId.isValid(albumId)) throw `invalid object ID`;
  const bandCollection=await bands();
  albumId.toString()
  
  const band = await bandCollection.findOne(
    {'albums._id': new ObjectId(albumId)}
  );
  if (!band){
    throw (`album with ${albumId} does not  exist`)
  }
  await bandCollection.findOneAndUpdate(
   {_id: band._id},
   {$pull: {albums: {_id: new ObjectId(albumId)}}},
   {returnOriginal: false}
  );
  const bandId = band._id
  const new_band = await bandCollection.findOne({_id: new ObjectId(bandId)});
  if(new_band.albums.length === 0){
    await bandCollection.updateOne({_id: new ObjectId(bandId)}, {$set: {overallRating: 0}});
    new_band.overallRating = 0
  }
  else{
  let album = new_band.albums.flat() // to get the albums from object of array.
  let rate = album.map((a) => a.rating) // to get rating values and store it in an array
  let sum_rate = rate.reduce((sum, itr) => sum + itr) // summ it
  let avg = Math.floor((sum_rate/(rate.length))* 10)/ 10 
  await bandCollection.updateOne({_id: new ObjectId(bandId)}, {$set: {overallRating: avg}});
  new_band.overallRating = avg
  }
  //console.log(rate, avg, sum_rate)
  return new_band
}
}

export default method

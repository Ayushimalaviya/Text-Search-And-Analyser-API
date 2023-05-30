
import {Router} from 'express';
const router = Router();
import {albumsData, bandsData} from '../data/index.js'; 
import validation from '../helpers.js';

router
  .route('/:bandId')
  .get(async (req, res) => {
    try {
      req.params.bandId = validation.checkId(req.params.bandId, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try{
      let band_obj1 = await bandsData.get(req.params.bandId);
      if(!band_obj1 || Object.keys(band_obj1).length === 0){
        throw `No band exists with the given Id.`;
      }
    }catch (e){
      return res.status(404).json({error: e});
    }
    try {
      let band_obj = await albumsData.getAll(req.params.bandId);
      if(band_obj.length === 0){ throw `No albums exists.`}
      res.json(band_obj);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .post(async (req, res) => {
    const albumData = req.body;
    try {
      req.params.bandId = validation.checkId(req.params.bandId, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try{
      let band_obj1 = await bandsData.get(req.params.bandId);
      if(!band_obj1 || Object.keys(band_obj1).length === 0){
        throw `No band exists with the given Id.`;
      }
    }catch (e){
      return res.status(404).json({error: e});
    }
    try{
      albumData.title = validation.checkString(albumData.title, 'Title');
      albumData.releaseDate = validation.checkString(albumData.releaseDate, 'Date');
      }catch(e){
        return res.status(400).json({error: e})
      }
    try{
      if(!Array.isArray(albumData.tracks) || albumData.tracks.length < 3){
        throw `Please provide more than two tracks and track should be array.`}
      albumData.title = albumData.title.trim()
      albumData.releaseDate = albumData.releaseDate.trim()
      let validatetype = albumData.tracks.filter((ele) => (typeof ele !== 'string' || ele.trim().length === 0))
      if(validatetype.length > 0){
        throw `Invalid tracks elements are provided ${validatetype.join(', ')}`}
      albumData.tracks = albumData.tracks.map((ele) => (ele.trim()))
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      if(!regex.test(albumData.releaseDate)){
        throw `Release date must have proper format of 'MM/DD/YYYY'.`}
      const date = new Date(albumData.releaseDate);
      if(isNaN(date)){
        throw `Enter valid date.`}
      const year = date.getFullYear();
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear + 1) {throw `Release date out of range`;}
      if (typeof albumData.rating !== 'number' || albumData.rating < 1 || albumData.rating > 5 ){
        throw `Rating must be a number type having value between 1 and 5.`
      }
      if(! /^(\d+|\d+\.\d)$/.test(albumData.rating)) throw 'Rating(float) will be accepted as long as your input is formatted like 1.5 or 4.8'
    } catch(e) {
      return res.status(400).json({error: e})
    }
    try{
      let band = await bandsData.get(req.params.bandId)
      if(band.albums.length > 0){
        band.albums.forEach(element => {
          if(element.title.trim() === albumData.title.trim()){
            throw `Album with the given title is already present.`
          }
        });
      }
    }catch(e){
      return res.status(400).json({error: e})
    }
  try {
    const newalbum = await albumsData.create(req.params.bandId, albumData.title, albumData.releaseDate, albumData.tracks, albumData.rating);
    let band_obj1 = await bandsData.get(req.params.bandId);
    res.status(200).json(band_obj1);
  } catch (e) {
    res.status(400).json({error: e});
  }
  });

router
  .route('/album/:albumId')
  .get(async (req, res) => {
    try {
      req.params.albumId = validation.checkId(req.params.albumId, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try{
    let band_obj1 = await albumsData.get(req.params.albumId);
    res.status(200).json(band_obj1);
    } catch(e){
      res.status(404).json({error: 'No album id exist in any of the bands.'});
    } 
  })
  .delete(async (req, res) => {
    try {
      req.params.albumId = validation.checkId(req.params.albumId, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    let obj1 = {
      "albumId" : req.params.albumId ,
      "deleted" : true
   }
    try{
      let band_obj1 = await albumsData.remove(req.params.albumId);
      res.json(obj1);
      } catch(e){
        res.status(404).json({error: 'No album id exist in any of the bands.'});
      } 
  });
  export default router;
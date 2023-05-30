import {Router} from 'express';
const router = Router();
import {bandsData} from '../data/index.js';
import validation from '../helpers.js';

router
  .route('/')
  .get(async (req, res) => {
      try {
        const bandsList = await bandsData.getAll();
        const formBands = bandsList.map(band => {return {_id: band._id.toString().trim(), name: band.name.trim()};
  });
  res.json(formBands);
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).send(e);
  }
  })
  .post(async (req, res) => {
    const bandData = req.body;
    if (!bandData || Object.keys(bandData).length === 0) {
      return res
        .status(400)
        .json({error: 'All fields need to have valid values'});
    }
    try {
      bandData.name = validation.checkString(bandData.name, 'Name');
      bandData.website = validation.checkString(bandData.website, 'website');
      bandData.recordCompany = validation.checkString(bandData.recordCompany, 'recordCompany');
      if (bandData.genre) {bandData.genre = validation.checkStringArray(bandData.genre,'genre');
      }
      var url = /^http:\/\/www\.(?![_-])[a-zA-Z0-9\-_]{5,}(?<![_-])\.com$/
      if(!url.test(bandData.website)){
       throw `provide valid url!!`
      }
      if (bandData.groupMembers) {bandData.groupMembers = validation.checkStringArray(bandData.groupMembers,'groupMembers');
      }
      if(typeof bandData.yearBandWasFormed !== 'number'){
        throw `Year for the band formed must of type number`
      }
      if(bandData.yearBandWasFormed < 1900 || bandData.yearBandWasFormed > 2023){
        throw `Only years 1900-2023 are valid values.`
      }
    } catch (e) {
      return res.status(400).json({error: e});
    }
    
    try {
      const newBand = await bandsData.create(bandData.name, bandData.genre, bandData.website, bandData.recordCompany, bandData.groupMembers, bandData.yearBandWasFormed);
      res.json(newBand);
    } catch (e) {
      res.status(400).json({error: e});
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'ID URL Param');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      let band_obj = await bandsData.get(req.params.id);
      res.json(band_obj);
    } catch (e) {
      res.status(404).json({error: 'Band not found'});
    }
  })
  .delete(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id);
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      let remove_band = await bandsData.remove(req.params.id);
      res.json(remove_band);
    } catch (e) {
      res.status(404).json({error: 'No band exists'});
    }
  })
  .put(async (req, res) => {
    let bandData = req.body;
    if (!bandData || Object.keys(bandData).length === 0) {
      return res
        .status(404)
        .json({error: 'No band exists.'});
    }
    try {
      bandData.name = validation.checkString(bandData.name, 'Name');
      bandData.website = validation.checkString(bandData.website, 'website');
      bandData.recordCompany = validation.checkString(bandData.recordCompany, 'recordCompany');
      req.params.id = validation.checkId(req.params.id);
      if (bandData.genre) {bandData.genre = validation.checkStringArray(bandData.genre,'genre');
      }
      var url = /^http:\/\/www\.(?![_-])[a-zA-Z0-9\-_]{5,}(?<![_-])\.com$/
      if(!url.test(bandData.website)){
       throw `provide valid url!!`
      }
      if (bandData.groupMembers) {bandData.groupMembers = validation.checkStringArray(bandData.groupMembers,'groupMembers');
      }
      if(typeof bandData.yearBandWasFormed !== 'number'){
        throw `Year for the band formed must of type number`
      }
      if(bandData.yearBandWasFormed < 1900 || bandData.yearBandWasFormed > 2023){
        throw `Only years 1900-2023 are valid values.`
      }
    } catch (e) {
      return res.status(400).json({error: e});
    }
    
    try {
      const band_update = await bandsData.update(req.params.id, bandData.name, bandData.genre, bandData.website, bandData.recordCompany, bandData.groupMembers, bandData.yearBandWasFormed);
      res.json(band_update);
    } catch (e) {
      res.status(400).json({error: e});
    }
});
  export default router;

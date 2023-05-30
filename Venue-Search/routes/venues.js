
import path from 'path'
import {Router} from 'express';
import axios from 'axios';
const router = Router();

router.route('/').get(async (req, res) => {
  res.render('homepage', {title: "Venue Finder"});
});

router.route('/searchvenues').post(async (req, res) => {

  let apiKey = 'YCpdjPit8Ec2AWn7GjeI0NuoJ0UoXyeA'
  let searchVenueTerm  = req.body.searchVenueTerm
  searchVenueTerm=searchVenueTerm.trim()
  if (!searchVenueTerm) {
    res.status(400)
    res.render('error', { error: "Please enter search venue term", title: "Error" });
    return;
  }
  if (typeof searchVenueTerm !== 'string') {
    res.status(400)
    res.render('error', { error: "Search venue term should be a string", title: "Error" });
    return;
  }
  if (searchVenueTerm.trim().length === 0) {
    res.status(400)
    res.render('error', { error: "search venue term is an empty string", title: "Error" });
    return;
  }

  try {
    let venues=await axios.get(`https://app.ticketmaster.com/discovery/v2/venues?keyword=${searchVenueTerm}&apikey=${apiKey}&countryCode=US`);
    if(venues.data._embedded){
        venues=venues.data._embedded.venues.slice(0,10);
        res.render('venueSearchResults', { venues: venues, searchVenueTerm : searchVenueTerm, title: "Venue Found" });
    }
    else{
      res.render('venueNotFound', { venues: venues, searchVenueTerm : searchVenueTerm, title: "Venue not Found" });
    }
  } catch (e) {res.status(400).json({error:e})}
});

router.route('/venuedetails/:id').get(async (req, res) => {
  let apiKey = 'YCpdjPit8Ec2AWn7GjeI0NuoJ0UoXyeA'  
  let id = req.params.id
  try {
    let venue=await axios.get(`https://app.ticketmaster.com/discovery/v2/venues/${id}?&apikey=${apiKey}&countryCode=US`);
    venue=venue.data;
    res.render('venueByID', { venue: venue, title: "Venue Details" });
  } catch (e) {
    res.status(404).json({error: `a venue with that ${id} does not exist`});
  }
});

export default router;
// import {dbConnection, closeConnection} from './config/mongoConnection.js';
// import bands from "./data/bands.js";
// import albums from "./data/albums.js";

// //lets drop the database each time this is run
// const db = await dbConnection();
// await db.dropDatabase();
// async function main() {
//     let pinkFloyd = undefined;
//     let beatles = undefined;
//     let beats = undefined;
//     let hiphop = undefined;
//    // Create a band of your choice.
//     console.log('Created three bands')
//     try{
//          pinkFloyd = await bands.create("  Pink Floyd  ", ["   Progressive Rock", "Psychedelic rock", "Classic Rock"], "http://www.pinkfloyd.com", "EMI", ["Roger Waters", "David Gilmour", "Nick Mason", "Richard Wright", "Sid Barrett" ], 2023);
//         // Log the newly created band. (Just that band, not all bands)
//         console.log(pinkFloyd)
//     }catch(e){
//         console.log(e)
//     }
//     try{
//          beatles = await bands.create( "The Beatles" , ["Rock", "Pop", "Psychedelia"],"http://www.thebeatles.com","Parlophone",["John Lennon", "Paul McCartney", "George Harrison", "Ringo Starr"], 1960);
//         console.log(beatles)
//     }catch(e){
//         console.log(e)
//     }
//     try{
//          hiphop = await bands.create( "Hiphop" , ["Prime", "Time", "Imagine"],"http://www.hip-hop.com","Pineplone",["John Argis", "Micknsy McCartney", "Gioge Hideson", "Hided Rates"], 2000);
//         console.log(hiphop)
//     }catch(e){
//         console.log(e)
//     }
//     try{
//          beats = await bands.create( "     The Beatles  " , ["  hsa "],"     http://www.a567-f9.com","   Parlophone     ",["Paul", "       Paul McCartney", "George Harrison    ", "Ringo Starr"], 1980);
//     //    Log the newly created 3rd band. (Just that band, not all bands)
//         console.log(beats)
//     }catch(e){
//         console.log(e)
//     }
//     console.log('Let us refer to bands all details')
//     try {
//         const bandList = await bands.getAll();
//         console.log(bandList);
//       } catch (e) {
//         console.log(e);
//       }
//     console.log('Update band')
//     try{
//         beats = await bands.update(beats._id,"     The Beatle  " , ["  hsa ", " fafggsv "],"     http://www.a567-f9.com","   Parlophone     ",["Paul", "       Paul McCartney", "George Harrison    ", "Ringo Starr"], 1980);
//       // Log the newly created 3rd band. (Just that band, not all bands)
//         console.log(beats)
//     }catch(e){
//         console.log(e)
//     }
//     console.log('Trying to get band by id')
//     try {
//         const obj1 = await bands.get(pinkFloyd._id.toString().trim());
//         console.log(obj1);
//       } catch (e) {
//         console.log(e);
//       }
//     console.log('Removed First band')
//     try {
//         const deleted = await bands.remove(pinkFloyd._id.toString().trim());
//         console.log(deleted);
//     } catch (e) {
//         console.log(e);
//     }
//     console.log('All the bands after changes are listed.')
//     try {
//         const bandList = await bands.getAll();
//         console.log(bandList);
//       } catch (e) {
//         console.log(e);
//       } 
//     console.log('Created album 1')
//     try{
//         const album1 = await albums.create(beatles._id.toString().trim(),"Wish You Were Here","09/13/1975",["Shine On You Crazy Diamond, Pts. 1-5", "Welcome to the Machine", "Have a Cigar (Ft. Roy Harper)", "Wish You Were Here", "Shine On You Crazy Diamond, Pts. 6-9"],5);
//         console.log(album1)
//     }catch(e){
//         console.log(e)
//     }
//     console.log('Created album 2')
//     try{
//         const album2 = await albums.create(beatles._id.toString().trim(),"Fab","01/13/1975",["Shine On You Crazy Diamond, Pts. 1-5", "Welcome to the Machine", "Have a Cigar (Ft. Roy Harper)", "Wish You Were Here", "Shine On You Crazy Diamond, Pts. 6-9"],5);
//         console.log(album2)
//     }catch(e){
//         console.log(e)
//     }   
//     console.log('Created album 3')
//     try{
//         const album3 = await albums.create(beatles._id.toString().trim(),"Fab123","  09/12/1985",["Shine On You Crazy Diamond, Pts. 1-5", "Welcome to the Machine", "Have a Cigar (Ft. Roy Harper)", "Wish You Were Here", "Shine On You Crazy Diamond, Pts. 6-9"],3.4);
//         console.log(album3)
//     }catch(e){
//         console.log(e) 
//     }   
//     console.log('Created album 4')
//     try{
//         const album4 = await albums.create(beatles._id.toString().trim(),"    Fab234    ","09/12/1900",["   Shine On You Crazy Diamond, Pts. 1-5      ", "     Welcome to the Machine", "Have a Cigar (Ft. Roy Harper)", "Wish You Were Here", "Shine On You Crazy Diamond, Pts. 6-9"],3.6);
//         console.log(album4)
//     }catch(e){
//         console.log(e)
//     }   
//     console.log('Created album 5')
//     try{
//         const album5 = await albums.create(beatles._id.toString().trim(),"Fabulous","09/12/2000",["Shine On You Crazy Diamond, Pts. 1-5", "Welcome to the Machine", "Have a Cigar (Ft. Roy Harper)", "Wish You Were Here", "Shine On You Crazy Diamond, Pts. 6-9"],2.3);
//         console.log(album5)
//     }catch(e){
//         console.log(e)
//     }   
//     console.log('Created album 1')
//     try{
//         const album6 = await albums.create(hiphop._id.toString().trim(),"Floyd","09/12/2000",["It is, Pts. 1-5", "One of the band", "Have a Fake data"], 2.3);
//         console.log(album6)
//     }catch(e){
//         console.log(e)
//     }   
//     console.log('Created album 2')
//     try{
//         const album7 = await albums.create(hiphop._id.toString().trim(),"Densed","09/12/2000",["It is, Pts. 1-5", "One of the band", "Have a Fake data"], 2.3);
//         console.log(album7)
//     }catch(e){
//         console.log(e)
//     }
//     console.log('Created album 3')
//     try{
//         const album8 = await albums.create(hiphop._id.toString().trim(),"Pale","09/12/2000",["It is, Pts. 1-5", "One of the band", "Have a Fake data"], 2.3);
//         console.log(album8)
//     }catch(e){
//         console.log(e)
//     }
//     console.log('get an array of objects of the albums')
//     try{
//         const album1 = await albums.getAll(hiphop._id.toString().trim())   
//         console.log(album1)
//     }catch(e){
//         console.log(e)
//     } 
    
//     // console.log('Get album by id')
//     // try{
//     //     let id1 = await bands.get(beatles._id)
//     //     if(!id1 || id1.albums.length === 0){
//     //         throw `No albums exists in ${id3._id}, please add the albums first.`
//     //     }
//     //     let id2 = await albums.get(id1.albums[4]._id.toString().trim())
//     //     console.log(id2)
//     // }catch(e){
//     //     console.log(e)
//     // } 
//     // console.log('Remove album by id')
//     // try{
//     //     let id3 = await bands.get(beatles._id)
//     //     if(!id3 || id3.albums.length === 0){
//     //         throw `No albums exists in ${id3._id}, please add the albums first.`
//     //     }
//     //     let id4 = await albums.remove(id3.albums[1]._id.toString().trim())
//     //     console.log(id4)
//     // }catch(e){
//     //     console.log(e)
//     // } 
// }
// await main();
// await closeConnection();

import express from 'express';
const app = express();
import configRoutes from './routes/index.js';

app.use(express.json());

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
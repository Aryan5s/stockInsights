const {MongoClient} = require('mongodb');
require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
const client = new MongoClient(mongoUrl)
const collectionName = process.env.COLLECTION_NAME;

const jsonResponseMethod = async() =>{
    let result = await client.connect();
    let db = result.db(DB_NAME);
    let collectionn = db.collection(collectionName);
    return collectionn;
}

const getAllAnnouncements = async (req , res) => {
   try {
    const {start , end} = req.query;
    let announcements = []
    let response = await jsonResponseMethod();

    if(start && end){
    let jsonData = await response.find({NEWS_DT : start , News_submission_dt : end}).toArray();
    for(let i = 0; i < jsonData.length; i++){
        announcements.push(`The PDF url contains the Attachment Details of ${jsonData[i].SLONGNAME} and the PDF Link is  :  ${jsonData[i].ATTACHMENTNAME}`)
    }
    return res.status(200).json(announcements);
    }else{
        let jsonData = await response.find({}).toArray();
    // console.log(jsonData)

    for(let i = 0; i < jsonData.length; i++){
    announcements.push(`The PDF url contains the Attachment Details of ${jsonData[i].SLONGNAME} and the PDF Link is  :  ${jsonData[i].ATTACHMENTNAME}`)
    }

    return res.status(200).json(announcements);
    }
   } catch (error) {
      console.log(error);
      return res.status(500).json({
        error : error.message
      })
   }
}

const getAllAnnouncementOfaCompany = async (req , res) => {
    try{
  const id = req.params.companyId;      
  const collection = await jsonResponseMethod();
  let responseFromDb = await collection.find({}).toArray();
 for(let i = 0; i < responseFromDb.length; i++){
    let originalId = responseFromDb[i].SCRIP_CD;
    if(originalId == id){
        // console.log(originalId)
        // console.log(responseFromDb[i])
        return res.status(200).json({announcement : `The Announcement of ${responseFromDb[i].SLONGNAME} can be found in the pdf at the URL : ${responseFromDb[i].ATTACHMENTNAME}`})
    }
 }

 return res.status(400).json({message : `Could Not find the announcement of the company with ID : ${id}`})
   }catch(error){
           console.log(error);
           return res.status(500).json({
            error : error.message
           })
    }
}


const getAnnouncementsOveraPeriodForCompanies = async (req , res) => {
    try {
        const {arrIds} = req.body;
        const {start , end} = req.query;
        const collection = await jsonResponseMethod();
        let announcements = []

        for(let i = 0; i < arrIds.length; i++){
    const response = await collection.findOne({SCRIP_CD : arrIds[i] , NEWS_DT : start , News_submission_dt : end});
    announcements.push(`The announcement of the company ${response.SLONGNAME} can be found 
    by clicking on the url :  ${response.ATTACHMENTNAME}`);   
        }

    if(!response) return res.status(400).json({error : `No announcement found for the 
    entered companies during the period of ${start} till ${end}`})

    return res.status(200).json({
        status : 'successful', 
        response
    })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error : error.message
        })
    }

}

const getCriticalAnnouncements = async (req , res) => {
    try {
        const {start , end} = req.query;
        let critcialAnnouncements = []
        let response = await jsonResponseMethod();

        if(start && end){
            let jsonData = await response.find({NEWS_DT : start , News_submission_dt : end , CRITICALNEWS : 1}).toArray();
            if(jsonData.length === 0) return res.status(200).json({message : `No critical Announcements found over a period of time`});
      
       }else{
        let jsonData = await response.find({CRITICALNEWS : 1}).toArray();
        // console.log(jsonData)
    
        for(let i = 0; i < jsonData.length; i++){
   critcialAnnouncements.push(`The Critical announcement of the company ${jsonData[i].SLONGNAME} can be viewed by clicking on the url : ${jsonData[i].ATTACHMENTNAME}`)       
        }
        return res.status(200).json(critcialAnnouncements);
       }
       } catch (error) {
          console.log(error);
          return res.status(500).json({
            error : error.message
          })
       }

}

const getCriticalAnnouncementOfaCompany = async (req , res) => {
    try{
        const id = req.params.companyId;      
        const collection = await jsonResponseMethod();
        const responseFr = await collection.find({CRITICALNEWS : 1 }).toArray()
         
       for(let i = 0; i < responseFr.length; i++){
       const companyIdFromJson = responseFr[i].SCRIP_CD
        if(companyIdFromJson === id){
return res.status(200).json({announcement : `The Critical Announcement of ${responseFr[i].SLONGNAME} can be found in the pdf at the URL : ${responseFr[i].ATTACHMENTNAME}`})
          }
       }
   return res.status(400).json({message : `Could Not find the announcement of the company with ID : ${id}`})
         }catch(error){
                 console.log(error);
                 return res.status(500).json({
                  error : error.message
                 })
          }
}

const getPastAnnouncements = async (req , res) => {
try {
    const currentDate = new Date();
    const {pastDays} = req.body;

    if(pastDays > 2){
        return res.status(400).json({
            error : 'Only past announcements that took place over 2 days ago can be recieved'
        })
    }

    const pastDaysAgo = new Date(currentDate.getTime() - (pastDays * 24 * 60 * 60 * 1000));
    const collection = await jsonResponseMethod();
    const response = await collection.find({NEWS_DT : {$gte : pastDaysAgo}}).toArray();
    // console.log(response);
    let pastAnnouncements = []

    for(let i = 0; i < response.length; i++){
  pastAnnouncements.push(`the past announcement of the company ${response[i].SLONGNAME} can be found by clicking 
  on the URL : ${response[i].ATTACHMENTNAME}`)
    }

    return res.status(200).json(pastAnnouncements);

} catch (error) {
    console.log(error);
    return res.status(500).json({
        error : error.message
    })
}
}

module.exports = {
    getAllAnnouncements,
    getAllAnnouncementOfaCompany,
    getAnnouncementsOveraPeriodForCompanies,
    getCriticalAnnouncements,
    getCriticalAnnouncementOfaCompany,
    getPastAnnouncements
}
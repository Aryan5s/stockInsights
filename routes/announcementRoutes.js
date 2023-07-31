const express = require('express');
const router = express.Router();
const{
    getAllAnnouncements,
    getAllAnnouncementOfaCompany,
    getAnnouncementsOveraPeriodForCompanies,
    getCriticalAnnouncements,
    getCriticalAnnouncementOfaCompany,
    getPastAnnouncements
} = require('../controllers/announcementControllers');

// API to find announcements of a company(SCRIP_CD) or multiple companies.
router.get('/announcements' , getAllAnnouncements);
router.get('/announcements/:companyId' , getAllAnnouncementOfaCompany);

// API to find announcements over a specified period (start & end dates) or announcements of a 
// company/group of companies over a period.
router.get('/announcementOverPeriod?start={start}&end={end}' , getAnnouncementsOveraPeriodForCompanies);

// API to find all the critical announcements or critical announcements 
// of a list of companies over a given period.
router.get('/criticalAnnouncements' , getCriticalAnnouncements);
router.get('/criticalAnnouncements/:companyId' , getCriticalAnnouncementOfaCompany);

// API to retrieve announcements from the past 1-2 days in descending time order.
router.get('/pastAnnouncements' , getPastAnnouncements);

module.exports = router
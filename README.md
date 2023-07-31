## Live 
https://stock-insights-p9tddy9v8-aryan5s.vercel.app/

## Tech Stack 
NodeJS , ExpressJS, Python , MongoDb

## Environment Variables 
PORT , MONGODB_URL , DB_NAME , COLLECTION_NAME

## Running the code Locally 
-  Clone the Repository on to your local system.
```sh
git clone https://github.com/Aryan5s/stockInsights.git
```
-  Open it in the IDE of your Choice.
-   Open the terminal and Type in the following Code :
  ```sh
npm install
npm start
```
## Routes
## Get Announcements Routes
```sh
GET /announcements
GET /announcements/:companyId
GET /announcementOverPeriod?start={start}&end={end}
```
- The first route gets the announcements of all the companies from the JSON Data.
- The second Route gets the announcement of a particular company from the JSON Data using the company ID (SCRIP_CD)
- The third Route gets the announcements of multiple companies over a specific period of time [start , end]

  ## 
## Get CriticalAnnouncements Routes
```sh
GET /criticalAnnouncements
GET /criticalAnnouncements/:companyId
GET /criticalAnnouncementOverPeriod?start={start}&end={end}
```
- The first Route gets the Critical Announcements of all the companies from the JSON Data
- The second Route gets the Critical Announcement of a particular company from the JSON Data using the company ID (SCRIP_CD)
-  The third Route gets the Critical Announcements of multiple companies over a specific period of time [start , end]
  ##

## Get Past Announcement Routes 
```sh
GET /pastAnnouncements
```
- This route gets all the announcements of multiple companies that took place in the past 1-2 Days
- - Takes in Number of Past days in the request body from the Frontend
  


const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU9KWlJJWE0wQWVZVUZnT01oVmYxNXR1WWxuQm16SUF3RnZaWW5mZlZuND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRzlNcU1YcTZDNTl5U3IxNUY2VXdGei9JbHFJbnZJRFE1M3lxMG5uekZuOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyTVNmVEpzallDWHdmL0lDenVORDFuazV4RkNOVmMrbHdjK2FmWjIyYzB3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMWDExVGlndnpJNkJGbWp5cVlKdFY5MkxlY1YzeU9MREFVR2dsdVpURm1FPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlCbzZRNWlHOGlta1BncWR1VVhLTGFZem50dEJaSmkvWHVTVjhQMjhkRXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilk4Wk8yMzZyUGhhc2xLR1pWNlNkS0hUTzBaVnRLZVREQTlYeU1Tb2cwbHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0pCTDNQdDNTeWx2dytPYXJDNjF4RjJYN1VPS2NMUWhET2FJcDE2ZUkzWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYkFFRy9GY3d2QlloZjdMUEovakRTSGowRzdDTnlQWHVFUFViNXVjMlN5ST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFKMUtBczFlamtCbG5pSVdhMHJUeWpIbE1JTENLUHNtdm9lemcvNW50WndPNGxxUmFoQk9lV3lYL0JZbXRGWndka0F2ZW85b0ppNTdVci8wbGV6ZWdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUxLCJhZHZTZWNyZXRLZXkiOiJMZUFlS2IvQmZyK3N6cVlTRG8vcG9LVGpjQ1NKSVdyN2RHL2VDUmt3MldBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI3dzN3TUpOT1R5U0tDZHU5a0YwUmNnIiwicGhvbmVJZCI6IjU3NjBkYzEyLTM0YjMtNGZjOC04MDkyLTJmOGQ0YTU2ODJjZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSaXFOWU4xcWsxY3ZvMGhTWGFtaVpUZ0o2Uk09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1ZOcU5WdjBMREpabU5GZHlVVzZtWHRINnVvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQ3U0NUUUFBIiwibWUiOnsiaWQiOiIyNjM3ODkwODU1MzM6NzRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lXTGpaTUNFTTdhcjhBR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjVXU1BTZGpDbDByaTROUm5ZbFpSRmNqK3ducXBHV2g3cVNqb0pIc1dFeUE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjFQeGNlK0tpdTV5M1VkU1UyOFZzUjF4WXoveDlCcy9SNDBMZXA0TW1XeS9GdjVQRWs3STNaL2xaa09VYklQL3g4dm1DWmVTaG5aRWtJMWxQcGYwa0JBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJrNGdHdzBvdVpwMHRBNngvM3U5c3Qvc25sSzlBdlNsWWtpWW9jZWJaM3dCUTdiSkJEUEU2cjE5ZDR4a3BGM3daR1lrQmFzUnBsL3pZb2NHOTBQTDloUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4OTA4NTUzMzo3NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlVmtqMG5Zd3BkSzR1RFVaMkpXVVJYSS9zSjZxUmxvZTZrbzZDUjdGaE1nIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1NjEyMTI2fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "xh_clinton",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263789085533",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",       
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || "yes",                     
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Toxic-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.ibb.co/mChCjFPL/ad76194e124ff34e.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

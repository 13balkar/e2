const axios = require('axios');
const fetchDetails = async (url) => {
  const details = await axios.get(url)
    .then(response => {
      return response.data;
    });
  return details;
};

const convertCsvToJson = async (csv) => {
  csv = csv.split('\r');
  csv = csv[0].split('\n');
  const details = [];
  csv.map(entity => {
    let detail = entity.split('\r');
    detail = detail[0].split(',');
    if (detail[0] != 'company_id')
      details.push({ companyId: detail[0], sector: detail[1] });
  });
  return details;
};

const getDetailsById = async (details) => {
  let output = [];
  for (let i = 0; i < details.length; i++) {
    const data = await fetch('http://54.167.46.10/company/' + details[i].companyId).then(response => response.json());
    if (data.name === undefined) {
      continue;
    }
    output.push({ companyId: details[i].companyId, companyName: data.name, ceoName: data.ceo, sector: details[i].sector });
  }
  return output;
};

const addScore = async (details) => {
  let sectorDetails = {};
  for (let i = 0; i < details.length; i++) {
    if (sectorDetails[details[i].sector] === undefined) {
      const url = 'http://54.167.46.10/sector?name=' + details[i].sector;
      const data = await fetch(url).then(response => response.json());
      sectorDetails[details[i].sector] = data;
    }

    sectorDetails[details[i].sector].forEach(entity => {
      if (entity.companyId == details[i].companyId) {

        const index = entity.performanceIndex;
        const score = ((index[0].value * 10) + (index[1].value / 10000) + (index[2].value * 10) + index[3].value) / 4;
        console.log(score);
        details[i].score = score.toFixed(3);
      }
    });
  }
  return details;
};

module.exports = { fetchDetails, convertCsvToJson, getDetailsById, addScore };
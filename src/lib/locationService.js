const cityToDmaMap = {
  "barrie": "501",
  "orillia": "501",
  "belleville": "502",
  "peterborough": "502",
  "owen sound": "503",
  "burnaby": "504",
  "new westminster": "504",
  "surrey": "504",
  "calgary": "505",
  "banff": "505",
  "edmonton": "506",
  "fraser valley": "507",
  "hamilton": "508",
  "niagara": "508",
  "kitchener": "509",
  "waterloo": "509",
  "london": "510",
  "sarnia": "510",
  "mississauga": "511",
  "oakville": "511",
  "newfoundland": "512",
  "nwt": "513",
  "new brunswick": "514",
  "northern ontario": "515",
  "nova scotia": "516",
  "nunavut": "517",
  "okanagan": "518",
  "kootenays": "518",
  "ottawa": "519",
  "gatineau": "519",
  "pei": "520",
  "prince george": "521",
  "montreal": "522",
  "red deer": "523",
  "saskatchewan": "524",
  "toronto": "527",
  "vancouver": "528",
  "sunshine coast": "529",
  "islands": "529",
  "winnipeg": "530",
  "brandon": "530",
  "yukon": "531",
};

export function getDmaIdFromCity(cityName) {
  if (!cityName) return null;

  const cleanCity = cityName.trim().toLowerCase();
  console.log(cleanCity);
  console.log(cityToDmaMap[cleanCity]);
  return cityToDmaMap[cleanCity] || null;
}
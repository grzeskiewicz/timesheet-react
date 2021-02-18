import { API_URL, request } from './apiConnection.js';

const TRANSLATIONS = [
  { eng: "OFF", pl: "-" },
  { eng: "DAYSHIFT", pl: "Dzienna" },
  { eng: "NIGHTSHIFT", pl: "Nocna" },
  { eng: "SICK LEAVE", pl: "L4" },
  { eng: "HOLIDAY", pl: "Urlop" },
  { eng: "PUBLIC HOLIDAY", pl: "Święto" },
]

export const MONTH_LIST = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];



export const getUserSheet = (user) => {
  return fetch(request(`${API_URL}/getusersheet`, 'POST', user))
    .then(res => res.json())
    .then(result => {
      return fetch(request(`${API_URL}/getsummary`, 'POST', { user: user.id }))
        .then(res2 => res2.json())
        .then(result2 => {
          const translated = translate(result);
          const grouped = groupByState(translated);
          return { sheet: translated, grouped: grouped, summary: result2 };
        }).catch(error => Promise.reject(new Error(error)));
    }).catch(error => Promise.reject(new Error(error)));
}



export const translate = (sheet) => {
  for (const day of sheet) {
    const dayState = (TRANSLATIONS.filter(element => element.eng === day.state))[0].pl;
    day.state = dayState;
  }
  return sheet;
}

export const groupByState = (sheet) => {
  const stateGrouped = [];
  for (const elem of TRANSLATIONS) {
    stateGrouped[elem.pl] = []
  }
  const sheetCopy = JSON.parse(JSON.stringify(sheet));
  for (const day of sheetCopy) {
    if (stateGrouped[day.state] === undefined) stateGrouped[day.state] = [];
    stateGrouped[day.state].push(day);
  }
  return stateGrouped;
}
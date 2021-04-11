require('dotenv').config()
const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const port = process.env.PORT


// checkIfUserIsInGame
// input: userName (string)
// output: Promise<boolean>
// checkElapsedSecondsOfUser
// input: userName (string)
// output: secondsElapsed (Promise<number | null>)


// function getHtml(username) {
//   try {
//     return axios.get(encodeURI(`https://www.op.gg/summoner/spectator/userName=${username}`), {
//       headers: {
        // 'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
        // 'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
//       }
//     })
//   } catch (error) {
//     console.log(error);
//   }
// };

// function checkIfUserIsInGame(username) {
//   getHtml(username)
//     .then(html => {
//       const $ = cheerio.load(html.data);
//       const deactiveInGame = $("div.tabItem.Content.SummonerLayoutContent.summonerLayout-spectator > div > h2").text()
//       console.log(deactiveInGame)
//     })
// };

// checkIfUserIsInGame("Begln again")


function getHtml(username) {
  return new Promise(function(resolve, reject) {
    const test = axios.get(encodeURI(`https://www.op.gg/summoner/spectator/userName=${username}`), {
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
        'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    })
    resolve(test)
  })
}

getHtml
// function active() {
//   getHtml("가나라마아바")
//     .then(html => {
//       const $ = cheerio.load(html.data);
//       const activeInGame = $("div.SpectateSummoner > div > div.Content > table.Table.Team-100 > tbody > tr > td > a").text()
//       const timeCount = $("div.SpectateSummoner > div > div.Title > small.Time").text()

//       if (activeInGame) {
//         console.log(timeCount)
//       } else {
//         deactive()
//       }
//     })
// };

// function deactive() {
//   getHtml("Begln again")
//     .then(html => {
//       const $ = cheerio.load(html.data);
//       const deactiveInGame = $("div.tabItem.Content.SummonerLayoutContent.summonerLayout-spectator > div > h2").text()
//       console.log(deactiveInGame)
//     })
// }

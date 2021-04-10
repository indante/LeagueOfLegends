require('dotenv').config()
const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const port = process.env.PORT

function getHtml(username) {
  try {
    return axios.get(encodeURI(`https://www.op.gg/summoner/spectator/userName=${username}`), {
      headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
        'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    })
  } catch (error) {
    console.log(error);
  }
};

function active() {
  getHtml("White stardust")
    .then(html => {
      const $ = cheerio.load(html.data);
      const activeInGame = $("div.SpectateSummoner > div > div.Content > table.Table.Team-100 > tbody > tr > td > a").text()
      const timeCount = $("div.SpectateSummoner > div > div.Title > small.Time").text()
      if (activeInGame) {
        console.log(timeCount)
      } else {
        deactive()
      }
    })
};

function deactive() {
  getHtml("Begln again")
    .then(html => {
      const $ = cheerio.load(html.data);
      const deactiveInGame = $("div.tabItem.Content.SummonerLayoutContent.summonerLayout-spectator > div > h2").text()
      console.log(deactiveInGame)
    })
}

active()

// getHtml("IIIllIlIllIIlIII")
//     .then(html => {
//         const $ = cheerio.load(html.data);

//         const deactiveInGame = $("div.tabItem.Content.SummonerLayoutContent.summonerLayout-spectator")
//         const activeInGame = $("div.SpectateSummoner > div > div.Content > table.Table.Team-100 > tbody")

//         const deactiveText = $(deactiveInGame).find("div > p:nth-child(2)").text()
//         const activeText = $(activeInGame).find("tr > td > a").text()
//         console.log(activeText)
    // })
require('dotenv').config()
const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const port = process.env.PORT

const getHtml = async () => {
    try {
        return await axios.get("https://www.op.gg/summoner/spectator/userName=Begln%20again&", {
            headers: {
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36',
                'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
            }
        })
    } catch (error) {
        console.log(error);
    }
};

getHtml()
    .then(html => {
        const $ = cheerio.load(html.data);
        const selector = $("div.tabItem.Content.SummonerLayoutContent.summonerLayout-spectator")

        const text = $(selector).find("div > p:nth-child(2)").text()
        console.log(text)
    })


// playwright
// async function main(username) {
    // const browser = await playwright.chromium.launch({
    //     headless: false
    // });

    // const page = await browser.newPage();

    // const results = await page.goto(`https://www.op.gg/summoner/userName=${username}`);

//     const clickInGameButton = await page.click('dd.Item.tabHeader.inGame > a')
//     const awaitSelector = await page.waitForSelector('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-spectator > div')
//     const getInGameInfo = await page.$('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-spectator > div > p:nth-child(2)')
//     const inGameDeactive = await page.$('#SummonerLayoutContent > div.tabItem.Content.SummonerLayoutContent.summonerLayout-spectator > div > h2')
//     const test = await getInGameInfo.textContent()
//     const test2 = await inGameDeactive.textContent()

//     if (test == '현재 게임중이라면 다시 시도해주세요.'){
//         console.log(test2)
//         await browser.close();
//     }
// }

// main("Begln again")


// express
// app.get('/', async (req,res) => {
//     await res.send(main("Begln again"))
// })

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

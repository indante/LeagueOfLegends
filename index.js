const axios = require("axios");
const cheerio = require("cheerio");


function getHtml(username) {
  return axios
    .get(
      encodeURI(`https://www.op.gg/summoner/spectator/userName=${username}`),
      {
        headers: {
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
          "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        },
      }
    )
    .then((res) => res.data);
}


async function checkIfUserIsInGame(username) {
  const html = await getHtml(username);
  return html.includes("게임중이 아닙니다.") === false;
}


async function checkElapsedSecondsOfUser(username) {
  const html = await getHtml(username);

  if (!checkIfUserIsInGame(username)) {
    return null;
  }

  const $ = cheerio.load(html);
  const opggElapsedTime = $(
    "div.SpectateSummoner > div > div.Title > small.Time"
  ).text();

  return opggElapsedTime;
}


async function main() {
  const result = await checkElapsedSecondsOfUser("라쿤99");
  console.log(result);
}

checkIfUserIsInGame("Begln again")
  .then(res => {console.log(res)})
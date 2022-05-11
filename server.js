const express = require("express")
const urllib = require("urllib")
const path = require("path")

const app = express()

app.use(express.static(path.join(__dirname, "Dist")))
app.use(express.static(path.join(__dirname, "node_modules")))

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

app.get("/teams/:teamName", function (req, res) {
    const teamName = req.params.teamName
    const teamId = teamToIDs[teamName]
    const nba_API_URL = "http://data.nba.net/10s/prod/v1/2018/players.json"

    urllib.request(nba_API_URL, function (err, data) {
        const nbaData = JSON.parse(data).league.standard
        const nbaDataFiltered = nbaData.filter(players => players.teamId == teamId & players.isActive)
        const nbaDataMapped = nbaDataFiltered.map(player => ({ "firstName": player.firstName, "lastName": player.lastName, "jersy": player.jersey, "pos": player.pos }))
        res.send(nbaDataMapped)
    })

})

const port = 3010
app.listen(port, function () {
    console.log(`app is listening at port: ${port}`);
})
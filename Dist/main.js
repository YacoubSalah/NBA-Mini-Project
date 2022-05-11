const myRenderer = new renderer()
myRenderer.prepareHandlebars()

$("#getRosterButton").on("click", function () {
    const teamName = $("#teamNameInputField").val()
    const routeUrl = `/teams/${teamName}`
    $.get(routeUrl, function (data) {
        myRenderer.render(data)
    })
})

/* function getPlayerImage() {
    let firstName = "Lonzo"
    let lastName = "Ball"
    let route = `/player/?firstName=${firstName}&lastName=${lastName}`
    $.get(route, function (data) {
        console.log(data);
    })
}
 */
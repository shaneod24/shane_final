function keywordCrawler() {
    var url = '/pull?url=https://www.etsy.com/search?q=shane'


    return fetch(url)
        .then(async (response) => {
            //console.log(response.text())
            var hrefs = []
            const parser = new DOMParser();
            const doc = parser.parseFromString(await response.text(), "text/html");
            let divs = await doc.getElementsByTagName('a')
            for (i = 0; i < divs.length; i++) {
                if (divs[i].className.indexOf('listing-link') !== -1) {
                    hrefs.push(divs[i].href)
                }
            }


            return hrefs

        })
}


// Promise.all([
//     fetch('https://jsonplaceholder.typicode.com/todos/1').then(resp => resp.json()),
//     fetch('https://jsonplaceholder.typicode.com/todos/2').then(resp => resp.json()),
//     fetch('https://jsonplaceholder.typicode.com/todos/3').then(resp => resp.json()),
// ]).then(console.log)

async function getListingInfo() {
    var links = await keywordCrawler()
    var data = []

    for (i = 0; i < links.length; i++) {
        var response = await fetch('/pull?url=' + links[i])
        var responsetest = await response.text()
        data.push(links[i])
    }
    return data

}

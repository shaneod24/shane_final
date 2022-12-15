function ajaxPull() {
    var url = '/pull?url=https://stackoverflow.com/questions/50978754/how-to-render-html-from-a-external-js-file'


    return fetch(url)
        .then((response) => {
            return response.text()
        })


}


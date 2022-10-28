const markdownElement = document.getElementById('markdowns') /// <div> hvor markdown text blir plasert
const markdownList = document.getElementById('list') /// <div> liste for å navigere mellom til md på siden

async function getFile(){
    
    const response = await fetch('https://raw.githubusercontent.com/<name>/<reponame>/main/<txtfilename>.txt') /// endre url til filens plassering
    const text = await response.text()
    const markdowns = text.trim().split('\n')
    return markdowns
}

async function getMarkdowns(){
    const markdowns = await getFile()
    const responses = []

    for(var filename of markdowns){
        const response = await fetch(`https://raw.githubusercontent.com//<name>/<reponame>/main/${filename}.md`) /// endre url til filens palssering men behold ${filename} delen
        const text = await response.text()
        responses.push({
            text:text,
            name:filename
        })
    }

    return responses
}

async function showMarkdowns(){
    const markdowns = await getMarkdowns()
    const converter = new showdown.Converter()

    for(var markdown of markdowns){
        var html = drawdown(markdown.text)

        markdownElement.innerHTML +=(`<div><a id="${markdown.name}"></a>${html}</div>`)
        markdownList.innerHTML +=(`<a href="#${markdown.name}">${markdown.name}</a>`)
    }
    
}

showMarkdowns()

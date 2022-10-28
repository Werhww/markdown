const markdownElement = document.getElementById('markdowns')
const markdownList = document.getElementById('list')

async function getFile(){
    
    const response = await fetch('https://raw.githubusercontent.com/Werhww/markdown/main/markdowns.txt')
    const text = await response.text()
    const markdowns = text.trim().split('\n')
    return markdowns
}

async function getMarkdowns(){
    const markdowns = await getFile()
    const responses = []

    for(var filename of markdowns){
        const response = await fetch(`https://raw.githubusercontent.com/Werhww/markdown/main/${filename}.md`)
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
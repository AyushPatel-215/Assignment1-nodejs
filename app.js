
const fetch = require('node-fetch')
const fs = require('fs')
const {stringify} = require('csv-stringify');

var arr = []
class Data {

    constructor(forks,name,description,html_url,watchers_count,stargazers_count,forks_count)
    {
        this.name = name
        this.forks = forks
        this.description = description
        this.html_url = html_url
        this.watchers_count = watchers_count
        this.stargazers_count = stargazers_count
        this.forks_count = forks_count
        
        arr = [this.name,this.forks,this.description,this.html_url,this.watchers_count,this.stargazers_count,this.forks_count]
    }
    saveAsCsv() {
        console.log(arr.length)
            arr.forEach(element => {
                console.l

        
                og(element)
            })

        stringify([arr], (error , response) => {
            if(error)
                return console.log(error)
            
            try {
                fs.ap

        
                pendFileSync('src/getData.csv',response)
            } catch (error) {
                return console.log(error)
            }
        })
        
    }
    
}



async function getData() {

    const getval = await fetch('https://api.github.com/search/repositories?q=language:Python')
    const response  = await getval.json()
    
    for(let i=0;i<30;i++){
        
        const forks = response.items[i]['forks']
        const name = response.items[i]['name']
        const description = response.items[i]['description']
        const html_url = response.items[i]['owner']['html_url']
        const watchers_count = response.items[i]['watchers_count']
        const stargazers_count = response.items[i]['stargazers_count']
        const forks_count = response.items[i]['forks_count']
        
        if(forks>=200 && stargazers_count>2000)
        {
            console.log('Api is working')
            const data = new Data(forks,name,description,html_url,watchers_count,stargazers_count,forks_count)
            data.saveAsCsv()
        }     
    }
}

getData()
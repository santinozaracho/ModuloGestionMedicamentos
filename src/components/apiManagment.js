//only JS Script..


var getFiles = async (url) => {
    await fetch(url)
        .then( (response) => {
            let resJson = response.json()
            let resItems = [];
            console.log(resJson);    
            resJson.map((item) => {
                resItems.push(item);})
            Promise.resolve(resItems)} )
        .catch( (error) => {
            return Error(error)
            } )
    };


export default {getFiles}
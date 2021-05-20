const str ="AbcDefG一二三四，HijkLme"
let result = str.replace(/[a-zA-Z]/g, content =>{
    // return content.toUpperCase() === content ? content.toLowerCase() : content.toUpperCase()
    // return content.charCodeAt() >= 65 && content.charCodeAt() < 90 ? content.toLowerCase() : content.toUpperCase()
    console.log(content);
    return content.toUpperCase() == content ? content.toLowerCase() : content.toUpperCase();

})
console.log(result);
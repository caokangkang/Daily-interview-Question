const client = new XMLHttpRequert()
client.open("GET", url)
client.onreadystatechange = function (){
    if(client.readystate != 4){
        return
    }
    if(client.status >=200 && client.status < 300  || client.status == 304){
        resolve(this.respose)
    }else{
        inject(new Error(this.statusText))
    }
}
// 设置发送的数据,用send发送请求
client.send()
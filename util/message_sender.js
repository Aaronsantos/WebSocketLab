const Broker = require("./broker_tools")


class {

    static count; 

    static conect(address, queue) {

        count = 1; 
        Broker.conect(address, queue)
    }



    static  send(msg) {
        count += 1 
        msg["count"] = count
        Broker.sendMsg(msg)
        console.log("Mensagem enviada:")
        console.table(msg)
    }

    static getMsg() {
        Broker.getMsg(processMsg)
    }

    static processMsg = (msg) => {
        if(msg["count"] > count) count = msg["count"] + 1 
        else {
            count += 1 
            msg["count"] = count
        }
        console.log("Mensagem recebida:")
        console.table(msg)
    }
}
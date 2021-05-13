import * as chalk from 'chalk'

/*
 * Creates a log line in the console and the logs.txt file depending on the severity.... TODO: Make the logs.txt file
 * @param {string} message
 * @params {string} type
 */
export function logger(message:string, type:string = "info"){
    let displayMessage = ''
    switch (type){
        case 'info':
            displayMessage = chalk.bgBlue.bold(" INFO ") + '  ' + message
            break
        case 'warn':
            displayMessage = chalk.bgYellow.black.bold(" WARN ") + '  ' + message
            break
        case 'error':
            displayMessage = chalk.bgRed.bold(" ERROR ") + ' ' + message
            break
        default:
            logger("A call to the logger function has an incorrect type", "error")
            return
    }
    console.log(displayMessage)
}
const DISCLAIMER_KEY = "disclaimer";
const SESSION_KEY = "session-id";

/*        Disclaimer            */

export const getDisclaimer = () => {
    var pattern = RegExp(DISCLAIMER_KEY + "=.[^;]*")
    var matched = document.cookie.match(pattern)
    if(matched){
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}

export const saveDisclaimer = data => {
    document.cookie = `${DISCLAIMER_KEY}=${data}; expires=Thu, 18 Dec 2035 12:00:00 UTC`;
}

export const destroyDisclaimer = () => {
    document.cookie = DISCLAIMER_KEY + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/*        Session            */

export const getSessionId = () => {
    var pattern = RegExp(SESSION_KEY + "=.[^;]*")
    var matched = document.cookie.match(pattern)
    if(matched){
        var cookie = matched[0].split('=')
        return cookie[1]
    }
    return false
}

export const saveSessionId  = () => {
    //let sessionId = Math.floor((Math.random() * 1000000) + 1);
    let sessionId = Math.random().toString(36).substring(2,15);
    document.cookie = `${SESSION_KEY}=${sessionId}; expires=Thu, 18 Dec 2035 12:00:00 UTC`;
    return sessionId;
}

export const destroySessionId  = () => {
    document.cookie = SESSION_KEY + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export default {
    getDisclaimer,
    saveDisclaimer,
    destroyDisclaimer,
    getSessionId,
    saveSessionId,
    destroySessionId
 }
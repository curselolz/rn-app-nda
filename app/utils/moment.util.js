import moment from 'moment-timezone'

export const timeToDisplay = (time) => {
    let timeZone = moment.tz.guess()
    let london = 'Atlantic/Azores'

    var londonTime = moment.tz(time, london);
    var myTime = londonTime.clone().tz(timeZone)
    return myTime.format('MMM DD YYYY hh:mm:ss A')
}
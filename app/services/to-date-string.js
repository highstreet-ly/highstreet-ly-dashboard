import Service from '@ember/service';

export default class ToDateStringService extends Service {
    parse(date, add) {
        date = this.addHours(date, add);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        if (hour < 10) {
            hour = '0' + hour
        }
        let minute = date.getMinutes();

        return `${year}-${month}-${day}T${hour}:${minute}:00.0000000+00:00`;
    }

    addHours(date, h) {
        date.setTime(date.getTime() + (h * 60 * 60 * 1000));
        return date;
    }
}

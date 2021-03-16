import moment from 'moment';

export function fixExamData(rawExamData) {
    let Exams = []

    rawExamData.forEach(item => {
        let status = '';
        let type = 0;

        let startDate = moment(item.startTime).format("LL");
        let startTime = moment(item.startTime).format("LT");
        let endTime = moment(item.endTime).format("LT");

        switch (item.status) {
            case 'NON_CONFIRM':
                status = 'Nie potwierdzony';
                type = 1;
                break;
            case 'CONFIRMED':
                status = 'Potwierdzony';
                type = 2;
                break;
            case 'PENDING':
                status = 'Trwa';
                type = 3;
                break;
            case 'FINISHED':
                status = 'Zakończony';
                type = 4;
                break;
            default:
                status = 'None';
                type = 0;
                break;
        }

        Exams.push({
            id: item.examId,
            title: item.title,
            startDate: startDate,
            startTime: startTime,
            endTime: endTime,
            status: status,
            type: type
        })
    })

    return Exams;
}


//import App from './App';
import CommuteInfo from './calculation';
import { roundNearestCent } from './calculation';

const commute = new CommuteInfo(5, 10);
const commute0 = new CommuteInfo(5, 10, 0);
const commute1 = new CommuteInfo(5, 10, 1);
const commute2 = new CommuteInfo(5, 10, 2);
const commute3 = new CommuteInfo(5, 10, 3);
const commute4 = new CommuteInfo(5, 10, 4);
const commute5 = new CommuteInfo(5, 10, 5);

test('Roundtrip miles are double commute', () => {

    expect(commute.roundtripDistance()).toEqual(10);
});

test('Roundtrip time to be double commute', () => {

    expect(commute.roundtripTime()).toEqual(20);
});

test('0 day remote cost is correct', () => {
    expect(commute.fullyInPersonCommutingWeeklyCost().toFixed(2)).toEqual("29.25");
});


test('0-5 day remote cost is correct', () => {
    expect(commute0.remoteSavingsWeekly().toFixed(2)).toEqual("29.25");
    expect(commute1.remoteSavingsWeekly().toFixed(2)).toEqual("23.40");
    expect(commute2.remoteSavingsWeekly().toFixed(2)).toEqual("17.55");
    expect(commute3.remoteSavingsWeekly().toFixed(2)).toEqual("11.70");
    expect(commute4.remoteSavingsWeekly().toFixed(2)).toEqual("5.85");
    expect(commute5.remoteSavingsWeekly().toFixed(2)).toEqual("0.00");
});

// Todo: seperate communteInfo from calculation of remote savings
// such as commuteInfo, RemoteDays, RemoteSavings(takes commuteInfo and RemoteDays)

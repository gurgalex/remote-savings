import Big from 'big.js';
//Big.strict = true;

type Miles = number;
type Minute = number;
type Day = number;
type Dollar = number;


export function roundNearestCent(n: Dollar): Dollar {
    return Math.round(n * 100) / 100;
}


export default class CommuteInfo {
    static IRS_MILE_COST: number = 0.585;
    static WORK_DAYS: number = 5;
    commuteDistance: Miles;
    commuteMinutes: Minute;
    daysPerWeekCommuting: Day = CommuteInfo.WORK_DAYS;

    constructor(distance: Miles, minutes: Minute, days_per_week_commuting: Day = CommuteInfo.WORK_DAYS) {
        this.commuteDistance = distance;
        this.commuteMinutes = minutes;
        this.daysPerWeekCommuting = Math.min(CommuteInfo.WORK_DAYS, days_per_week_commuting);
    }

    public dailyCommuteCost(): Big {
        return Big(CommuteInfo.IRS_MILE_COST).mul(this.roundtripDistance());
    }

    public fullyInPersonCommutingWeeklyCost(): Big {
        return Big(this.dailyCommuteCost()).mul(CommuteInfo.WORK_DAYS);
    }

    public remoteSavingsWeekly(): Big {
        const remoteDays = CommuteInfo.WORK_DAYS - this.daysPerWeekCommuting;
        return Big(this.dailyCommuteCost())
            .mul(remoteDays);
    }

    public roundtripDistance(): Miles {
        return this.commuteDistance * 2;
    }

    public roundtripTime(): Minute {
        return this.commuteMinutes * 2;
    }

}

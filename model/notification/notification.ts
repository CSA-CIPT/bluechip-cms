export enum NotificationToggleStatus {
    ON = "ON",
    OFF = "OFF",
}

export enum NumberRangeCategory {
    RANGE_0_10M = 'RANGE_0_10M',
    RANGE_10M_100M = 'RANGE_10M_100M',
    RANGE_100M_500M = 'RANGE_100M_500M',
    RANGE_500M_1B = 'RANGE_500M_1B',
    RANGE_1B_5B = 'RANGE_1B_5B',
    RANGE_OVER_5B = 'RANGE_OVER_5B',
}

// Base class for common properties
class BaseProperty {
    constructor(public status: NotificationToggleStatus) {}
}

export class NumberRangeProperty extends BaseProperty {
    constructor(
        public numberRangeCategory: NumberRangeCategory,
        status: NotificationToggleStatus
    ) {
        super(status);
    }
}

export class UserStockProperty extends BaseProperty {
    constructor(public stocks: string[], status: NotificationToggleStatus) {
        super(status);
    }
}

export class ActiveDurationProperty extends BaseProperty {
    constructor(public activeDuration: number, status: NotificationToggleStatus) {
        super(status);
    }
}

export class UserTradingProperty {
    constructor(
        public activeDurationProperty: ActiveDurationProperty,
        public hasPortfolioStatus: NotificationToggleStatus,
        public status: NotificationToggleStatus
    ) {}
}

export class NotificationProperty {
    constructor(
        public userStockProperty: UserStockProperty,
        public numberRangeProperty: NumberRangeProperty,
        public noStocks: NotificationToggleStatus,
        public onlyNewUser: NotificationToggleStatus,
        public userTradingProperty: UserTradingProperty,
        public useProperty: NotificationToggleStatus
    ) {}
}

export class AppNotification {
    constructor(
        public id: string,
        public title: string,
        public body: string,
        public imageUrl: string,
        public status: string,
        public scheduled: string,
        public scheduledDate: string,
        public scheduledTime: string,
        public scheduleType: string,
        public type: string,
        public lastSent: number,
        public stockCode: string[],
        public notificationProperty: NotificationProperty
    ) {}
}

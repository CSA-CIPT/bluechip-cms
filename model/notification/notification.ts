export interface AppNotification {
    id: string,
    title: string,
    body: string,
    imageUrl: string,
    status: string,
    scheduled: string,
    scheduledDate: string,
    scheduledTime: string,
    scheduleType: string,
    type: string,
    lastSent: number,
    stockCode: string[]
}
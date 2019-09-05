import { SubscribedUsers } from './subscribed-users';

export class Trip {
    id:string;
    userId:string;
    name:string;
    info:string;
    startPoint:string;
    destination:string;
    startTime:Date;
    suitableForKids:boolean;
    subscribed:SubscribedUsers[] = [];
    equipmentsIds: string[] = [];
    terrain: string;
    endurance: string;
    type: string;
    difficulty: string;
    startHour: string;
    dateFormatted: string;

}

import { User } from './User';

export class Trip {
    id:string;
    name:string;
    info:string;
    startsPoint:string;
    destination:string;
    startTime:Date;
    suitableForKids:boolean;
    subscribed:string[] = [];
    equipmentsIds: string[] = [];
    terrain: string;
    endurance: string;
    type: string;
    difficulty: string;

}

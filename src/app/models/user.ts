import { Terrain, Endurance, Type, Difficulty} from './enums';
import { Equipment } from './equipment';

export class User{
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    terrain: Terrain;
    endurance:Endurance;
    typeOfRoute:Type;
    difficulty:Difficulty;
    equipments: string[] = [];
}


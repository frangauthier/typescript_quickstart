export interface iPerson {
    firstname: string
    lastname: string
}

export interface iCar {
    color: string
    model: string
    year: number
    owner: iPerson[]
    options?: {
        ac: boolean
    }
}

export type Person = {
    firstname: string
    lastname: string
}

export type somewhatDate = string | Date;

export class Car implements iCar {

    color: string;
    model: string;
    year: number;
    owner: iPerson[];
    options?: {
        ac: boolean
    }

    constructor(args: iCar) {
        // if(!args.color) throw Error()
        this.color = args.color;
        this.model = args.model;
        this.year = args.year;
        this.owner = args.owner;
        this.options = args.options || undefined;
    }
}
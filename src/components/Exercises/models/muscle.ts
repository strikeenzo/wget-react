import { Adapter } from "utils/Adapter";

export class Muscle {
    constructor(
        public id: number,
        public name: string,
        public isFront: boolean
    ) {
    }

}

export class MuscleAdapter implements Adapter<Muscle> {
    fromJson(item: any): Muscle {
        return new Muscle(
            item.id,
            item.name,
            item.is_front
        );
    }

    toJson(item: Muscle): any {
        return {
            id: item.id,
            name: item.name,
            is_front: item.isFront
        };
    }
}
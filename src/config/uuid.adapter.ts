import { v4 as uuid } from "uuid";

export class UuidApater{

    public static v4(){
        return uuid();
    }
}
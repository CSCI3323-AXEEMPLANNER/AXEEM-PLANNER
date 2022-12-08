import { ObjectID } from "bson";

export function to_ObjectID(str) {
    return new ObjectID(str);
};

export function OID_toString(ObjectID) {
    return ObjectID.toString();
}
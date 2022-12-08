import { ObjectID } from "bson";

export class Todo {
    constructor({
      title,
      desc,
      createdOn,
      _partition,
      urgent,
      date,
      time,
      id = new ObjectID(),
    }) 
    {
      this._partition = _partition;
      this._id = id;
      this.title = title;
      this.desc = desc;
      this.urgent = urgent;
      this.date = date;
      this.time = time;
      this.createdOn = createdOn;
    }
    static schema = {
      name: 'Todo',
      properties: {
        _id: 'objectId',
        _partition: 'string',
        createdOn: 'date',
        desc: 'string',
        title: 'string',
        time: 'string',
        date: 'string',
        urgent: 'bool'
      },
      primaryKey: '_id',
    };
}
export class Class {
  constructor({
    title,
    subject,
    desc,
    endTime,
    startTime,
    professor,
    participating,
    code,
    createdOn,
    id = new ObjectID(),
  }) 
  {
    this.endTime = endTime;
    this.subject = subject;
    this.startTime = startTime;
    this.professor = professor;
    this.participating = participating;
    this._id = id;
    this.title = title;
    this.desc = desc;
    this.createdOn = createdOn;
    this.code = code;
  }
  static schema = {
    name: 'Class',
  properties: {
    _id: 'objectId',
    subject: 'string',
    code: 'string',
    createdOn: 'date',
    desc: 'string',
    endTime: 'string',
    professor: 'objectId[]',
    participating: 'objectId[]',
    startTime: 'string',
    title: 'string',
  },
  primaryKey: '_id',
};
}
export class userCollection {
  constructor({
    userId,
    password,
    createdOn,
    classes,
    role,
    _partition,
    id = new ObjectID(),
  }) 
  {
    this._partition = _partition;
    this._id = id;
    this.role = role;
    this.userId = userId;
    this.password = password;
    this.createdOn = createdOn;
    this.classes = classes;
  }
  static schema = {
    name: 'userCollection',
  properties: {
    _id: 'objectId',
    _partition: 'string',
    role: 'string',
    classes: 'objectId[]',
    createdOn: 'date',
    password: 'string',
    userId: 'string',
  },
  primaryKey: '_id',
};
}
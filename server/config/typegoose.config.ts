import * as mongoose from "mongoose";

export const getMongoString = () =>
    'mongodb://' +
    process.env.MONGO_LOGIN +
    ':' +
    process.env.MONGO_PASSWORD +
    '@' +
    process.env.MONGO_HOST +
    ':' +
    process.env.MONGO_PORT +
    '/' +
    process.env.MONGO_AUTHDATABASE;

export const getMongoOptions = () => ({
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

export class MongooseConnection {
    connection: mongoose.Connection;
    mongoose: typeof mongoose;
    private static instance: MongooseConnection;

    constructor(private getMongoString, private getMongoOptions) {}

    public static getInstance(): MongooseConnection {
        if (!MongooseConnection.instance) {
            MongooseConnection.instance = new MongooseConnection(getMongoString, getMongoOptions);
        }

        return MongooseConnection.instance;
    }

    public getConnection() {
        if (this.connection) {
            return this.connection
        } else {
            this.getMongoose().connect(this.getMongoString(), this.getMongoOptions());
            this.connection = this.getMongoose().connection;

            this.connection.on('error', (error) => {
                console.log('connection error: ', error)
            });
            this.connection.once('open', function () {
                console.log('Mongo got connected')
            });
            return this.connection
        }
    }

    public getMongoose() {
        if (!this.mongoose) {
            this.mongoose = mongoose
            return this.mongoose
        } else {
            return this.mongoose
        }
    }
}
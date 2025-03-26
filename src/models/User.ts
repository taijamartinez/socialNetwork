interface IUser extends Document {
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must match an email address!']
            },
        
            thoughts: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Thought',
                },
            ],
            friends: [
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
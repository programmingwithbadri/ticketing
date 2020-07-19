import mongoose from 'mongoose';
import { Password } from '../utils/password'

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
    email: string;
    password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// This will be called everytime before the mongoose save method
userSchema.pre('save', async function (done) {
    // If the save operation involves the pwd field of document
    if (this.isModified('password')) {
        const hashedPwd = await Password.toHash(this.get('password'));
        this.set('password', hashedPwd);
    }

    done(); // done is inbuilt mongoose method to ack, operation is done
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
};

// User of type User model
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

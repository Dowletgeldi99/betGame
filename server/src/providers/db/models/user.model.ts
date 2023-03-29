import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
    @Prop({unique: true})
    name: string;

    @Prop({
        required: false,
    })
    ws_id: string;

    // @ApiProperty()
    // @Prop({
    //   required: false,
    //   type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Post' }],
    // })
    // posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);

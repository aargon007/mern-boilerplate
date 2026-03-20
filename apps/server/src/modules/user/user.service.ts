import { TUser } from '@/modules/user/user.interface';
import { User } from '@/modules/user/user.model';

// create password
const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
};

export const UserServices = {
    createUserIntoDB
};

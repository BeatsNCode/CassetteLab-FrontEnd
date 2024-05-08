import bcrypt from 'bcryptjs';


export default function hashPassword(password: string) {

    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(`${password}`, salt);


}


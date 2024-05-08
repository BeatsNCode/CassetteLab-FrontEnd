import bcrypt from 'bcryptjs-react';


export default function hashPassword(password: FormDataEntryValue | null) {

    const salt = bcrypt.genSaltSync(0);

    return bcrypt.hashSync(`${password}`, salt);


}


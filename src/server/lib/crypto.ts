import * as bcrypt from 'bcrypt'

export default function crypto(){
const saltRounds = 10

    function encrypt(password: string): string{
        return  bcrypt.hashSync(password, saltRounds)
    }

    function compareWithHash(password: string, hash: string): boolean{
        return bcrypt.compareSync(password, hash)
    }

    return {encrypt, compareWithHash}
}
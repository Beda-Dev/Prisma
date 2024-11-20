import * as bcrypt from 'bcrypt';


export async function hashPassword(password: string , nombre: number): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, nombre);
    return hashedPassword;
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hashedPassword);
    return match; 

}

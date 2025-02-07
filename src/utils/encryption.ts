import Cryptr from 'cryptr';

export function encrypt(text: string):string {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const secretKey = process.env.NEXTAUTH_SECRET!
    const cryptr = new Cryptr(secretKey);

    const encryptedText = cryptr.encrypt(text);
    return encryptedText;
}

export function decrypt(encryptedText: string):string {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    const secretKey = process.env.NEXTAUTH_SECRET!;
    const cryptr = new Cryptr(secretKey);

    const decryptedText = cryptr.decrypt(encryptedText);
    return decryptedText;
}
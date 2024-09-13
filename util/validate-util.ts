export class ValidateUtil {
    static isEmpty(value: string): boolean {
        return !value.trim().length;
    }

    static hasMinLength(value: string, minLength: number): boolean {
        return value.length >= minLength;
    }

    static isValidEmail(value: string): boolean {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    }

    static areFieldsEmpty<T>(obj: T): boolean {
        return Object.values(obj).some(value => typeof value === 'string' && value.trim() === '');
    }

    static combineFields<T>(obj: T): string {
        return Object.values(obj)
            .map(value =>
                Array.isArray(value) ? value.join(' ') : value
            )
            .map(value => value.toString())
            .join(' ');
    }


}
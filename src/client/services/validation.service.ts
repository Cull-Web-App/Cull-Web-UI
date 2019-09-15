export const required = (value: string): string | undefined => 
{
    if (value === undefined)
    {
        return 'Required';
    }
}

export const validatePassword = (value: string): string | undefined =>
{
    if (value.length < 10)
    {
        return 'Must be at least 10 characters';
    }
}

export const validateEmail = (value: string): string | undefined =>
{
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
    {
        return 'Invalid Email'
    }
}
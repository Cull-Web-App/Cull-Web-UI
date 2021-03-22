export const required = (value: string | undefined): string | undefined => 
{
    if (!value)
    {
        return 'Required';
    }
}

export const validatePassword = (value: string | undefined): string | undefined =>
{
    if (value && value.length < 10)
    {
        return 'Must be at least 10 characters';
    }
}

export const validateEmail = (value: string | undefined): string | undefined =>
{
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
    {
        return 'Invalid Email';
    }
}
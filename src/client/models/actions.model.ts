import { User, Tokens } from "./user.model";

// This IAction interface might want to be moved over to some interfaces folder
export interface IAction
{
    type: string;
    message?: string;
    error?: string;
};

export interface IUserAction extends IAction
{
    user: User;
};

export interface ITokenAction extends IAction
{
    tokens: Tokens
}
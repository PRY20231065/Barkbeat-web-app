import { Menu } from '../menu/menu';
import { User } from '../user/user';

export class Login {
    success: boolean;
    data: {
        id: string;
        email: string;
        token: string;        
    };
    messages: string
}

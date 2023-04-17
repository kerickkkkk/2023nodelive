import { Request, Response } from 'express';

export const users = {
    index : (req: Request, res: Response): void =>  {
        res.send('resdsouddde');
      }
}

export default users
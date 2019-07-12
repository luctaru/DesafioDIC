import { Users } from './users';
import { Status } from './status';
import { Periods } from './periods';

export interface Dics {
  id: number;
  user: Users;
  status: Status;
  period: Periods;
  description: string;
  startDate: Date;
  finishedDate: Date;
  isLate: number;
}

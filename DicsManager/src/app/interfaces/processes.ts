import { Departments } from './departments';

export interface Processes {
  id: number;
  department: Departments;
  name: string;
  removed: boolean;
}

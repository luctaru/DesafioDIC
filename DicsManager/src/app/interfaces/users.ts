import { Departments } from './departments';
import { Processes } from './processes';

export interface Users {
  id: number;
  name: string;
  avatar: string;
  email: string;
  department: Departments;
  process: Processes;
  isLeaderDepartment: number;
  isLeaderProcess: number;
  removed: number;
}

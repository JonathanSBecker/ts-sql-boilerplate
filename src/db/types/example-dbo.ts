import Example from "../../types/example";
import { RowDataPacket } from 'mysql2';

export interface ExampleDbo extends Example, RowDataPacket {}

import dotenv from 'dotenv';
import { RowDataPacket } from 'mysql2';

import mysql from 'mysql2/promise';

import logger from './logger';
import Transaction from '../db/types/transaction';
import SystemError from '../error/SystemError';

dotenv.config();

const { MYSQL2_URL, MYSQL2_USER, MYSQL2_PASSWORD, MYSQL2_DATABASE } =
  process.env;

if (!MYSQL2_URL || !MYSQL2_USER || !MYSQL2_PASSWORD || !MYSQL2_DATABASE) {
  logger.crit(
    'Unable to configure database connection, environment variables missing.',
  );
  // A full system exit is necessary here, because in this condition we would be missing critical env variables.
  // eslint-disable-next-line n/no-process-exit
  process.exit(20);
}

let pool: mysql.Pool | null = null;

export const getPool = async () => {
  if (!pool) {
    try {
      pool = mysql.createPool({
        host: MYSQL2_URL,
        user: MYSQL2_USER,
        password: MYSQL2_PASSWORD,
        database: MYSQL2_DATABASE,
        connectionLimit: 10,
        idleTimeout: 15000,
      });
    } catch (error) {
      logger.crit(error);
      throw new SystemError('Unable to connect to mysql');
    }
  }
  return pool;
};

const getConnection = async () => {
  const pool = await getPool();
  return pool.getConnection();
};

/**
 * Executes a series of SQL transactions in a database transaction. No transactions will be completed if any fail.
 *
 * @param {Transaction[]} transactions - An array of transactions where each transaction contains SQL query and parameters.
 * @returns {Promise<void>} - A Promise that resolves when all transactions are executed successfully within a database transaction.
 */
export const useTransaction = async (
  transactions: Transaction[],
): Promise<void> => {
  const connection = await getConnection();

  try {
    await connection.beginTransaction();

    for (const transaction of transactions) {
      const { sql, values } = formatNamedParameters(
        transaction.sql,
        transaction.params,
      );
      await connection.execute(sql, values);
    }

    await connection.commit();
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    logger.error('Unable to complete database transaction', error);
    throw new SystemError('Unable to execute database transaction.');
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

/**
 * Converts a Date object to ISO string
 * @param date
 */
export const convertDate = (date: Date) => {
  return date.toISOString().slice(0, 23).replace('T', ' ');
};

/**
 * @returns DB formatted DateTime string
 */
export const now = () => {
  return convertDate(new Date());
};

/**
 * Formats an SQL query by replacing named parameters with `?` placeholders and producing an array of values.
 *
 * This function processes SQL strings containing named parameters in the format `:paramName` and replaces
 * them with the appropriate `?` placeholders that can be used in database query execution. The values for
 * the placeholders are extracted from the provided `params` object.
 *
 * Named parameters can either be single values or arrays. If an array is passed as a parameter value, each
 * element of the array is expanded into individual `?` placeholders in the query, and all values will be included
 * in the output `values` array.
 *
 * Throws an error if a named parameter is referenced in the SQL string but not found in the `params` object.
 *
 * @param {string} sql - The SQL query string containing named parameters in the format `:paramName`.
 * @param {Record<string, unknown>} params - An object mapping parameter names to their corresponding values.
 * @returns {{ sql: string; values: unknown[] }} An object containing the formatted SQL string and an array of values for the placeholders.
 */
const formatNamedParameters = (
  sql: string,
  params: Record<string, unknown>,
): { sql: string; values: unknown[] } => {
  const values: unknown[] = [];
  const newSql = sql.replace(/:\w+/g, match => {
    const paramName = match.slice(1);
    if (!(paramName in params)) {
      throw new SystemError(`Parameter '${paramName}' is missing`);
    }

    const paramValue = params[paramName];
    if (paramValue === undefined) {
      values.push(null);
      return '?';
    }
    if (Array.isArray(paramValue)) {
      const placeholders = paramValue.map(() => '?').join(', ');
      values.push(...paramValue);
      return placeholders;
    } else if (paramValue instanceof Date) {
      values.push(convertDate(paramValue));
      return '?';
    } else {
      values.push(paramValue);
      return '?';
    }
  });
  return { sql: newSql, values };
};

/**
 * Query for a single result. If your query returns multiple results, only the first result is returned.
 * @param transaction
 */
export const query = async <T extends RowDataPacket>(
  transaction: Transaction,
): Promise<T | undefined> => {
  const connection = await getConnection();
  const { sql, values } = formatNamedParameters(
    transaction.sql,
    transaction.params,
  );
  const [rows] = await connection.query<T[]>(sql, values);
  connection.release();
  return rows[0];
};

/**
 * Query for all data for a condition
 * @param transaction
 */
export const queryArray = async <T extends RowDataPacket>(
  transaction: Transaction,
): Promise<T[]> => {
  const connection = await getConnection();
  const { sql, values } = formatNamedParameters(
    transaction.sql,
    transaction.params,
  );
  const [rows] = await connection.query<T[]>(sql, values);
  connection.release();
  return rows;
};

/**
 * Execute changes
 * @param transaction
 */
export const execute = async (transaction: Transaction): Promise<void> => {
  const connection = await getConnection();
  const { sql, values } = formatNamedParameters(
    transaction.sql,
    transaction.params,
  );
  await connection.execute(sql, values);
  connection.release();
};

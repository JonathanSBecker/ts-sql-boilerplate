import Example from '../types/example';
import { execute, now, query, queryArray } from '../utils/db';
import { ExampleDbo } from './types/example-dbo';
import SystemError from '../error/SystemError';

export const getExample = async (uuid: string): Promise<Example> => {
  const example = await query<ExampleDbo>({
    sql: `
    select * from example
    where uuid = :uuid`,
    params: { uuid }
  });
  return example as Example;
}

export const getExamplesForUser = async (userUuid: string): Promise<Example[]> => {
  const examples = await queryArray<ExampleDbo>({
    sql: `
    select * from example
    where userUuid = :userUuid`,
    params: { userUuid }
  });
  return examples.map(example => {
    return example as Example;
  })
}

export const createExample = async (example: Example): Promise<Example> => {
  await execute({
    sql: `
    insert into example (
      name,
      userUuid,
      createdAt,
      updatedAt
    ) values (
      :name,
      :userUuid,
      :now,
      :now)`,
    params: {
      uuid: example.uuid,
      name: example.name,
      userUuid: example.uuid,
      now: now()
    }
  });

  const createdExample = await getExample(example.uuid);

  if (!createdExample) throw new SystemError('Unable to create example.');
  return createdExample;
}

export const deleteExample = async (uuid: string): Promise<void> =>
  await execute({
    sql: `
    delete from example
    where uuid = :uuid`,
    params: { uuid }
  });

export const updateExampleName = async (uuid: string, name: string): Promise<void> =>
  await execute({
    sql: `
    update example
    set name = :name, 
        updatedAt = :now
    where uuid = :uuid`,
    params: { name, uuid, now: now() }
  })

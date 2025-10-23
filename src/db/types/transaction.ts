export default interface Transaction {
  sql: string;
  params: Record<string, unknown>;
}

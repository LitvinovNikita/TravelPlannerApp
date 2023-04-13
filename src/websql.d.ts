declare interface Window {
  openDatabase: (
    name: string,
    version: string,
    displayName: string,
    estimatedSize: number
  ) => any;
}

interface WebSQLDatabase {
  transaction: (callback: (transaction: any) => void) => void;
}

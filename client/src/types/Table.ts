type HeadCell<DataType> = Extract<keyof DataType, string>;

export type TableProps<DataType> = {
  heads: HeadCell<DataType>[];
  rows: Array<DataType>;
};

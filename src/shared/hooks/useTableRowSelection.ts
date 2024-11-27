import { useState } from "react";

export interface IRowSelection {
  selectedRowKeys: React.Key[];
  onChange: (newSelectedRowKeys: React.Key[]) => void;
}

export const useTableRowSelection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const hasSelected = selectedRowKeys.length > 0;

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  return { selectedRowKeys, hasSelected, rowSelection };
};

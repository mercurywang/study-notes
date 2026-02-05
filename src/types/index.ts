// 共享类型定义

export interface SelectedNote {
  id: string;
  title: string;
  path?: string;
  dataType: "markdown" | "json";
  dataSource?: string;
}

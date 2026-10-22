export interface TabItem {
  title: string;
  name?: string;
}

export interface TabsProps {
  tabs?: TabItem[];
  current?: number;
  scroll?: boolean;
  centered?: boolean;
  equal?: boolean;
  navClass?: string;
  activeClass?: string;
  customClass?: string;
}

export interface TabsChangeDetail {
  index: number;
  name: string;
  title: string;
}

export interface SkeletonTemplate {
  column?: number;
  columnWidth?: string[];
  endHeight?: string;
  avatar?: boolean;
}

export interface SkeletonResolvedConfig extends SkeletonTemplate {
  template: string;
  column: number;
  columnWidth: string[];
  endHeight: string;
  avatar: boolean;
}

export interface SkeletonAPI {
  SKELETON_TEMPLATES: Record<string, SkeletonTemplate>;
  getTemplate(name: string): SkeletonTemplate | null;
  resolveConfig(options?: {
    template?: string;
    column?: number;
    columnWidth?: string[];
    endHeight?: string;
    avatar?: boolean | null;
  }): SkeletonResolvedConfig;
  listTemplates(): string[];
}

declare const Skeleton: SkeletonAPI;
export default Skeleton;

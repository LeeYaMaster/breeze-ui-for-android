export interface ListPageProps {
  height?: string;
  refresherEnabled?: boolean;
  refreshing?: boolean;
  lowerThreshold?: number;
  loading?: boolean;
  skeleton?: boolean;
  empty?: boolean;
  error?: string | boolean;
  emptyText?: string;
  errorText?: string;
  loadingText?: string;
  skeletonTemplate?: string;
  skeletonRows?: number;
  retry?: boolean;
  minHeight?: string;
  showLoadmore?: boolean;
  loadmoreStatus?: '' | 'loading' | 'over' | 'erro';
  loadmoreText?: string;
  customClass?: string;
}

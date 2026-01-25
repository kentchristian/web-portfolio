
export interface ContainerType {
  children?: React.ReactNode;
  loading?: { 
    isLoading: boolean;
    loadingComponent?: React.ReactNode;
  };
  empty?: {
    isEmpty: boolean;
    emptyComponent?: React.ReactNode;
  }
  className?: string // TODO: to be added -- also documentation to be added
}
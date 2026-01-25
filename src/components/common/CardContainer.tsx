
import type { ContainerType } from '../../types/container-types';
import { cn } from '../../lib/utils';

const CardContainer = ({
  children,
  loading,
  empty,
  className
}: ContainerType) => {
  return (
    <div className={
      cn(
        "w-70 h-50 p-4",
        className,
      )
    }>
      {
        //TODO: create a custom loading component
        loading?.isLoading ? (
          <div className='flex justify-center'>
            <p>Loading...</p>
          </div>
        ) : empty?.isEmpty ? (
          <div>Empty... </div>
        ) : (
          // Render the children component 
          children
        )
      }



    </div>
  )
}

export default CardContainer

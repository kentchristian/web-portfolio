import React from 'react'
import { cn } from '../../lib/cnUtils';
import type { ContainerType } from '../../lib/types/container-types';



const PageContainer = ({ 
  children,
  loading,
  empty,
  className,
}: ContainerType) => {
  return (

    // add that customizable className
    <div className={
      cn(
        "w-full h-full p-4",
        className
      )
    }>
      {
        //TODO: create a custom loading component
        (loading && loading.isLoading) && <div>Loading... </div>  
      }

      {
        // TODO: create a custom empty component 
        (empty && empty.isEmpty) && <div>Empty... </div>
      }
      {children}    
    </div>
  )
}

export default PageContainer
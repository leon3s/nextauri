import React from 'react';

export type AppLayoutProps = {
  children?: React.ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  return (
    <div className='app-layout'>
      {props.children}
    </div>
  )
}

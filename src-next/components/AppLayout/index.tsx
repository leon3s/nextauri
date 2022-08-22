import React from 'react';

import * as Style from './style';

export type AppLayoutProps = {
  children?: React.ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  return (
    <Style.Container>
      {props.children}
    </Style.Container>
  )
}

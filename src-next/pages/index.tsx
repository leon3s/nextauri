import React, { useEffect } from 'react';

import { invoke } from '@tauri-apps/api/tauri'
import AppLayout from 'components/AppLayout';

export default function Index() {
  useEffect(() => {
    console.log('effect called');
    invoke('wsl_installed').then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.error(err);
    });
  }, [])
  return (
    <AppLayout />
  )
}

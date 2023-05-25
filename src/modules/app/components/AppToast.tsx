import React, { memo, useState, useEffect } from 'react';
import { Toast } from 'src/designs';
import { ToastController } from '../controllers/ToastController';

export const AppToast = memo(function AppToast() {
  const [content, setContent] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    ToastController.register((content) => setContent(content));
  }, []);

  const handlePressToast = (): void => setContent(null);

  return <Toast content={content} onPress={handlePressToast} />;
});

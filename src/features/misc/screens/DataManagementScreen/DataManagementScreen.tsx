import React, { useCallback, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useActor } from '@xstate/react';
import { View, styled } from 'dripsy';
import { ToastController } from 'src/components/Toast/ToastController';
import { AppManager } from 'src/modules/app';
import { Logger } from 'src/modules/logger';
import { globalMachineService } from 'src/stores/machines';
import { selectFile } from 'src/utils/fs';
import { requestStoragePermission } from 'src/utils/permission';
import { delay, runAfterModalDismissed } from 'src/utils';
import { APP_MINIMUM_LOADING_DURATION } from 'src/constants';
import { CommonLayout, Text } from 'src/designs';
import { HapticFeedback, ListItem, LoadingIndicator } from 'src/components';
import { t } from 'src/translations';
import { DeleteConfirmModal } from '../../components/DeleteConfirmModal';
import { EnterPasswordModal } from '../../components/EnterPasswordModal';
import { RestoreConfirmModal } from '../../components/RestoreConfirmModal';
import type { CommonStackProps } from 'src/navigators/CommonStack/types';

type DataManagementScreenProps = CommonStackProps<'DataManagement'>;

const TAG = 'DataManagementScreen';

const OverlayContainer = styled(View)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.2)',
  zIndex: 5,
  elevation: 5,
});

const DeleteTextButton = styled(TouchableOpacity)({
  justifyContent: 'center',
  alignItems: 'center',
  paddingY: '$04',
});

function LoadingOverlay(): React.ReactElement {
  return (
    <OverlayContainer>
      <LoadingIndicator full />
    </OverlayContainer>
  );
}

export function DataManagementScreen({
  navigation,
}: DataManagementScreenProps): React.ReactElement {
  const [_, send] = useActor(globalMachineService);
  const selectedActionRef = useRef<'backup' | 'restore'>();
  const backupFileRef = useRef<string | File>();
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [enterPasswordModalVisibility, setEnterPasswordModalVisibility] =
    useState(false);
  const [restoreConfirmModalVisibility, setRestoreConfirmModalVisibility] =
    useState(false);
  const [deleteConfirmModalVisibility, setDeleteConfirmModalVisibility] =
    useState(false);

  const handlePressBackButton = (): void => {
    navigation.goBack();
  };

  const initialize = async (): Promise<boolean> => {
    selectedActionRef.current = undefined;
    backupFileRef.current = '';
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      ToastController.show(t('message.error.permission_required'));
    }
    return hasPermission;
  };

  const handlePressBackup = (): void => {
    initialize().then((hasPermission) => {
      if (!hasPermission) return;
      selectedActionRef.current = 'backup';
      setEnterPasswordModalVisibility(true);
    });
  };

  const handlePressRestore = (): void => {
    initialize().then((hasPermission) => {
      if (!hasPermission) return;
      setRestoreConfirmModalVisibility(true);
    });
  };

  const handlePressReset = (): void => {
    setDeleteConfirmModalVisibility(true);
  };

  const handleConfirmPassword = useCallback((password: string) => {
    setEnterPasswordModalVisibility(false);
    setLoading(true);

    (async (): Promise<void> => {
      switch (selectedActionRef.current) {
        case 'backup':
          await Promise.all([
            AppManager.getInstance().export(password),
            delay(APP_MINIMUM_LOADING_DURATION),
          ]).then(() => {
            ToastController.show(t('message.backup_success'));
          });
          break;

        case 'restore':
          if (backupFileRef.current) {
            await Promise.all([
              AppManager.getInstance().import(backupFileRef.current, password),
              delay(APP_MINIMUM_LOADING_DURATION),
            ]).then(([success]) => {
              if (success) {
                ToastController.show(t('message.restore_success'));
              }
            });
          }
          break;

        case undefined: {
          throw new Error();
        }
      }
    })()
      .catch((error) => {
        Logger.error(TAG, (error as Error).message);
        ToastController.show(t('message.error.common'));
      })
      .finally(() => setLoading(false));
  }, []);

  const selectFileAndRestore = useCallback(() => {
    setRestoreConfirmModalVisibility(false);
    runAfterModalDismissed(() => {
      selectFile()
        .then((pathOrFile) => {
          selectedActionRef.current = 'restore';
          backupFileRef.current = pathOrFile;
          setEnterPasswordModalVisibility(true);
        })
        .catch((error) => {
          if (!(error as Error).message.includes('cancel')) {
            Logger.error(TAG, `selectFile :: ${(error as Error).message}`);
            ToastController.show(t('message.error.common'));
          }
        });
    });
  }, []);

  const deleteAndLogout = useCallback((): void => {
    setResetLoading(true);
    delay(APP_MINIMUM_LOADING_DURATION)
      .then(() => send({ type: 'LOGOUT' }))
      .finally(() => {
        setResetLoading(false);
        setDeleteConfirmModalVisibility(false);
      });
  }, [send]);

  const handleCloseEnterPasswordModal = useCallback(() => {
    setEnterPasswordModalVisibility(false);
  }, []);

  const handleCloseRestoreConfirmModal = useCallback(() => {
    setRestoreConfirmModalVisibility(false);
  }, []);

  const handleCloseDeleteConfirmModal = useCallback(() => {
    setDeleteConfirmModalVisibility(false);
  }, []);

  return (
    <>
      <CommonLayout>
        <CommonLayout.Header
          onBackPress={handlePressBackButton}
          title={t('title.data_management')}
        />
        <CommonLayout.Body>
          <ListItem label={t('label.backup')} onPress={handlePressBackup} />
          <ListItem label={t('label.restore')} onPress={handlePressRestore} />
          <HapticFeedback>
            <DeleteTextButton onPress={handlePressReset}>
              <Text sx={{ color: '$text_tertiary' }}>
                {t('label.reset_data')}
              </Text>
            </DeleteTextButton>
          </HapticFeedback>
        </CommonLayout.Body>
        <CommonLayout.Footer />
      </CommonLayout>
      <EnterPasswordModal
        onClose={handleCloseEnterPasswordModal}
        onConfirm={handleConfirmPassword}
        visible={enterPasswordModalVisibility}
      />
      <RestoreConfirmModal
        onClose={handleCloseRestoreConfirmModal}
        onConfirm={selectFileAndRestore}
        visible={restoreConfirmModalVisibility}
      />
      <DeleteConfirmModal
        isLoading={resetLoading}
        onClose={handleCloseDeleteConfirmModal}
        onDelete={deleteAndLogout}
        visible={deleteConfirmModalVisibility}
      />
      {loading ? <LoadingOverlay /> : null}
    </>
  );
}

import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useActor } from '@xstate/react';
import { View, styled } from 'dripsy';
import { CommonLayout, Text } from 'src/designs';
import { ListItem, LoadingIndicator } from 'src/components';
import { AppManager } from 'src/modules/app';
import { Logger } from 'src/modules/logger';
import { globalMachineService } from 'src/stores/machines';
import { selectFile } from 'src/utils/fs';
import { t } from 'src/translations';
import { delay } from 'src/utils';
import { APP_MINIMUM_LOADING_DURATION } from 'src/constants';
import { RestoreConfirmModal } from '../../components/RestoreConfirmModal';
import { EnterPasswordModal } from '../../components/EnterPasswordModal';

import { DeleteConfirmModal } from '../../components/DeleteConfirmModal';
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

function LoadingOverlay(): JSX.Element {
  return (
    <OverlayContainer>
      <LoadingIndicator full />
    </OverlayContainer>
  );
}

export function DataManagementScreen({
  navigation,
}: DataManagementScreenProps): JSX.Element {
  const [_, send] = useActor(globalMachineService);
  const selectedActionRef = useRef<'backup' | 'restore'>();
  const backupFilePathRef = useRef('');
  const [loading, setLoading] = useState(false);
  const [enterPasswordModalVisibility, setEnterPasswordModalVisibility] =
    useState(false);
  const [restoreConfirmModalVisibility, setRestoreConfirmModalVisibility] =
    useState(false);
  const [deleteConfirmModalVisibility, setDeleteConfirmModalVisibility] =
    useState(false);

  const handlePressBackButton = (): void => {
    navigation.goBack();
  };

  const initialize = (): void => {
    selectedActionRef.current = undefined;
    backupFilePathRef.current = '';
  };

  const handlePressBackup = (): void => {
    initialize();
    selectedActionRef.current = 'backup';
    setEnterPasswordModalVisibility(true);
  };

  const handlePressRestore = (): void => {
    initialize();
    setRestoreConfirmModalVisibility(true);
  };

  const handlePressReset = (): void => {
    setDeleteConfirmModalVisibility(true);
  };

  const handleConfirmPassword = (password: string): void => {
    setEnterPasswordModalVisibility(false);
    setLoading(true);

    const task = async (): Promise<void> => {
      switch (selectedActionRef.current) {
        case 'backup':
          await AppManager.getInstance().export(password);
          AppManager.showToast(t('message.backup_success'));
          break;

        case 'restore':
          await AppManager.getInstance().import(
            backupFilePathRef.current,
            password,
          );
          break;

        case undefined: {
          throw new Error();
        }
      }
    };

    Promise.all([task(), delay(APP_MINIMUM_LOADING_DURATION)])
      .then(() => {
        if (selectedActionRef.current === 'backup') {
          AppManager.showToast(t('message.backup_success'));
        } else if (selectedActionRef.current === 'restore') {
          AppManager.showToast(t('message.restore_success'));
        }
      })
      .catch((error) => {
        Logger.error(TAG, (error as Error).message);
        AppManager.showToast(t('message.error.common'));
      })
      .finally(() => setLoading(false));
  };

  const selectFileAndRestore = (): void => {
    setRestoreConfirmModalVisibility(false);

    // 모달이 완전히 닫힌 후 picker 를 열어야 정상 동작함
    setTimeout(() => {
      selectFile()
        .then((path) => {
          selectedActionRef.current = 'restore';
          backupFilePathRef.current = path;
          setEnterPasswordModalVisibility(true);
        })
        .catch((error) => {
          Logger.error(TAG, `selectFile :: ${(error as Error).message}`);
          if (!(error as Error).message.includes('cancel')) {
            AppManager.showToast(t('message.error.common'));
          }
        });
    }, 500);
  };

  const deleteAndLogout = (): void => {
    setDeleteConfirmModalVisibility(false);
    send({ type: 'LOGOUT' });
  };

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
          <DeleteTextButton onPress={handlePressReset}>
            <Text sx={{ color: '$text_tertiary' }}>
              {t('label.reset_data')}
            </Text>
          </DeleteTextButton>
        </CommonLayout.Body>
        <CommonLayout.Footer />
      </CommonLayout>
      <EnterPasswordModal
        onClose={(): void => {
          setEnterPasswordModalVisibility(false);
        }}
        onConfirm={handleConfirmPassword}
        visible={enterPasswordModalVisibility}
      />
      <RestoreConfirmModal
        onClose={(): void => {
          setRestoreConfirmModalVisibility(false);
        }}
        onConfirm={selectFileAndRestore}
        visible={restoreConfirmModalVisibility}
      />
      <DeleteConfirmModal
        onClose={(): void => {
          setDeleteConfirmModalVisibility(false);
        }}
        onDelete={deleteAndLogout}
        visible={deleteConfirmModalVisibility}
      />
      {loading ? <LoadingOverlay /> : null}
    </>
  );
}

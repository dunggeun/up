import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { useActor } from '@xstate/react';
import { t } from 'src/translations';
import { Button, Input } from 'src/designs';
import { AppManager, DatabaseModule } from 'src/modules';
import { useIsAuthorized } from 'src/hooks';
import {
  Landing as LandingScreen,
  RegisterUser as RegisterUserScreen,
} from 'src/screens';

import type { Quest } from 'src/modules/database/models';
import type { RootStackScreenParamList } from './types';

const RootStack = createStackNavigator<RootStackScreenParamList>();

// eslint-disable-next-line no-console
const onSuccess = (tag: string): (() => void) => () => console.log(tag, 'success');
const noop = (): void => undefined;
const module = new DatabaseModule();

function Screen(): JSX.Element {
  useRef(new DatabaseModule());
  const [inputValue, setInputValue] = useState('');
  const [targetId, setTargetId] = useState('');
  const [_, send] = useActor(AppManager.getInstance().getService());

  useEffect(() => {
    module.initialize().catch(noop);
  }, []);

  const handlePressSelect = (): void => {
    module.select<Quest>('quest').then((res) => {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(res, null, 2));
    })
      .then(onSuccess('select'))
      .catch(noop);
  };

  const handlePressAdd = (): void => {
    const id = Platform.OS === 'web' ? { id: Number(new Date()) } : null;
    module.insert<Partial<Quest>>('quest', {
      ...id,
      title: inputValue,
      description: new Date().toISOString(),
      max_streak: 0,
      current_streak: 0,
      created_at: Number(new Date()),
      finished_at: -1
    })
      .then(onSuccess('insert'))
      .catch(noop);
  };

  const handlePressUpdate = (): void => {
    module.update<Partial<Quest>>('quest',{
      title: 'Updated',
    }, {
      id: {
        value: parseInt(targetId),
        symbol: '=',
      },
    })
      .then(onSuccess('update'))
      .catch(noop);
  };

  const handlePressDelete = (): void => {
    module.delete('quest', {
      id: {
        value: parseInt(targetId),
        symbol: '=',
      },
    })
      .then(onSuccess('delete'))
      .catch(noop);
  };

  const handlePressClear = (): void => {
    module.clear('quest').then(onSuccess('clear')).catch(noop);
  };

  const handlePressLogout = (): void => {
    send({ type: 'LOGOUT' });
  };

  return (
    <SafeAreaView style={{ padding: 16, gap: 24 }}>
      <Input
        onChangeText={(value): void => setInputValue(value)}
        placeholder="Title"
        value={inputValue}
      />
      <Input
        onChangeText={(value): void => setTargetId(value)}
        placeholder="Record ID"
        value={targetId}
      />
      <Button color="$yellow" label="Select" onPress={handlePressSelect} />
      <Button color="$blue" label="Add" onPress={handlePressAdd} />
      <Button color="$green" label="Update" onPress={handlePressUpdate} />
      <Button color="$red" label="Delete" onPress={handlePressDelete}/>
      <Button color="$red" label="Clear" onPress={handlePressClear}/>
      <Button color="$red" label="Logout" onPress={handlePressLogout}/>
    </SafeAreaView>
  );
}

export function RootStackNavigator(): JSX.Element | null {
  AppManager.getInstance().initialize();
  const { authorized } = useIsAuthorized();

  const renderScreens = (): JSX.Element => {
    switch (authorized) {
      case true:
        return (
          <RootStack.Screen component={Screen} name="Main" />
        );

      case false:
      default:
        return (
          <>
            <RootStack.Screen
              component={LandingScreen}
              name="Landing"
              options={{
                title: t('title.landing'),
                animationEnabled: false
              }}
            />
            <RootStack.Screen
              component={RegisterUserScreen}
              name="RegisterUser"
              options={{ title: t('title.register_user') }}
            />
          </>
        );
    }
  };

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }} >
      {renderScreens()}
    </RootStack.Navigator>
  );
}

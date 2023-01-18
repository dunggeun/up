import React, { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Input } from 'src/designs';
import { DatabaseModule } from 'src/modules';

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
    </SafeAreaView>
  );
}

export function RootStackNavigator(): JSX.Element {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen component={Screen} name="Main" />
    </RootStack.Navigator>
  );
}

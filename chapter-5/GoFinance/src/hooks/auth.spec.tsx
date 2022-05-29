fetchMock.enableMocks();

import 'jest-fetch-mock';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'jest-mock';
import { startAsync } from 'expo-auth-session';
import fetchMock from 'jest-fetch-mock';

import { AuthProvider, useAuth } from './auth';

jest.mock('expo-auth-session');

describe('Auth Hook', () => {
  beforeEach(async () => {
    const userCollectionKey = "@gofinances:user";
    await AsyncStorage.removeItem(userCollectionKey);
  });

  it('should be able to sign in with Google account existing', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      }
    });

    fetchMock.mockResponseOnce(JSON.stringify(
      {
        id: 'any_id',
        email: 'mamede@mamede.dev',
        name: 'Felipe',
        photo: 'any_photo.png'
      }
    ));

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    act(() => {
      result.current.signInWithGoogle();
    });
    await waitForNextUpdate();

    expect(result.current.user.email)
      .toBe('mamede@mamede.dev');
  });

  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    act(() => {
      result.current.signInWithGoogle();
    });
    await waitForNextUpdate();
    
    expect(result.current.user)
      .not
      .toHaveProperty('id');
  });

  it('should be error with incorrectly Google parameters', async () => {

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    try {
      act(() => {
        result.current.signInWithGoogle();
      });
      await waitForNextUpdate();
    } catch {
      expect(result.current.user)
        .toEqual({});
    }
  });
});
/* Node Modules */
import { NavigationContainerRef, StackActions } from '@react-navigation/native';

class NavigationService {
  private navigationRef: NavigationContainerRef<any> | null = null;

  public setRef(ref: NavigationContainerRef<any> | null) {
    this.navigationRef = ref;
  }

  public getRootState() {
    return this.navigationRef?.getRootState();
  }

  public navigate<
    ParamList extends Record<string, any>,
    RouteName extends keyof ParamList
  >(name: RouteName, screen?: RouteName, params?: ParamList[RouteName]) {
    return this.navigationRef?.navigate(name as string, {
      screen,
      params
    });
  }

  public push<
    ParamList extends Record<string, any>,
    RouteName extends keyof ParamList
  >(name: RouteName, params?: ParamList[RouteName]) {
    this.navigationRef?.dispatch(StackActions.push(name as string, params));
  }

  public pop(count?: number) {
    this.navigationRef?.dispatch(StackActions.pop(count));
  }

  public popToTop() {
    this.navigationRef?.dispatch(StackActions.popToTop());
  }

  public replace<
    ParamList extends Record<string, any>,
    RouteName extends keyof ParamList
  >(name: RouteName, params?: ParamList[RouteName]) {
    this.navigationRef?.dispatch(StackActions.replace(name as string, params));
  }
}

export const navigationService = new NavigationService();

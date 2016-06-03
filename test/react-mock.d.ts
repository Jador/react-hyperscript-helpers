declare module 'react' {
  export class Component<P, S> {}

  export interface Props<T> {
    key: number;
  }

  export interface StatelessComponent<P> {
    (props?: P, context?: any): ReactElement<any>;
  }

  export interface ComponentClass<P> {
    new(props?: P, context?: any): Component<P, any>;
  }

  export interface HTMLAttributes extends Props<any> {
    ariaHidden: boolean;
  }

  export type ReactElement<P> = {};

  type ReactText = string | number;
  type ReactChild = ReactElement<any> | ReactText;

  // Should be Array<ReactNode> but type aliases cannot be recursive
  type ReactFragment = {} | Array<ReactChild | any[] | boolean>;
  export type ReactNode = ReactChild | ReactFragment | boolean;
}

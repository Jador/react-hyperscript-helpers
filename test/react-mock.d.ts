declare module 'react' {
  export class Component<P, S> {}

  export interface Props<T> {
    key: number;
  }

  export interface HTMLAttributes extends Props<any> {
    ariaHidden: boolean;
  }

  export type ReactElement<P> = {};

  export type ReactChild = ReactElement<any>;
}

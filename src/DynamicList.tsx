import * as React from "react";

interface IObjectType {
  [key: string]: any;
}

interface IChildrenProps {
  api: {
    addItem: DynamicList["addItem"];
    removeItem: DynamicList["removeItem"];
    getItems: DynamicList["getItems"];
  };
}

interface IDynamicListProps {
  data: IObjectType[];
  children: (api: IChildrenProps) => React.ReactNode;
}

interface IDynamicListState {
  items: IObjectType[];
}

export class DynamicList extends React.Component<
  IDynamicListProps,
  IDynamicListState
> {
  public state: IDynamicListState = {
    items: this.props.data
  };

  public addItem = (newItem: IObjectType): void => {
    this.setState(state => ({
      items: [...state.items, newItem]
    }));
  };

  public removeItem = (itemToRemoveIndex: number): void => {
    this.setState(state => ({
      items: state.items.filter((_, currentIndex) => {
        return currentIndex !== itemToRemoveIndex;
      })
    }));
  };

  public getItems = () => this.state.items;

  public render() {
    const api = {
      addItem: this.addItem,
      removeItem: this.removeItem,
      getItems: this.getItems
    };

    return this.props.children({ api });
  }
}

import * as React from "react";
import * as uuid from "uuid";

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
    items: []
  };

  public extendNewItem(newItem: IObjectType): IObjectType {
    return {
      ...newItem,
      id: uuid.v4()
    };
  }

  public initializeState = (): void => {
    this.setState({
      items: this.props.data.map(this.extendNewItem)
    });
  };

  public componentDidMount() {
    this.initializeState();
  }

  public addItem = (newItem: IObjectType): void => {
    this.setState(state => ({
      items: [...state.items, this.extendNewItem(newItem)]
    }));
  };

  public removeItem = (itemToRemoveId: IObjectType): void => {
    this.setState(state => ({
      items: state.items.filter(({ id }) => {
        return id !== itemToRemoveId;
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

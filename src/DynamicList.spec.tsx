import * as React from "react";
import { fireEvent, render } from "react-testing-library";

import { DynamicList as DynamicListController } from ".";

describe("DynamicList", () => {
  let getByText: any;
  let container: any;
  let onAddItem: any;
  let onRemoveItem: any;

  beforeAll(() => {
    const dataItems = [
      {
        title: "Some Title"
      },
      {
        title: "One More Title"
      }
    ];
    onAddItem = jest.fn();
    onRemoveItem = jest.fn();

    const DynamicList = () => (
      <DynamicListController data={dataItems}>
        {({ api: { addItem, removeItem, getItems } }) => {
          const items = getItems();

          return items ? (
            <div>
              <ul>
                {items.map(({ title }, index) => (
                  <li key={index}>
                    {title}
                    <button
                      onClick={() =>
                        removeItem(
                          index,
                          title === "Some Title" ? onRemoveItem : undefined
                        )
                      }
                    >{`Remove Item ${title}`}</button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() =>
                  addItem({ title: "And One More Item" }, onAddItem)
                }
              >
                Add Item
              </button>
              <button
                onClick={() =>
                  addItem({ title: "And One More Item But Without Callback" })
                }
              >
                Add Item Without Callback
              </button>
            </div>
          ) : null;
        }}
      </DynamicListController>
    );

    ({ container, getByText } = render(<DynamicList />));
  });

  it("exposes correct API", () => {
    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getByText("Add Item"));

    expect(container.firstChild).toMatchSnapshot();
    expect(onAddItem).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText("Remove Item Some Title"));

    expect(container.firstChild).toMatchSnapshot();
    expect(onRemoveItem).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText("Add Item Without Callback"));

    expect(onAddItem).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText("Remove Item One More Title"));

    expect(onRemoveItem).toHaveBeenCalledTimes(1);
  });
});

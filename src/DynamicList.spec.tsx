import * as React from "react";
import { fireEvent, render } from "react-testing-library";

import { DynamicList as DynamicListController } from ".";

describe("DynamicList", () => {
  let getByText: any;
  let container: any;

  beforeAll(() => {
    const dataItems = [
      {
        title: "Some Title"
      },
      {
        title: "One More Title"
      }
    ];

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
                      onClick={() => removeItem(index)}
                    >{`Remove Item ${title}`}</button>
                  </li>
                ))}
              </ul>
              <button onClick={() => addItem({ title: "And One More Item" })}>
                Add Item
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

    fireEvent.click(getByText("Remove Item Some Title"));

    expect(container.firstChild).toMatchSnapshot();
  });
});

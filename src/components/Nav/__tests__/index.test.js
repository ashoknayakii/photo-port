import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Nav from "..";

const categories = [
  { name: "portraits", description: "Portraits of people in my life" },
];

const mockCurrentCategory = jest.fn();
const mockSetCurrentCategory = jest.fn();
const mockContactSelected = jest.fn();
const mockSetContactSelected = jest.fn();

afterEach(cleanup);

describe("Nav component", () => {
  it("renders", () => {
    render(
      <Nav
        categories={categories}
        mockSetCurrentCategory={mockSetCurrentCategory}
        currentCategory={mockCurrentCategory}
        contactSelected={mockContactSelected}
        setContactSelected={mockSetContactSelected}
      />
    );
  });

  // snapshot test

  it("matches snapshot DOM node structure", () => {
    const { asFragment } = render(
      <Nav
        categories={categories}
        mockSetCurrentCategory={mockSetCurrentCategory}
        currentCategory={mockCurrentCategory}
        contactSelected={mockContactSelected}
        setContactSelected={mockSetContactSelected}
      />
    );
    // assert value comparison
    expect(asFragment()).toMatchSnapshot();
  });
});

// test if camera emoji is visible

describe("emoji is visible", () => {
  it("inserts emoji into the h2", () => {
    const { getByLabelText } = render(
      <Nav
        categories={categories}
        mockSetCurrentCategory={mockSetCurrentCategory}
        currentCategory={mockCurrentCategory}
        contactSelected={mockContactSelected}
        setContactSelected={mockSetContactSelected}
      />
    );

    expect(getByLabelText("camera")).toHaveTextContent("📸");
  });
});

// test if links are visible

describe("links are visible", () => {
  it("inserts text into the links", () => {
    // Arrange
    const { getByTestId } = render(
      <Nav
        categories={categories}
        mockSetCurrentCategory={mockSetCurrentCategory}
        currentCategory={mockCurrentCategory}
        contactSelected={mockContactSelected}
        setContactSelected={mockSetContactSelected}
      />
    );

    // Assert
    expect(getByTestId("link")).toHaveTextContent("Oh Snap!");
    expect(getByTestId("about")).toHaveTextContent("About me");
  });
});

describe("onClick events", () => {
  it("calls the click handler when clicked", () => {
    const { getByText } = render(
      <Nav
        categories={categories}
        setCurrentCategory={mockSetCurrentCategory}
        currentCategory={mockCurrentCategory}
        contactSelected={mockContactSelected}
        setContactSelected={mockSetContactSelected}
      />
    );
    fireEvent.click(getByText("About me"));
    fireEvent.click(getByText("Contact"));
    fireEvent.click(getByText("Portraits"));

    expect(mockSetContactSelected).toHaveBeenCalledTimes(3);
  });
});

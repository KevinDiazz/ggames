import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AsideMenu from "@/components/asideMenu";
describe("AsideMenu test", () => {
  const propsAsideMenu = {
    setUrlGames: "http",
    setPlatform: "PlayStation",
    setCurrentPage: 1,
    visible: true,
  };

  it("Comprobar texto AsideMenu", () => {
    render(
      <AsideMenu
        setUrlGames={propsAsideMenu.setUrlGames}
        setPlatform={propsAsideMenu.setPlatform}
        setCurrentPage={propsAsideMenu.setCurrentPage}
        visible={propsAsideMenu.visible}
      />
    );
    const asideTitle = screen.getByText("GGames");
    expect(asideTitle).toBeInTheDocument();
  });

  it("Comprobar cantidad de li items", () => {
    render(
      <AsideMenu
        setUrlGames={propsAsideMenu.setUrlGames}
        setPlatform={propsAsideMenu.setPlatform}
        setCurrentPage={propsAsideMenu.setCurrentPage}
        visible={propsAsideMenu.visible}
      />
    );
    const liItems = screen.getAllByRole("listitem");
    expect(liItems).toHaveLength(6);
  });
});

import { render } from "@testing-library/react";

import Custom404 from "../../pages/404";
import RecipeListTemplate from "../../pages/recipes";
import RecipeTemplate from "../../pages/recipes/[...slug]";

import umamiEnRecipesData from "../data/umamiEnRecipesData.json";
import umamiFooterMenu from "../data/umamiMenuItemsMainData.json";

vi.mock("next/image");
vi.mock("next/router", () => ({
  useRouter: () => ({
    locale: "en",
  }),
}));

/**
 * @vitest-environment jsdom
 */

if (PROFILE === "umami") {
  describe(`Umami <RecipeListTemplate />`, () => {
    it(`should render with ${PROFILE} profile recipes`, () => {
      const data = { recipes: umamiEnRecipesData, footerMenu: umamiFooterMenu };

      const { asFragment } = render(
        <RecipeListTemplate
          recipes={data.recipes}
          footerMenu={data.footerMenu}
        />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe(`Umami <RecipeTemplate />`, () => {
    it(`should render with a ${PROFILE} profile recipe`, () => {
      const data = {
        recipe: umamiEnRecipesData[0],
        footerMenu: umamiFooterMenu,
      };

      const { asFragment } = render(
        <RecipeTemplate recipe={data.recipe} footerMenu={data.footerMenu} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
}

if (PROFILE === "default") {
  describe(`Default <RecipeListTemplate />`, () => {
    it(`should render a 404`, () => {
      const { asFragment } = render(<Custom404 />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
  describe(`Default <RecipeTemplate />`, () => {
    it(`should render a 404`, () => {
      const { asFragment } = render(<Custom404 />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
}

// import { PagerBaseComponent } from "./components/pager/PagerBaseComponent";
// import { FilterComponent } from "./components/filter/FilterComponent";
import { CompareComponent } from "./components/compare/CompareComponent";
// import { SelectApp } from "./components/SelectApp";

export const App = () => {
  return (
    <>
      <h1 style={{ 'textAlign': 'center', 'fontSize': '20px', 'padding': '1em 0', 'fontWeight': 'normal' }}>不動産取引データ取得機能</h1>
      {/* pager */}
      {/* <PagerBaseComponent /> */}

      {/* filter */}
      {/* <FilterComponent /> */}

      {/* compare */}
      <CompareComponent />

      {/* both */}
      {/* <SelectApp /> */}
    </>
  );
}
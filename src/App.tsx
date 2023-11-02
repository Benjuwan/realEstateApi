import { PagerBaseComponent } from "./components/pager/PagerBaseComponent";
import { FilterComponent } from "./components/filter/FilterComponent";
import { SelectApp } from "./components/SelectApp";

export const App = () => {
  return (
    <>
      <h1 style={{ 'textAlign': 'center', 'fontSize': '20px', 'margin': '1em 0' }}>不動産取引データ取得機能</h1>
      {/* pager */}
      {/* <PagerBaseComponent /> */}

      {/* filter */}
      {/* <FilterComponent /> */}
      <SelectApp />
    </>
  )
}
import { PagerBaseComponent } from "./components/pager/PagerBaseComponent";
import { CompareComponent } from "./components/filter/FilterComponent";

export const App = () => {
  return (
    <>
      <h1 style={{ 'textAlign': 'center', 'fontSize': '20px', 'margin': '1em 0' }}>realEstateLists</h1>
      {/* pager */}
      <PagerBaseComponent />

      {/* filter */}
      {/* <CompareComponent /> */}
    </>
  )
}
import { ListsComponent } from "./components/pager/ListsComponent";
import { CompareComponent } from "./components/filter/FilterComponent";

export const App = () => {
  return (
    <>
      <h1 style={{ 'textAlign': 'center', 'fontSize': '20px', 'marginBottom': '1em' }}>realEstateLists</h1>
      {/* Lists */}
      <ListsComponent />

      {/* Compare */}
      {/* <CompareComponent /> */}
    </>
  )
}
import { SelectApp } from "./components/SelectApp";

export const App = () => {
  return (
    <>
      <h1 style={{ 'textAlign': 'center', 'fontSize': '20px', 'padding': '1em 0', 'fontWeight': 'normal' }}>不動産取引データ取得機能</h1>
      <SelectApp />
    </>
  );
}
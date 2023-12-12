# realEstateApi
## 概要
日本各地の不動産取引データを取得するサイトです。『国土交通省　土地総合情報システム』ページのAPIを使ってデータを取得しています。
- 公開サイト：https://real-estate-api-app-benjuwan.vercel.app/

## 使用ツール
- React
- TypeScript
- Vite
- styled-components
- recharts

* 不動産取引価格情報
  * 都道府県内市区町村一覧取得API：https://www.land.mlit.go.jp/webland/api.html

## コンポーネント
### 共通
- `SelectApp`：サイトのトップページ
- `SelectAppChange`：サイトのトップページからデータ取得後の表示仕様・機能を選ぶためのコンポーネント
- `ContentItems`：取得した不動産取引情報の各種項目（データの中身）を表示するコンポーネント（pager 及び filter で使用）
- `HiddenDetailsContent`：`ContentItems`の中身をモーダル表示するためのコンポーネント（pager 及び filter で用いていて、内部で`useViewDetails.ts`カスタムフックを使用している）

### ページャー（pager）
- `PagerBaseComponent`：ページャー機能のトップページ
- `PagerPages`：ページ送り式ページャー（`splice`メソッド使用）
- `PagerIncDec`：コンテンツデータの随時追加・削除式ページャー（`filter`メソッド使用）
- `usePager`：カスタムフックでページ数（ページャー）の処理を実装
- `Pagination`：ページャー番号項目クリックでのページ遷移ページャー
- `usePagination`：カスタムフックで、`PagerPages`と`PagerIncDec`それぞれの仕様に合わせたページャー番号項目クリックでのページ遷移処理を実装
- `InputPagerNum`：コンテンツナンバー入力でページ遷移

#### 設定関連
- `providers/pager/PagerGetFetchData.tsx`：ページャー用のオフセット数（`isOffset`）や表示開始ページ数（`isPagers`）の設定をしています。

### フィルター（filter）
- `FilterComponent`：フィルター機能のトップページ
- `FetchDataContents`：取得したコンテンツデータを表示する
- `AverageNumber`：取得したコンテンツデータの取引価格の平均値を算出する
- `FilterActionBtns`：昇順・降順、地区検索、リセット機能を担うボタンUI
- `FilterContentsCatClick`：建物の用途によるフィルター機能を担うボタンUI
- `SelectPrefs`：都道府県のselect
- `SelectCities`：市区町村のselect
- `SelectTerm`：計測期間のselect
- `useFetchPrefData`：選択した都道府県コードを取得するためのカスタムフック
- `useSortMethod`：昇順・降順ソートを実現するためのカスタムフック
- `useFilterMethod`：建物の用途、地区検索、特定の文字列検索、リセット機能を実現するためのカスタムフック
- `useSetPrefCityData`：希望する都道府県名と市区町村名の反映及び、任意の都道府県・市区町村・計測期間を指定してコンテンツデータを取得するためのカスタムフック
- `useGetJsonDataXai`：`useSetPrefCityData`によって渡されたデータ（任意の都道府県・市区町村・計測期間）から希望するコンテンツデータを取得するためのカスタムフック

#### 設定関連
- `providers/filter/GetFetchData.tsx`：ページャー用のオフセット数（`isOffset`）や表示開始ページ数（`isPagers`）の設定をしています。

### 比較-リスト・グラフ表示（compare）
- `CompareComponent`：比較（リスト及びグラフ表示）機能のトップページ
- `CompareSelectTerm`：計測開始及び終了期間を選択するための select 要素と関連処理（計測開始及び終了期間の select.value を各 select 要素に関連付く State に反映）
- `AppStartBtn`：計測スタートボタンと関連処理（取引価格データの取得や計測場所の反映）を記述したボタンコンポーネント
- `CompareSortListsViewGraph`：取得した平均価格のリスト（`ul.AverageCalcLists`）をソート及びグラフ表示するためのコンポーネント（グラフ表示には Recharts：https://recharts.org/en-US を使用）
- `useGetTradePrice`：指定された場所と計測期間から不動産取引価格を取得し、それらの平均価格を算出してリアル DOM（`ul.AverageCalcLists`）に反映（リスト表示）させるためのカスタムフック
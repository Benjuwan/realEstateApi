import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

/* pager */
// import { PagerGetFetchDataContextFragment } from './providers/pager/PagerGetFetchData.tsx'

/* filter or both */
// import { GetFetchDataContextFragment } from './providers/filter/GetFetchData.tsx'
// import { CityNameFragment } from './providers/filter/CityName.tsx'

/* filter and compare */
import { GetFetchPrefCodeFragment } from './providers/filter/GetFetchPrefCode.tsx'

/* compare */
import { CompareSortGraphActionFragment } from './providers/compare/CompareSortGraphAction.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* pager */}
    {/* <PagerGetFetchDataContextFragment>
      <App />
    </PagerGetFetchDataContextFragment> */}

    {/* filter or both */}
    {/* <GetFetchDataContextFragment>
      <CityNameFragment>
        <GetFetchPrefCodeFragment>
          <App />
        </GetFetchPrefCodeFragment>
      </CityNameFragment>
    </GetFetchDataContextFragment> */}

    {/* compare */}
    <CompareSortGraphActionFragment>
      <GetFetchPrefCodeFragment>
        <App />
      </GetFetchPrefCodeFragment>
    </CompareSortGraphActionFragment>
  </React.StrictMode>,
)

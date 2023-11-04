import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

/* pager */
// import { PagerGetFetchDataContextFragment } from './providers/pager/PagerGetFetchData.tsx'

/* filter or both */
// import { GetFetchDataContextFragment } from './providers/filter/GetFetchData.tsx'
// import { CityNameFragment } from './providers/filter/CityName.tsx'
// import { FetchDataResetRenderContextFragment } from './providers/filter/FetchDataResetRender.tsx'
// import { GetFetchPrefCodeFragment } from './providers/filter/GetFetchPrefCode.tsx'

/* compare */
import { CompareLoadingStateFragment } from './providers/compare/CompareLoadingState.tsx'
import { CompareGetFetchPrefCodeFragment } from './providers/compare/CompareGetFetchPrefCode.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* pager */}
    {/* <PagerGetFetchDataContextFragment>
      <App />
    </PagerGetFetchDataContextFragment> */}

    {/* filter or both */}
    {/* <GetFetchDataContextFragment>
      <CityNameFragment>
        <FetchDataResetRenderContextFragment>
          <GetFetchPrefCodeFragment>
            <App />
          </GetFetchPrefCodeFragment>
        </FetchDataResetRenderContextFragment>
      </CityNameFragment>
    </GetFetchDataContextFragment> */}

    {/* compare */}
    <CompareLoadingStateFragment>
      <CompareGetFetchPrefCodeFragment>
        <App />
      </CompareGetFetchPrefCodeFragment>
    </CompareLoadingStateFragment>
  </React.StrictMode>,
)

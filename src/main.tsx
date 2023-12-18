import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'

import { GetFetchDataContextFragment } from './providers/filter/GetFetchData.tsx'
import { CityNameFragment } from './providers/filter/CityName.tsx'
import { GetFetchPrefCodeFragment } from './providers/filter/GetFetchPrefCode.tsx'
import { CompareSortGraphActionFragment } from './providers/compare/CompareSortGraphAction.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GetFetchDataContextFragment>
      <CityNameFragment>
        <GetFetchPrefCodeFragment>
          <CompareSortGraphActionFragment>
            <App />
          </CompareSortGraphActionFragment>
        </GetFetchPrefCodeFragment>
      </CityNameFragment>
    </GetFetchDataContextFragment>
  </React.StrictMode>,
)

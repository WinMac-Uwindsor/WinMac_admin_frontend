import React from 'react'
import { IndividualRecordData } from './IndividualRecordsData'

export const RecordsData = ({excelData}) => {
    return excelData.map((individualExcelData)=>(
        <tr key={individualExcelData.Id}>
            <IndividualRecordData individualExcelData={individualExcelData}/>
        </tr>        
    ))
}
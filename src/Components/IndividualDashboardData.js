import React from 'react'

export const IndividualData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.Name}</th>
            <th>{individualExcelData.Company}</th>
            <th>{individualExcelData.Role}</th>
            <th>{individualExcelData.Date}</th>
            <th>{individualExcelData.InternshipDuration}</th>
            <th>{individualExcelData.Intake}</th>
            
        </>
    )
}
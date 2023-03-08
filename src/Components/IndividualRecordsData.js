import React from 'react'

export const IndividualRecordData = ({individualExcelData}) => {
    return (
        <>
            <th>{individualExcelData.Email}</th>
            <th>{individualExcelData.Username}</th>
            <th>{individualExcelData.Password}</th>
            <th>{individualExcelData.Intake}</th>
            {/* <th>{individualExcelData.Date}</th>
            <th>{individualExcelData.InternshipDuration}</th>
            <th>{individualExcelData.Intake}</th> */}
            
        </>
    )
}
import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'

function InfoBox({ title, cases, total }) {
    return (
        <Card className="infoBox" style={{width:'32%'}}>
            <CardContent>
                {/*Title*/}
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                
                <h2 className="infoBox__cases">{cases}</h2>
                {/** Number of cases */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
                {/** 1.2M Total */}
            </CardContent>
        </Card>
    )
}

export default InfoBox

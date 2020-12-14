import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';


function RenderDirectoryItem({campsite}) {
    return (
        <Card>
            <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                <CardImgOverlay>
                    <CardTitle>{campsite.name}</CardTitle>
                </CardImgOverlay>
            </Card>
    );
}
function Directory(props) {
    const directory = props.campsites.campsites.map(campsite => {
            return (
                <div key={campsite.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite={campsite}  />
                </div>
            );
        });

        if (props.campsites.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.campsites.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.campsites.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }   

        return (
            <div className="container">
                <div className="row">
                    {directory}
                </div>
            </div>
        );
    }


export default Directory;
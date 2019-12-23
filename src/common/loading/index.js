import React from 'react'
import '../less/loading.less'

function LoadingBox () {
  return <div className='loading-box'>
            <div className="loading-box_center">
                <div className="container animation-6">
                    <div className="shape shape1"></div>
                    <div className="shape shape2"></div>
                    <div className="shape shape3"></div>
                    <div className="shape shape4"></div>
                </div>
            </div>
         </div>
}

const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <LoadingBox></LoadingBox>
    }
    else if (!error) {
        return <div>js代码报错了！<a href="/" target="_blank">再试一次</a></div>
    }
    else {
        return null;
    }
};

export default MyLoadingComponent

import React, { Component } from 'react'
import defaultImg from '../defaultImg.png'

export class DefaultImage extends Component {
    render() {
        return (
            <div>
                <img src={defaultImg} alt="No Image" />
            </div>
        )
    }
}

export default DefaultImage

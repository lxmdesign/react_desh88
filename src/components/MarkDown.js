import React, {Component} from 'react';
import markdown from 'marked';
import './css/MarkDown.css';
import {_lodash} from '../service/utils';
import 'react-photoswipe/lib/photoswipe.css';
import {PhotoSwipeGallery, PhotoSwipe} from 'react-photoswipe';

let renderer = new markdown.Renderer();



export default class MarkDown extends Component {

    state = {
        options: {},
        isOpen: false
    };


    handleClose = () => {
        this.setState({
            isOpen: false
        });
    };


    desc = (description) => {

        let des = markdown(description, {renderer: renderer});
        return {__html: des}
    };

    componentWillMount() {
        this.images = [];
    }

    componentDidMount() {

        let imgs = document.getElementById('marked').getElementsByTagName('img');
        _lodash.forEach(imgs, (item, index) => {

            if (item.complete) {

                this.pushImgs(item);
            } else {
                item.onload = () => {

                    this.pushImgs(item);
                };
            }


        })
    }

    pushImgs = (item) => {

        this.images.push({
            src: item.src,
            w: item.width,
            h: item.height,
            title: ''

        });
        item.addEventListener('click', () => {
            this.markImageClick(this.images.findIndex(function (img) {
                return img.src === item.src
            }))
        });

    };


    markImageClick = (index) => {

        console.log(index);
        this.setState({
            options: {
                index
            },
            isOpen: true
        })
    };


    renderModel = () => {
        const {options, isOpen} = this.state;
        if (this.images.length > 0)
            return <PhotoSwipe
                isOpen={isOpen}
                items={_lodash.uniqBy(this.images, 'src')}
                options={options}
                onClose={this.handleClose}

            />
    };


    render() {
        const {description} = this.props;
        return (
            <div style={{width: '100%', height: '100%', paddingTop: 10}} className="mark">
                <div id={'marked'}
                     className="introduceGame" dangerouslySetInnerHTML={this.desc(description)}/>
                <div style={{height: 40}}/>
                {this.renderModel()}
            </div>

        );
    }
}


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'hidden'

    }
}
import React, {Component} from 'react';
import {Colors, Fonts, Images} from '../../components/Themes';
import I18n from '../../service/I18n';
import PropTypes from 'prop-types';

export default class CommentBottom extends Component {

    state={
        text:'',
        likeButton:false
    };

    componentDidMount() {

    };




    render() {

        const {likeButton} = this.state;
        return (
            <div style={styles.bottom}>
                <div
                    style={styles.search}>
                    <img
                        style={styles.searchImg}
                        src={Images.pen}/>

                    <input
                        type="text"
                        placeholder={I18n.t('write_comment')}
                        style={styles.input}
                        defaultValue={I18n.t('certain')}/>
                </div>

                <div
                    style={styles.commentWhiteView}>
                    <img style={styles.commentWhite} src={Images.commentWhite}/>
                </div>

                <div
                    style={styles.likeView}
                    onClick={()=>{
                    this.setState({likeButton:!likeButton})
                }}>
                    <img style={styles.like} src={likeButton?Images.likeRed:Images.like}/>
                </div>
                <div style={{flex:1}}/>
                <div
                    style={styles.forwardView}>
                    <img style={styles.forward} src={Images.forward}/>
                </div>

            </div>
        );
    }


}

const styles = {
    bottom: {
        height: 48,
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderColor: '#EEEEEE',
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 0,
        zIndex: 99,
        position:'absolute',
    },
    input: {
        height: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        backgroundColor: '#ECECEE',
        borderRadius: 40,
        fontSize: 14,
        color: '#CCCCCC'
    },
    search: {
        marginLeft: 17,
        height: 30,
        width: 187,
        backgroundColor: Colors._ECE,
        borderRadius: 40,
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchImg: {
        height: 14,
        width: 14,
        marginLeft: 15,
        marginRight:30,
    },
    commentWhiteView: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 27,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:5,
        paddingRight:5
    },
    commentWhite: {
        width: 22,
        height: 20
    },
    likeView: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 31,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:5,
        paddingRight:5
    },
    like: {
        width: 20,
        height: 19
    },
    forwardView: {
        display:'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 31,
        marginRight: 17,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:5,
        paddingRight:5
    },
    forward: {
        width: 24,
        height: 24
    },
    badge: {
        position: 'absolute',
        top:-5,
        left: '60%'
    }

}
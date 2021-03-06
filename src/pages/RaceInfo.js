/**
 * Created by lorne on 2017/8/24.
 */
import React, {Component} from 'react';
import BuyTicket from '../components/BuyTicket';
import {getRaceInfo, setLang, getSubRace} from '../service/RaceDao';
import Time from 'react-time-format';
import '../styles/RaceInfo.css';
import moment from 'moment';
import I18n from '../service/I18n';
import {weiXinShare, message_desc, isEmptyObject} from '../service/utils';
import RaceBlindList from '../components/RaceBlindList';
import {default_img} from '../components/constant';
import {MarkDown, Footer} from '../components';

export default class RaceInfo extends Component {

    state = {
        data: {},
        wxData: {},
        menu: 0,
        subItems: [],
        class_name1: 'txtMenu imgMe',
        class_name2: 'txtMenu',
        class_name3: 'txtMenu',
        showMenu2: false
    };

    componentDidMount() {

        const {id, lang} = this.props.match.params;
        setLang(lang);
        const body = {raceId: id};

        getRaceInfo(body, data => {
            console.log('RaceInfo', data)
            let showMenu2 = false;
            const {blinds, schedules, ranks} = data;
            if (blinds.length > 0 || schedules.length > 0 || ranks.length > 0)
                showMenu2 = true;

            this.setState({
                data: data,
                showMenu2: showMenu2
            });
            const {name, logo, location, end_date, begin_date} = data.race;
            document.title = name;

            //微信二次分享
            // const url = {url: "http://www.deshpro.com:3000/race/91/zh"};
            // const url = {url: "http://h5-react.deshpro.com:3000/race/91/zh"};
            const message = {
                title: name,
                desc: message_desc(location, begin_date, end_date),//分享描述
                link: window.location.href, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: isEmptyObject(logo) ? default_img : logo, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            }
            const url = {url: window.location.href};
            console.log("message:", message);
            weiXinShare(url, message);
        }, err => {

        });

        getSubRace(body, data => {
            this.setState({
                subItems: data.items
            })
        }, err => {
        })


    }

    isEmptyObject(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }


    content = () => {

        if (!this.isEmptyObject(this.state.data.race)) {
            const {
                name, location, begin_date, end_date, logo
            } = this.state.data.race;

            return (
                <div className='content'>
                    <div className="mainNav">
                        <div className="ul-1">
                            <div className="title">{name}</div>
                            <img src={logo} alt=""/>
                            <ul className="ul-1-2">
                                <li><Time value={begin_date} format="YYYY.MM.DD"/>—<Time value={end_date}
                                                                                         format="YYYY.MM.DD"/></li>
                                <li>{location}</li>
                                <li className="li-4">
                                </li>
                            </ul>
                        </div>

                        <div className="fixed">
                            <div className="menu">
                                <div className="menu1" onClick={() => {
                                    this.setState({
                                        menu: 0,
                                        class_name1: 'txtMenu imgMe',
                                        class_name2: 'txtMenu',
                                        class_name3: 'txtMenu'
                                    })
                                }}>
                                    <span className={this.state.class_name1}>{I18n.t('Introduction')}</span>
                                </div>

                                {this.state.showMenu2 ? <div className="menu1"
                                                             onClick={() => {
                                                                 this.setState({
                                                                     menu: 1,
                                                                     class_name1: 'txtMenu',
                                                                     class_name2: 'txtMenu imgMe',
                                                                     class_name3: 'txtMenu'
                                                                 })
                                                             }}>
                                        <span className={this.state.class_name2}>{I18n.t('MainInformation')}</span>

                                    </div> : null}

                                {this.state.subItems.length > 0 ? <div className="menu1"
                                                                       onClick={() => {
                                                                           this.setState({
                                                                               menu: 2,
                                                                               class_name1: 'txtMenu',
                                                                               class_name2: 'txtMenu',
                                                                               class_name3: 'txtMenu imgMe'
                                                                           })
                                                                       }}>
                                        <span className={this.state.class_name3}>{I18n.t('SideInformation')}</span>

                                    </div> : null}


                            </div>
                        </div>
                    </div>

                    {this.selectMenu()}

                </div>

            );
        }
    }
    //导航信息选择显示页面

    selectMenu = () => {
        const {description} = this.state.data.race;

        switch (this.state.menu) {
            case 0:
                console.log(this.state.class_name)
                return this.introView(description);
            case 1:

                return this.mainInfoView();
            case 2:

                return this.sideView();
        }
    };


    introView = (description) => {

        return <MarkDown description={description}/>;
    };

    mainInfoView = () => {
        const {schedules, blinds, ranks,blind_memo,schedule_memo} = this.state.data;
        return <RaceBlindList
            ranks={ranks}
            schedules={schedules}
            blinds={blinds}
            schedule_memo={schedule_memo}
            blind_memo={blind_memo}/>

    };


    sideView = () => {

        const {subItems} = this.state;
        const {params} = this.props.match;

        return (
            <div>
                {subItems.map((item, i) => <SideItem key={i} item={item}
                                                     history={this.props.history}
                                                     params={params}/>)}

            </div>
        )
    };

    buyTicket=()=>{
        return(
            <BuyTicket

                history={this.props.history}
                load={`/raceTickets/${this.props.match.params.id}/${this.props.match.params.lang}`}/>
        )
    };

    render() {

        if(isEmptyObject(this.state.data))
            return <div/>;
        const{race} = this.state.data;
        const{ticket_sellable} = race;

        return (
            <div className='content'>

                {this.content()}
                <div style={{height:50}}/>
                {(this.isEmptyObject(race) || (!ticket_sellable))?<Footer/>:this.buyTicket()}

            </div>
        )
    };
}


class SideItem extends Component {

    render() {
        const {item, params} = this.props;
        return ( <div className="sideView" onClick={() => {
            this.props.history.push(`/race/${params.id}/${params.lang}/sidedetail/${item.race_id}`)

        }}>
            <div className="dark"/>

            <div className="sideTime">
                <span className="txtMonth">
                    {moment(item.begin_date).format('YYYY-MM')}
                </span>

                <span className="txtDay">
                    {item.days} Days
                </span>

            </div>

            <div className="sideInfo">
                <span className="sideTitle">{item.name}</span>
                <span className="sideStart">{I18n.t('start_time')}:{item.begin_time}</span>
                <span className="sidePrize">{item.ticket_price}</span>

            </div>

        </div>)
    }
}


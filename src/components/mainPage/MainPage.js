import React, { Component } from 'react'
import { Link } from 'react-router'

class mainPage extends React.Component {
  constructor() {
    super();
    this._toggleShowInfoMas = this._toggleShowInfoMas.bind(this);
    this.state = {
      isShowInfoMas: false
    }
  }

  _toggleShowInfoMas() {
    let { isShowInfoMas } = this.state;
    isShowInfoMas = !isShowInfoMas;
    this.setState({isShowInfoMas});
  }

  componentDidMount() {
    $(document).ready(function() {
        $(".main-banner").on("click", ".menu-mobile-close, .menu-mobile-open",function(){
            $('.menu-mobile').toggleClass("slide-right");
        })

        $("#owl-carousel").owlCarousel({
           navigation : true, // Show next and prev buttons
           slideSpeed : 300,
           paginationSpeed : 400,
           singleItem:true,
           pagination: false,
           navigationText : [" "," "],
           autoPlay: 10000,
           stopOnHover: true
         });
   });
  }

  render() {

    let { isShowInfoMas } = this.state;
    let toggleClassInfoMas = isShowInfoMas ? "" : "closed";

        return (
          <div className="container-fluid  home-page">
            <main className="main-content">
              <section id="main-banner" className="main-banner page-block">
                <div className="bg-main-banner"></div>
                <div className="menu-mobile">
                  <p className="menu-mobile-title">combo taxi</p>
                  <span className="menu-mobile-close"></span>
                  <ul className="menu-mobile-nav">
                    <li className="menu-mobile-nav-item"><Link to='passenger/'>Заказать такси</Link></li>
                    <li className="menu-mobile-nav-item"><a href="#become-driver">Стать водителем</a></li>
                    <li className="menu-mobile-nav-item"><a href="#fuel-coupons">Скидки на топливо</a></li>
                    <li className="menu-mobile-nav-item"><a href="#contacts">Контакты</a></li>
                  </ul>
                  <p className="menu-mobile-line"></p>
                  <div className="sc">
                    <a href="#">
                      <img src="./images/main_page/sc-fb-icon-menu.png"/>
                    </a>
                    <a href="#">
                      <img src="./images/main_page/sc-google-icon-menu.png"/>
                    </a>
                    <a href="#">
                      <img src="./images/main_page/sc-vk-icon-menu.png"/>
                    </a>
                  </div>
                  <ul className="app-link-list">
                    <li className="app-link-item">
                      <a href="#">
                        <img src="./images/main_page/app-store-logo.png" alt="app store logo"/>
                      </a>
                    </li>
                    <li className="app-link-item">
                      <a href="#">
                        <img src="./images/main_page/google-play-logo.png" alt="google play logo"/>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="row">
                  <div className="col-xs-10 col-xs-offset-1">
                    <div className="row">
                      <div className="col-xs-12">
                        <nav className="main-navigation navbar ">
                            <div className="navbar-header hidden-sm hidden-md hidden-lg">
                              <button type="button" className="navbar-toggle menu-mobile-open">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                              </button>
                            </div>

                            <div className="navbar-collapse hidden-xs" >
                              <ul className="nav navbar-nav">
                                <li><Link to='passenger/'>Заказать такси</Link></li>
                                <li><a href="#become-driver">Стать водителем</a></li>
                                <li><a href="#fuel-coupons">Скидки на топливо</a></li>
                                <li><a href="#contacts">Контакты</a></li>
                              </ul>
                            </div>
                        </nav>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3">
                        <div className="main-banner-logo">
                          <h3 className="logo-title">combo taxi</h3>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-10 col-xs-offset-1">
                        <div className="main-slider row">
                          <div id="owl-carousel" className="owl-carousel">
                            <div>
                              <div className="col-xs-12 col-sm-12 col-md-5 text-center">
                                <img className="slider-item-img" src="./images/main_page/slider-item-img-1.png" alt="24/7 icon"/>
                                <h4 className="slider-item-title">УНИВЕРСАЛЬНАЯ СЛУЖБА ДОСТАВКИ</h4>
                              </div>
                              <div className="hidden-xs  hidden-sm col-md-6 col-md-offset-1">
                                <p className="slider-item-text">Выполняем любые виды заказов и  перевозок: такси, доставка товаров, услуги курьера</p>
                              </div>
                            </div>
                            <div>
                              <div className="col-xs-12 col-sm-12 col-md-5 text-center">
                                <img className="slider-item-img" src="./images/main_page/slider-item-img-2.png" alt="phone icon"/>
                                <h4 className="slider-item-title">ВСЕГДА С КЛИЕНТОМ</h4>
                              </div>
                              <div className="hidden-xs  hidden-sm col-md-6 col-md-offset-1">
                                <p className="slider-item-text">Клиент самостоятельно определяет  вид и условия выполнения заказа, исползуя мобильное приложение. Мы подбираем лучшего исполнителя</p>
                              </div>
                            </div>
                            <div>
                              <div className="col-xs-12 col-sm-12 col-md-5 text-center">
                                <img className="slider-item-img" src="./images/main_page/slider-item-img-3.png" alt="client icon"/>
                                <h4 className="slider-item-title">НАДЕЖНЫЙ КОНСЬЕРЖ-СЕРВИС</h4>
                              </div>
                              <div className="hidden-xs  hidden-sm col-md-6 col-md-offset-1">
                                <p className="slider-item-text">Наши операторы отслеживают статус  каждого заказа в режиме реального времени. Клиент может на нас полностью положиться - мы предпринимаем необходимые действия и уведомляем Клиента раньше, чем ему приходится обращаться за информацией о его заказе</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="yellow-btn text-center">
                      <Link to='passenger/' className='btn'>
                        заказать такси
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
              <section id="our-app" className="our-app page-block">
                <div className="bg-our-app"></div>
                <div className="row">
                  <div className="col-xs-10 col-xs-offset-1">
                    <div className="row">
                      <div className="col-xs-12 col-sm-7 col-md-6 col-lg-5">
                        <div className="massage-block">
                          <h4 className="massage-block-title">Стань мобильным!</h4>
                          <p className="massage-block-content">Скачайте наше приложение  прямо сейчас и проверьте  его в действии!</p>
                          <p className="massage-block-content">Расчет стоимости поездки </p>
                          <p className="massage-block-content">Дополнительные услуги</p>
                          <p className="massage-block-content">История поездок</p>
                          <p className="massage-block-content">Ваши отзывы</p>
                        </div>
                        <ul className="app-link-list">
                          <li className="app-link-item">
                            <a href="https://itunes.apple.com/us/app/combotaxi-rider/id1131050671">
                              <img src="./images/main_page/app-store-logo.png" alt="app store logo"/>
                            </a>
                          </li>
                          <li className="app-link-item hide">
                            <a href="#">
                              <img src="./images/main_page/google-play-logo.png" alt="google play logo"/>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-xs-6 col-sm-5 col-md-3 col-lg-offset-1 col-lg-2">
                        <div className="our-app-img phone-left"></div>
                      </div>
                      <div className="col-xs-6 hidden-sm col-md-3 col-lg-2">
                        <div className="our-app-img phone-center"></div>
                      </div>
                      <div className="hidden-xs hidden-sm hidden-md col-lg-2 ">
                        <div className="our-app-img phone-right"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section id="become-driver" className="become-driver page-block">
                <div className="bg-become-driver"></div>
                <div className="row">
                  <div className="col-xs-10 col-xs-offset-1">
                    <div className="row">
                      <div className="col-xs-12 col-sm-7 col-md-6 col-lg-6">
                        <h1 className="main-title">помогаем зарабатывать</h1>
                        <p className="text-title">Каждый владелец авто может стать  Водителем и самостоятельно определять, какие виды заказов он принимает : такси, служба доставки, услуги курьера</p>

                        <h1 className="main-title">заботимся о партнерах</h1>
                        <p className="text-title">Наш водитель - это наш партнер.  Мы предоставляем возможность водителю организовать свою работу эффективно : скидки на топливо, техническое обслуживание авто и запасные части - это дополнительные преимущества для водителя при работе с нами  </p>

                        <div className={"big-btn text-center info-massege " + toggleClassInfoMas}>
                          <button className='btn' type='button' onClick={this._toggleShowInfoMas} >стать водителем</button>
                          <div className="dropdown">
                            <button className='btn-cancel' type='button' onClick={this._toggleShowInfoMas}>x</button>
                            <h3>Правила работы : </h3>
                            <ol>
                              <li>Установите приложение, чтобы участвовать во всех программах COMBOTAXI: принимать и выполнять заказы, получать скидки на топливо и так далее.</li>
                              <li>Заполните профиль водителя. С Вами свяжется оператор, уточнит детали и активирует Вашу учетную запись.</li>
                              <li>Пополните свой баланс в COMBOTAXI минимум на 10 грн в ближайшем автомате EasyPay. В качестве лицевого счета используйте ваш мобильный номер.</li>
                              <li>Запустите приложение и вы автоматически перейдете в режим онлайн. Выбирайте любой доступный заказ в ленте заказов. Принятие заказа – услуга платная.</li>
                              <li>Вы можете быть назначены оператором на выполнение заказа. Назначение на заказ равносильно принятию Вами заказа, что является услугой платной.</li>
                              <li>Завершая смену перейдите в офлайн. </li>
                            </ol>
                            <a href='/publicoffer' className="more-terms" >Подробнее: условия публичной оферты</a>
                            <span className="admin-block">С уважением,<br/> Администрация COMBOTAXI</span>
                            <a href='https://play.google.com/store/apps/details?id=com.dtlo.kiev_taxi' className='btn-app' type='button'>
                                <img src="./images/main_page/google-play-logo.png" alt="google play logo"/>
                            </a>
                            <p>
                              <img src="./images/main_page/driver-app-qr-code.png" alt="driver qr code"/>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="hidden-xs col-sm-5 col-md-5 col-md-offset-1 col-lg-4 col-lg-offset-1">
                        <div className="become-driver-img"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section id="fuel-coupons" className="fuel-coupons page-block">
                <div className="row">
                  <div className="col-xs-10 col-xs-offset-1">
                    <div className="row">
                      <div className="col-xs-12 col-sm-6 col-md-4">
                        <h1 className="main-title">Скидки на топливо для наших партнеров</h1>
                        <p className="text-title">
                          Мы предлагаем Вам получить скидку  на топливо прямо из мобильного приложения Водителя или Клиента
                        </p>

                        <div className="big-btn text-center">
                          <button className="btn" type="button" >
                            Получить скидку
                          </button>
                        </div>
                      </div>
                      <div className="col-xs-6 col-sm-5 col-sm-offset-1 col-md-4 col-md-offset-0">
                        <div className="fuel-coupons-img phone-1"></div>
                      </div>
                      <div className="col-xs-6 hidden-sm col-md-4">
                        <div className="fuel-coupons-img phone-2"></div>
                      </div>
                    </div>
                    </div>
                  </div>
              </section>
              <section id="contacts" className="contacts page-block">
                  <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                      <div className="row">
                        <div className="col-xs-12 col-sm-4 col-md-4">
                          <h1 className="main-title">контакты</h1>
                          <p>ООО "ЛОГИСТИКАОНЛАЙН"</p>
                          <p>01014, г. Киев, ул. Петра Болбочана, д. 4-А, оффис 1.</p>
                          <p>+380443647950</p>
                          <p><a href="#">combotaxi.com@gmail.com</a></p>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2">
                          <div className="sc text-right">
                            <a href="#">
                              <img src="./images/main_page/sc-fb-icon.png"/>
                            </a>
                            <a href="#">
                              <img src="./images/main_page/sc-google-icon.png"/>
                            </a>
                            <a href="#">
                              <img src="./images/main_page/sc-vk-icon.png"/>
                            </a>
                          </div>

                          <div className="yellow-btn text-right">
                            <Link to='passenger/' className="btn" >Заказать такси</Link>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        )
  }
}

export default mainPage;
